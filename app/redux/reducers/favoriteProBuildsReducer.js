import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { addFavoriteBuild, removeFavoriteBuild, setFavoriteBuildsFilters } from '../../modules/FavoriteProBuildsActions';

const initialState = Immutable.fromJS({
  ids: [],
  fetchError: false,
  errorMessage: '',
  isFetching: false,
  isRefreshing: false,
  filters: {
    championId: null,
    proPlayerId: null,
  },
});

export default typeToReducer({
  'FAVORITE_BUILDS/FETCH_BUILDS': {
    PENDING: state => state.withMutations((mutator) => {
      mutator.set('isFetching', true);
      mutator.set('ids', Immutable.List([]));
      mutator.set('fetchError', false);
      mutator.set('filters', Immutable.Map({
        championId: null,
        proPlayerId: null,
      }));
    }),
    FULFILLED: (state, { payload }) => state.withMutations((mutator) => {
      mutator.set('isFetching', false);
      mutator.set('ids', Immutable.List(payload.ids));
    }),
    REJECTED: (state, action) => state.merge({
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
  [addFavoriteBuild]: {
    FULFILLED: (state, { payload }) => state.merge({
      ids: payload.ids,
    }),
  },
  [removeFavoriteBuild]: {
    FULFILLED: (state, { payload }) => state.merge({
      ids: payload.ids,
    }),
  },
  [setFavoriteBuildsFilters]: (state, { payload }) => state.mergeIn(['filters'], {
    championId: payload.championId,
    proPlayerId: payload.proPlayerId,
  }),
}, initialState);
