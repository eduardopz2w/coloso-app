import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import {
  setSummonerName,
  setRegion,
  setSearchType,
  searchSummoner,
  searchGame,
  clearSearchError,
  clearFoundData,
} from './SummonerSearchActions';

const initialState = Immutable.fromJS({
  summonerName: '',
  region: 'NA',
  searchType: 'PROFILE_SEARCH',
  isSearching: false,
  searchError: false,
  errorMessage: null,
  summonerFoundId: null,
  gameFound: false,
});

export default typeToReducer({
  [setSummonerName]: (state, action) => state.set('summonerName', action.payload),
  [setRegion]: (state, action) => state.set('region', action.payload),
  [setSearchType]: (state, action) => state.set('searchType', action.payload),
  [searchSummoner]: {
    PENDING: state => state.set('isSearching', true),

    REJECTED: (state, { payload: { error } }) => state.merge({
      isSearching: false,
      searchError: true,
      errorMessage: error.message,
    }),

    FULFILLED: (state, { payload: { id } }) => state.merge({
      isSearching: false,
      summonerFoundId: id,
    }),
  },
  [searchGame]: {
    PENDING: state => state.set('isSearching', true),

    FULFILLED: state => state.merge({
      isSearching: false,
      gameFound: true,
    }),

    REJECTED: (state, { payload: { error } }) => state.merge({
      isSearching: false,
      searchError: true,
      errorMessage: error.message,
    }),
  },
  [clearSearchError]: state => state.merge({
    isSearching: false,
    searchError: false,
    errorMessage: null,
  }),
  [clearFoundData]: state => state.merge({
    summonerFoundId: null,
    gameFound: false,
  }),
}, initialState);
