import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import _ from 'lodash';

import { fetchBuilds, refreshBuilds } from '../../modules/ProBuildsActions';

const initialState = Immutable.fromJS({
  ids: [],
  fetchError: false,
  errorMessage: '',
  isFetching: false,
  isRefreshing: false,
  pagination: {
    currentPage: 1,
    totalPages: 1,
  },
  filters: {
    championId: null,
    proPlayerId: null,
  },
});

export default typeToReducer({
  [fetchBuilds]: {
    PENDING: (state, { payload: { params } }) => state.withMutations((mutator) => {
      if (_.has(params, ['page', 'number']) && params.page.number === 1) {
        mutator.set('ids', Immutable.List([]));
        mutator.set('pagination', Immutable.fromJS({
          currentPage: 1,
          totalPages: 1,
        }));

        mutator.setIn(['filters', 'championId'], params.championId || null);
        mutator.setIn(['filters', 'proPlayerId'], params.proPlayerId || null);
      }

      mutator.set('fetchError', false);
      mutator.set('isFetching', true);
      mutator.set('refreshing', false);
    }),
    FULFILLED: (state, { payload: { ids, meta } }) => state.withMutations((mutator) => {
      mutator.set('isFetching', false);
      mutator.update('ids', proBuilds => proBuilds.concat(ids));
      mutator.set('pagination', Immutable.fromJS(meta));
    }),
    REJECTED: (state, { payload: { error } }) => state.merge({
      isFetching: false,
      fetchError: true,
      errorMessage: error.message,
    }),
  },
  [refreshBuilds]: {
    PENDING: state => state.merge({
      isFetching: true,
      isRefreshing: true,
      fetchError: false,
    }),
    REJECTED: (state, { payload: { error } }) => state.merge({
      isFetching: false,
      isRefreshing: false,
      fetchError: true,
      errorMessage: error.message,
    }),
    FULFILLED: (state, { payload: { ids, meta } }) => state.merge({
      isFetching: false,
      isRefreshing: false,
      ids: Immutable.List(ids),
      pagination: Immutable.fromJS(meta),
    }),
  },

}, initialState);
