import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  summonerData: {
    isFetching: true,
  },

  leagueEntry: {
    isFetching: false,
    fetched: false,
    entries: [],
  },
});

function searchView(state = initialState, action) {
  let newState = state;

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_SUMMONER_DATA_PENDING') {
    // Esta accion se ejecuta cada vez que se visita el profile por lo cual reseteamos la data vieja
    newState = initialState;
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_SUMMONER_DATA_FULFILLED') {
    newState = newState.mergeIn(['summonerData'], {
      ...action.payload,
      isFetching: false,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_LEAGUE_ENTRY_FULFILLED') {
    newState = newState.mergeIn(['leagueEntry'], {
      fetched: true,
      isFetching: false,
      entries: action.payload.entries,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_LEAGUE_ENTRY_REJECTED') {
    newState = newState.mergeIn(['leagueEntry'], {
      fetched: false,
      isFetching: false,
    });
  }

  return newState;
}

export default searchView;
