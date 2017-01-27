import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { fetchBuilds, refreshBuilds } from '../actions/ProBuildsListActions';

const initialState = Immutable.fromJS({
  fetchError: false,
  errorMessage: '',
  isFetching: false,
  isRefreshing: false,
  proBuildsIds: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
  },
  data: {
    proBuilds: [],
  },
  championSelected: 0,
  proPlayerSelected: null,
});

export default typeToReducer({
  [fetchBuilds]: {
    PENDING: (state, { payload }) => state.withMutations((mutator) => {
      const { queryParams, pageParams } = payload;

      if (pageParams.number === 1) {
        mutator.set('proBuildsIds', Immutable.List([]));
        mutator.set('pagination', Immutable.fromJS({
          currentPage: 1,
          totalPages: 1,
        }));

        const championId = queryParams.championId || 0;
        const proPlayerId = queryParams.proPlayerId || null;

        mutator.set('championSelected', championId);
        mutator.set('proPlayerSelected', proPlayerId);
      }

      mutator.set('fetchError', false);
      mutator.set('isFetching', true);
      mutator.set('refreshing', false);
    }),
    FULFILLED: (state, { payload }) => state.withMutations((mutator) => {
      mutator.set('isFetching', false);
      mutator.update('proBuildsIds', proBuilds => proBuilds.concat(payload.proBuildsIds));
      mutator.set('pagination', Immutable.fromJS(payload.pagination));
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
    FULFILLED: (state, { payload }) => state.merge({
      isFetching: false,
      isRefreshing: false,
      proBuildsIds: Immutable.List(payload.proBuildsIds),
      pagination: Immutable.fromJS(payload.pagination),
    }),
  },

}, initialState);
