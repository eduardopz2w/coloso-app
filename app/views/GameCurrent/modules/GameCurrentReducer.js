import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { fetchProBuilds } from './GameCurrentActions';
import { searchGame } from '../../SummonerSearch/modules/SummonerSearchActions';

const initialState = Immutable.fromJS({
  gameId: null,
  proBuilds: {
    fetched: false,
    fetchError: false,
    errorMessage: '',
    isFetching: true,
    ids: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
    },
    proPlayerSelected: null,
  },
});

export default typeToReducer({
  [searchGame]: {
    FULFILLED: (state, action) => state.withMutations((mutator) => {
      mutator.set('gameId', action.payload.gameId);
      mutator.mergeIn(['proBuilds'], {
        fetched: false,
        ids: Immutable.List(),
      });
    }),
  },

  [fetchProBuilds]: {
    PENDING: (state, { payload }) => state.withMutations((mutator) => {
      const { queryParams, pageParams } = payload;
      if (pageParams.number === 1) {
        mutator.setIn(['proBuilds', 'fetched'], false);
        mutator.setIn(['proBuilds', 'ids'], Immutable.List([]));
        mutator.setIn(['proBuilds', 'pagination'], Immutable.Map({
          page: 1,
          pageCount: 1,
        }));
      }

      const proPlayerId = queryParams.proPlayerId || null;

      mutator.setIn(['proBuilds', 'proPlayerSelected'], proPlayerId);
      mutator.setIn(['proBuilds', 'fetchError'], false);
      mutator.setIn(['proBuilds', 'isFetching'], true);
    }),

    FULFILLED: (state, { payload }) => state.withMutations((mutator) => {
      mutator.setIn(['proBuilds', 'fetched'], true);
      mutator.setIn(['proBuilds', 'isFetching'], false);
      mutator.updateIn(['proBuilds', 'ids'], proBuilds => proBuilds.concat(payload.ids));
      mutator.setIn(['proBuilds', 'pagination'], Immutable.fromJS(payload.pagination));
    }),

    REJECTED: (state, action) => state.mergeIn(['proBuilds'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
}, initialState);
