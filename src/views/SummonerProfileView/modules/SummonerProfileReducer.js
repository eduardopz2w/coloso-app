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
    REJECTED: (state, { payload: { error } }) => state.mergeIn(['summonerData'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: error.message,
    }),
    FULFILLED: (state, { payload: { id } }) => state.mergeIn(['summonerData'], {
      isFetching: false,
      fetched: true,
      id,
    }),
  },
  [fetchLeagueEntry]: {
    PENDING: state => state.mergeIn(['leagueEntries'], {
      fetched: false,
      isFetching: true,
      fetchError: false,
    }),
    FULFILLED: (state, { payload: { id } }) => state.mergeIn(['leagueEntries'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      id,
    }),
    REJECTED: (state, { payload: { error } }) => state.mergeIn(['leagueEntries'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: error.message,
    }),
  },
  [fetchChampionsMasteries]: {
    PENDING: state => state.mergeIn(['championsMasteries'], {
      fetched: false,
      isFetching: true,
      fetchError: false,
    }),
    FULFILLED: (state, { payload: { id } }) => state.mergeIn(['championsMasteries'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      id,
    }),
    REJECTED: (state, { payload: { error } }) => state.mergeIn(['championsMasteries'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: error.message,
    }),
  },
  [fetchGamesRecent]: {
    PENDING: state => state.mergeIn(['gamesRecent'], {
      fetched: false,
      isFetching: true,
      fetchError: false,
    }),
    FULFILLED: (state, { payload: { id } }) => state.mergeIn(['gamesRecent'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      id,
    }),
    REJECTED: (state, { payload: { error } }) => state.mergeIn(['gamesRecent'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: error.message,
    }),
  },
  [fetchMasteries]: {
    PENDING: state => state.mergeIn(['masteries'], {
      fetched: false,
      isFetching: true,
      fetchError: false,
    }),
    FULFILLED: (state, { payload: { id } }) => state.mergeIn(['masteries'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      id,
    }),
    REJECTED: (state, { payload: { error } }) => state.mergeIn(['masteries'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: error.message,
    }),
  },
  [fetchRunes]: {
    PENDING: state => state.mergeIn(['runes'], {
      fetched: false,
      isFetching: true,
      fetchError: false,
    }),
    FULFILLED: (state, { payload: { id } }) => state.mergeIn(['runes'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      id,
    }),
    REJECTED: (state, { payload: { error } }) => state.mergeIn(['runes'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: error.message,
    }),
  },
  [fetchSummary]: {
    PENDING: (state, { payload: { season } }) => state.mergeIn(['summary'], {
      isFetching: true,
      fetchError: false,
      fetched: false,
      season,
    }),
    FULFILLED: (state, { payload: { id } }) => state.mergeIn(['summary'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
      id,
    }),
    REJECTED: (state, { payload: { error } }) => state.mergeIn(['summary'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: error.message,
    }),
  },
  [clearCache]: () => initialState,
}, initialState);
