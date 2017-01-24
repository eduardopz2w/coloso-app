import { createAction } from 'redux-actions';
import { RIOT_CALL, RIOT_CALL_TYPES } from '../middlewares/RiotApiMiddleware';

export const fetchSummonerData = createAction('SUMMONER_PROFILE_VIEW/FETCH_SUMMONER_DATA', summonerUrid => ({
  summonerUrid,
  [RIOT_CALL]: {
    type: RIOT_CALL_TYPES.SUMMONER,
  },
}));

export const fetchLeagueEntry = createAction('SUMMONER_PROFILE_VIEW/FETCH_LEAGUE_ENTRY', summonerUrid => ({
  summonerUrid,
  [RIOT_CALL]: {
    type: RIOT_CALL_TYPES.LEAGUE_ENTRY,
  },
}));

export const fetchChampionsMasteries = createAction('SUMMONER_PROFILE_VIEW/FETCH_CHAMPIONS_MASTERY', summonerUrid => ({
  summonerUrid,
  [RIOT_CALL]: {
    type: RIOT_CALL_TYPES.CHAMPIONS_MASTERIES,
  },
}));

export const fetchGamesRecent = createAction('SUMMONER_PROFILE_VIEW/FETCH_GAMES_RECENT', summonerUrid => ({
  summonerUrid,
  [RIOT_CALL]: {
    type: RIOT_CALL_TYPES.GAMES_RECENT,
  },
}));

export const fetchMasteries = createAction('SUMMONER_PROFILE_VIEW/FETCH_MASTERIES', summonerUrid => ({
  summonerUrid,
  [RIOT_CALL]: {
    type: RIOT_CALL_TYPES.MASTERIES,
  },
}));

export const fetchRunes = createAction('SUMMONER_PROFILE_VIEW/FETCH_RUNES', summonerUrid => ({
  summonerUrid,
  [RIOT_CALL]: {
    type: RIOT_CALL_TYPES.RUNES,
  },
}));

export const fetchSummary = createAction('SUMMONER_PROFILE_VIEW/FETCH_SUMMARY', (summonerUrid, season) => ({
  summonerUrid,
  season,
  [RIOT_CALL]: {
    type: RIOT_CALL_TYPES.STATS_SUMMARY,
  },
}));
