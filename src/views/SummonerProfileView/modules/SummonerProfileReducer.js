import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import {
  fetchSummonerData,
  fetchLeagueEntry,
  fetchChampionsMasteries,
  fetchGamesRecent,
  fetchMasteries,
  fetchRunes,
  fetchSummary,
  clearCache,
} from './SummonerProfileActions';

const initialState = Immutable.fromJS({
  summonerData: {
    isFetching: true,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    id: null,
  },

  leagueEntries: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    id: null,
  },

  championsMasteries: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    id: null,
  },

  gamesRecent: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    id: null,
  },

  masteries: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    id: null,
  },

  runes: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    id: null,
  },

  summary: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    season: null,
    id: null,
  },
});

export default typeToReducer({
  [fetchSummonerData]: {
    PENDING: state => state.mergeIn(['summonerData'], {
      fetched: false,
      isFetching: true,
      fetchError: false,
    }),
    REJECTED: (state, action) => state.mergeIn(['summonerData'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
    FULFILLED: (state, action) => state.mergeIn(['summonerData'], {
      ...action.payload,
      isFetching: false,
      fetched: true,
      id: action.payload.summonerUrid,
    }),
  },
  [fetchLeagueEntry]: {
    PENDING: state => state.mergeIn(['leagueEntries'], {
      fetched: false,
      isFetching: true,
      fetchError: false,
    }),
    FULFILLED: (state, action) => state.mergeIn(['leagueEntries'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      id: action.payload.leagueEntryId,
    }),
    REJECTED: (state, action) => state.mergeIn(['leagueEntries'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
  [fetchChampionsMasteries]: {
    PENDING: state => state.mergeIn(['championsMasteries'], {
      fetched: false,
      isFetching: true,
      fetchError: false,
    }),
    FULFILLED: (state, action) => state.mergeIn(['championsMasteries'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      id: action.payload.championsMasteriesId,
    }),
    REJECTED: (state, action) => state.mergeIn(['championsMasteries'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
  [fetchGamesRecent]: {
    PENDING: state => state.mergeIn(['gamesRecent'], {
      fetched: false,
      isFetching: true,
      fetchError: false,
    }),
    FULFILLED: (state, action) => state.mergeIn(['gamesRecent'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      id: action.payload.gamesRecentId,
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
      fetched: false,
      isFetching: true,
      fetchError: false,
    }),
    FULFILLED: (state, action) => state.mergeIn(['masteries'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      id: action.payload.masteriesId,
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
      fetched: false,
      isFetching: true,
      fetchError: false,
    }),
    FULFILLED: (state, action) => state.mergeIn(['runes'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      id: action.payload.runesId,
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
      id: action.payload.statsSummariesId,
    }),
    REJECTED: (state, action) => state.mergeIn(['summary'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
  [clearCache]: () => initialState,
}, initialState);
