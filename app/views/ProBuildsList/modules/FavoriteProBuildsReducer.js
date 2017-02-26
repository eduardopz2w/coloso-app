import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { addFavoriteBuild, removeFavoriteBuild, setFavoriteBuildsFilters } from './FavoriteProBuildsActions';

const initialState = Immutable.fromJS({
  ids: [],
  championSelected: null,
  proPlayerSelected: null,
  fetchError: false,
  errorMessage: '',
  isFetching: false,
  isRefreshing: false,
});

export default typeToReducer({
  'FAVORITE_BUILDS/FETCH_BUILDS': {
    PENDING: state => state.withMutations((mutator) => {
      mutator.set('isFetching', true);
      mutator.set('ids', Immutable.List([]));
      mutator.set('fetchError', false);
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
  [setFavoriteBuildsFilters]: (state, { payload }) => state.merge({
    championSelected: payload.championSelected,
    proPlayerSelected: payload.proPlayerSelected,
  }),
}, initialState);
