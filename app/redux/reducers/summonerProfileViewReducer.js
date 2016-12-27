import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  summonerData: {
    isFetching: true,
  },

  leagueEntry: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    entries: [],
  },

  championsMastery: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    masteries: [],
  },

  gamesRecent: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    games: [],
  },

  masteries: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    pages: [],
  },

  runes: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    pages: [],
  },

  summary: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    playerStatSummaries: [],
    region: '',
  }
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
      fetchError: false,
      entries: action.payload.entries,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_LEAGUE_ENTRY_REJECTED') {
    newState = newState.mergeIn(['leagueEntry'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
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
      fetchError: false,
      masteries: action.payload.masteries,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_CHAMPIONS_MASTERY_REJECTED') {
    newState = newState.mergeIn(['championsMastery'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
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
      fetchError: false,
      games: action.payload.games,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_GAMES_RECENT_REJECTED') {
    newState = newState.mergeIn(['gamesRecent'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_MASTERIES_PENDING') {
    newState = newState.mergeIn(['masteries'], {
      isFetching: true,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_MASTERIES_FULFILLED') {
    newState = newState.mergeIn(['masteries'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      pages: action.payload.pages,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_MASTERIES_REJECTED') {
    newState = newState.mergeIn(['masteries'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_RUNES_PENDING') {
    newState = newState.mergeIn(['runes'], {
      isFetching: true,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_RUNES_FULFILLED') {
    newState = newState.mergeIn(['runes'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      pages: action.payload.pages,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_RUNES_REJECTED') {
    newState = newState.mergeIn(['runes'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_SUMMARY_PENDING') {
    newState = newState.mergeIn(['summary'], {
      isFetching: true,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_SUMMARY_FULFILLED') {
    newState = newState.mergeIn(['summary'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      playerStatSummaries: action.payload.playerStatSummaries,
      region: action.payload.region,
    });
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_SUMMARY_REJECTED') {
    newState = newState.mergeIn(['summary'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
    });
  }

  return newState;
}

export default searchView;
