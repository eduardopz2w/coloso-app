import { createAction } from 'redux-actions';
import { COLOSO_CALL, COLOSO_CALL_TYPES } from '../../../redux/middlewares/ColosoApiMiddleware';

export const fetchSummonerData = createAction('SUMMONER_PROFILE_VIEW/FETCH_SUMMONER_DATA', params => ({
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.SUMMONER,
    params,
  },
}));

export const fetchLeagueEntry = createAction('SUMMONER_PROFILE_VIEW/FETCH_LEAGUE_ENTRY', params => ({
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.LEAGUE_ENTRY,
    params,
  },
}));

export const fetchChampionsMasteries = createAction('SUMMONER_PROFILE_VIEW/FETCH_CHAMPIONS_MASTERY', params => ({
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.CHAMPIONS_MASTERIES,
    params,
  },
}));

export const fetchGamesRecent = createAction('SUMMONER_PROFILE_VIEW/FETCH_GAMES_RECENT', params => ({
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.GAMES_RECENT,
    params,
  },
}));

export const fetchMasteries = createAction('SUMMONER_PROFILE_VIEW/FETCH_MASTERIES', params => ({
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.MASTERIES,
    params,
  },
}));

export const fetchRunes = createAction('SUMMONER_PROFILE_VIEW/FETCH_RUNES', params => ({
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.RUNES,
    params,
  },
}));

export const fetchSummary = createAction('SUMMONER_PROFILE_VIEW/FETCH_SUMMARY', params => ({
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.STATS_SUMMARY,
    params,
  },
}));

export const clearCache = createAction('SUMMONER_PROFILE_VIEW/CLEAR_CACHE', () => ({}));
