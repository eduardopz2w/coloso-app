import Immutable from 'immutable';

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

function searchView(state = initialState, action) {
  let newState = state;

  if (action.type === 'SEARCH_VIEW/SET_SUMMONER_NAME') {
    newState = newState.set('summonerName', action.payload.summonerName);
  }

  if (action.type === 'SEARCH_VIEW/SET_REGION') {
    newState = newState.set('region', action.payload.region);
  }

  if (action.type === 'SEARCH_VIEW/SET_SEARCH_TYPE') {
    newState = newState.set('searchType', action.payload.searchType);
  }

  if (action.type === 'SEARCH_VIEW/SEARCH_SUMMONER_PENDING') {
    newState = newState.set('isSearching', true);
  }

  if (action.type === 'SEARCH_VIEW/SEARCH_SUMMONER_REJECTED') {
    newState = newState.merge({
      isSearching: false,
      searchError: true,
      errorMessage: action.payload.errorMessage,
    });
  }

  if (action.type === 'SEARCH_VIEW/SEARCH_SUMMONER_FULFILLED') {
    newState = newState.merge({
      isSearching: false,
      summonerFoundId: action.payload.id,
      summonerFoundRegion: action.payload.region,
    });
  }

  if (action.type === 'SEARCH_VIEW/SEARCH_GAME_PENDING') {
    newState = newState.set('isSearching', true);
  }

  if (action.type === 'SEARCH_VIEW/SEARCH_GAME_FULFILLED') {
    newState = newState.merge({
      isSearching: false,
      gameFound: true,
    });
  }

  if (action.type === 'SEARCH_VIEW/SEARCH_GAME_REJECTED') {
    newState = newState.merge({
      isSearching: false,
      searchError: true,
      errorMessage: action.payload.errorMessage,
    });
  }

  if (action.type === 'SEARCH_VIEW/CLEAR_SEARCH_ERROR') {
    newState = newState.merge({
      isSearching: false,
      searchError: false,
      errorMessage: null,
    });
  }

  if (action.type === 'SEARCH_VIEW/CLEAR_FOUND_DATA') {
    newState = newState.merge({
      summonerFoundId: 0,
      gameFound: false,
    });
  }

  return newState;
}

export default searchView;
