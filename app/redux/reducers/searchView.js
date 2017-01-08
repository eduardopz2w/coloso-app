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
} from '../actions/SearchViewActions';

const initialState = Immutable.fromJS({
  summonerName: '',
  region: 'na',
  searchType: 'PROFILE_SEARCH',
  isSearching: false,
  searchError: false,
  errorMessage: null,
  summonerFoundId: 0,
  summonerFoundRegion: '',
  gameFound: false,
});

export default typeToReducer({
  [setSummonerName]: (state, action) => state.set('summonerName', action.payload),
  [setRegion]: (state, action) => state.set('region', action.payload),
  [setSearchType]: (state, action) => state.set('searchType', action.payload),
  [searchSummoner]: {
    PENDING: state => state.set('isSearching', true),

    REJECTED: (state, action) => state.merge({
      isSearching: false,
      searchError: true,
      errorMessage: action.payload.errorMessage,
    }),

    FULFILLED: (state, action) => state.merge({
      isSearching: false,
      summonerFoundId: action.payload.id,
      summonerFoundRegion: action.payload.region,
    }),
  },
  [searchGame]: {
    PENDING: state => state.set('isSearching', true),

    FULFILLED: state => state.merge({
      isSearching: false,
      gameFound: true,
    }),

    REJECTED: (state, action) => state.merge({
      isSearching: false,
      searchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
  [clearSearchError]: state => state.merge({
    isSearching: false,
    searchError: false,
    errorMessage: null,
  }),
  [clearFoundData]: state => state.merge({
    summonerFoundId: 0,
    gameFound: false,
  }),
}, initialState);
