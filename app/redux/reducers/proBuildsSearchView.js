import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { fetchBuilds, refreshBuilds } from '../actions/ProBuildsSearchActions';

const initialState = Immutable.fromJS({
  builds: {
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
  },
});

export default typeToReducer({
  [fetchBuilds]: {
    PENDING: (state, action) => state.withMutations((mutator) => {
      if (action.payload.page === 1) {
        mutator.setIn(['builds', 'builds'], []);
        mutator.setIn(['builds', 'pagination'], {
          page: 1,
          pageCount: 1,
        });
        mutator.setIn(['builds', 'championSelected'], action.payload.championId);
      }

      mutator.setIn(['builds', 'fetchError'], false);
      mutator.setIn(['builds', 'isFetching'], true);
      mutator.setIn(['builds', 'refreshing'], false);
    }),
    FULFILLED: (state, action) => state.withMutations((mutator) => {
      mutator.setIn(['builds', 'isFetching'], false);
      mutator.updateIn(['builds', 'builds'], builds => builds.concat(action.payload.probuilds));
      mutator.setIn(['builds', 'pagination'], action.payload.pagination);
    }),
    REJECTED: (state, action) => state.mergeIn(['builds'], {
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
  [refreshBuilds]: {
    PENDING: state => state.mergeIn(['builds'], {
      isFetching: true,
      isRefreshing: true,
      fetchError: false,
    }),
    REJECTED: (state, action) => state.mergeIn(['builds'], {
      isFetching: false,
      isRefreshing: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
    FULFILLED: (state, action) => state.mergeIn(['builds'], {
      isFetching: false,
      isRefreshing: false,
      builds: action.payload.probuilds,
      pagination: action.payload.pagination,
    }),
  },

}, initialState);
