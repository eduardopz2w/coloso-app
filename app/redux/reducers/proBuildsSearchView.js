import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { fetchBuilds, refreshBuilds } from '../actions/ProBuildsSearchActions';

const initialState = Immutable.fromJS({
  fetchError: false,
  errorMessage: '',
  isFetching: false,
  isRefreshing: false,
  builds: [],
  pagination: {
    page: 1,
    pageCount: 1,
  },
  championSelected: null,
});

export default typeToReducer({
  [fetchBuilds]: {
    PENDING: (state, action) => state.withMutations((mutator) => {
      if (action.payload.page === 1) {
        mutator.set('builds', Immutable.List([]));
        mutator.set('pagination', Immutable.fromJS({
          page: 1,
          pageCount: 1,
        }));
        mutator.set('championSelected', action.payload.championId);
      }

      mutator.set('fetchError', false);
      mutator.set('isFetching', true);
      mutator.set('refreshing', false);
    }),
    FULFILLED: (state, action) => state.withMutations((mutator) => {
      mutator.set('isFetching', false);
      mutator.update('builds', builds => builds.concat(Immutable.fromJS(action.payload.probuilds)));
      mutator.set('pagination', Immutable.fromJS(action.payload.pagination));
    }),
    REJECTED: (state, action) => state.merge({
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
  [refreshBuilds]: {
    PENDING: state => state.merge({
      isFetching: true,
      isRefreshing: true,
      fetchError: false,
    }),
    REJECTED: (state, action) => state.merge({
      isFetching: false,
      isRefreshing: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
    FULFILLED: (state, action) => state.merge({
      isFetching: false,
      isRefreshing: false,
      builds: Immutable.fromJS(action.payload.probuilds),
      pagination: Immutable.fromJS(action.payload.pagination),
    }),
  },

}, initialState);
