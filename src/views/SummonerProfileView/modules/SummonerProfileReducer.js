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
} from './SummonerProfileActions';

const initialState = Immutable.fromJS({
  summonerData: {
    isFetching: true,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    summonerUrid: null,
  },

  leagueEntry: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    leagueEntryId: null,
  },

  championsMasteries: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    championsMasteriesId: null,
  },

  gamesRecent: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    gamesRecentId: null,
  },

  masteries: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    masteriesId: null,
  },

  runes: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    runesId: null,
  },

  summary: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
    statsSummariesId: null,
    season: null,
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
      summonerUrid: action.payload.summonerUrid,
    }),
  },
  [fetchLeagueEntry]: {
    PENDING: state => state.mergeIn(['leagueEntry'], {
      fetched: false,
      isFetching: true,
      fetchError: false,
    }),
    FULFILLED: (state, action) => state.mergeIn(['leagueEntry'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      leagueEntryId: action.payload.leagueEntryId,
    }),
    REJECTED: (state, action) => state.mergeIn(['leagueEntry'], {
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
      championsMasteriesId: action.payload.championsMasteriesId,
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
      gamesRecentId: action.payload.gamesRecentId,
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
      masteriesId: action.payload.masteriesId,
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
      runesId: action.payload.runesId,
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
      statsSummariesId: action.payload.statsSummariesId,
    }),
    REJECTED: (state, action) => state.mergeIn(['summary'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
}, initialState);
