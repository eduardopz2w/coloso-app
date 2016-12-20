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

  championsMastery: {
    isFetching: false,
    fetched: false,
    masteries: [],
  },

  gamesRecent: {
    isFetching: false,
    fetched: false,
    games: [],
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

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_LEAGUE_ENTRY_PENDING') {
    newState = newState.mergeIn(['leagueEntry'], {
      isFetching: true,
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

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_CHAMPIONS_MASTERY_PENDING') {
    newState = newState.mergeIn(['championsMastery'], {
      isFetching: true,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_CHAMPIONS_MASTERY_FULFILLED') {
    newState = newState.mergeIn(['championsMastery'], {
      fetched: true,
      isFetching: false,
      masteries: action.payload.masteries,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_CHAMPIONS_MASTERY_REJECTED') {
    newState = newState.mergeIn(['championsMastery'], {
      fetched: false,
      isFetching: false,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_GAMES_RECENT_PENDING') {
    newState = newState.mergeIn(['gamesRecent'], {
      isFetching: true,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_GAMES_RECENT_FULFILLED') {
    newState = newState.mergeIn(['gamesRecent'], {
      fetched: true,
      isFetching: false,
      games: action.payload.games,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_GAMES_RECENT_REJECTED') {
    newState = newState.mergeIn(['gamesRecent'], {
      fetched: false,
      isFetching: false,
    });
  }

  return newState;
}

export default searchView;
