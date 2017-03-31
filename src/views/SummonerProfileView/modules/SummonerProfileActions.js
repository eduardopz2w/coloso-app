import { createAction } from 'redux-actions';
import { COLOSO_CALL, COLOSO_CALL_TYPES } from '../../../redux/middlewares/ColosoApiMiddleware';

export const fetchSummonerData = createAction('SUMMONER_PROFILE_VIEW/FETCH_SUMMONER_DATA', summonerUrid => ({
  summonerUrid,
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.SUMMONER,
  },
}));

export const fetchLeagueEntry = createAction('SUMMONER_PROFILE_VIEW/FETCH_LEAGUE_ENTRY', summonerUrid => ({
  summonerUrid,
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.LEAGUE_ENTRY,
  },
}));

export const fetchChampionsMasteries = createAction('SUMMONER_PROFILE_VIEW/FETCH_CHAMPIONS_MASTERY', summonerUrid => ({
  summonerUrid,
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.CHAMPIONS_MASTERIES,
  },
}));

export const fetchGamesRecent = createAction('SUMMONER_PROFILE_VIEW/FETCH_GAMES_RECENT', summonerUrid => ({
  summonerUrid,
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.GAMES_RECENT,
  },
}));

export const fetchMasteries = createAction('SUMMONER_PROFILE_VIEW/FETCH_MASTERIES', summonerUrid => ({
  summonerUrid,
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.MASTERIES,
  },
}));

export const fetchRunes = createAction('SUMMONER_PROFILE_VIEW/FETCH_RUNES', summonerUrid => ({
  summonerUrid,
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.RUNES,
  },
}));

export const fetchSummary = createAction('SUMMONER_PROFILE_VIEW/FETCH_SUMMARY', (summonerUrid, season) => ({
  summonerUrid,
  season,
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.STATS_SUMMARY,
  },
}));

export const clearCache = createAction('SUMMONER_PROFILE_VIEW/CLEAR_CACHE', () => ({}));
