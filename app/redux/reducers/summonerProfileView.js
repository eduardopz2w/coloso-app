import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import {
  fetchSummonerData,
  fetchLeagueEntry,
  fetchChampionsMastery,
  fetchGamesRecent,
  fetchMasteries,
  fetchRunes,
  fetchSummary,
} from '../actions/SummonerProfileViewActions';

const initialState = Immutable.fromJS({
  summonerData: {
    isFetching: true,
  },

  leagueEntry: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    entries: [],
  },

  championsMastery: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    masteries: [],
  },

  gamesRecent: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    games: [],
  },

  masteries: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    pages: [],
  },

  runes: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    pages: [],
  },

  summary: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    playerStatSummaries: [],
    season: '',
  },
});

export default typeToReducer({
  [fetchSummonerData]: {
    PENDING: () => initialState,
    FULFILLED: (state, action) => state.mergeIn(['summonerData'], {
      ...action.payload,
      isFetching: false,
    }),
  },
  [fetchLeagueEntry]: {
    PENDING: state => state.mergeIn(['leagueEntry'], {
      isFetching: true,
      fetchError: false,
    }),
    FULFILLED: (state, action) => state.mergeIn(['leagueEntry'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      entries: action.payload.entries,
    }),
    REJECTED: (state, action) => state.mergeIn(['leagueEntry'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
  [fetchChampionsMastery]: {
    PENDING: state => state.mergeIn(['championsMastery'], {
      isFetching: true,
      fetchError: false,
    }),
    FULFILLED: (state, action) => state.mergeIn(['championsMastery'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      masteries: action.payload.masteries,
    }),
    REJECTED: (state, action) => state.mergeIn(['championsMastery'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
  [fetchGamesRecent]: {
    PENDING: state => state.mergeIn(['gamesRecent'], {
      isFetching: true,
      fetchError: false,
    }),
    FULFILLED: (state, action) => state.mergeIn(['gamesRecent'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      games: action.payload.games,
    }),
    REJECTED: (state, action) => state.mergeIn(['gamesRecent'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
  [fetchMasteries]: {
    PENDING: state => state.mergeIn(['masteries'], {
      isFetching: true,
      fetchError: false,
    }),
    FULFILLED: (state, action) => state.mergeIn(['masteries'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      pages: action.payload.pages,
    }),
    REJECTED: (state, action) => state.mergeIn(['masteries'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
  [fetchRunes]: {
    PENDING: state => state.mergeIn(['runes'], {
      isFetching: true,
      fetchError: false,
    }),
    FULFILLED: (state, action) => state.mergeIn(['runes'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      pages: action.payload.pages,
    }),
    REJECTED: (state, action) => state.mergeIn(['runes'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
  [fetchSummary]: {
    PENDING: (state, action) => state.mergeIn(['summary'], {
      isFetching: true,
      fetchError: false,
      fetched: false,
      season: action.payload.season,
    }),
    FULFILLED: (state, action) => state.mergeIn(['summary'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      playerStatSummaries: action.payload.playerStatSummaries,
      season: action.payload.season,
    }),
    REJECTED: (state, action) => state.mergeIn(['summary'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
}, initialState);
