import { createAction } from 'redux-actions';
import RiotApi from '../../utils/RiotApi';

export const fetchSummonerData = createAction('SUMMONER_PROFILE_VIEW/FETCH_SUMMONER_DATA', RiotApi.summoner.findById);
export const fetchLeagueEntry = createAction('SUMMONER_PROFILE_VIEW/FETCH_LEAGUE_ENTRY', RiotApi.summoner.leagueEntry);
export const fetchChampionsMastery = createAction('SUMMONER_PROFILE_VIEW/FETCH_CHAMPIONS_MASTERY', RiotApi.summoner.championsMastery);
export const fetchGamesRecent = createAction('SUMMONER_PROFILE_VIEW/FETCH_GAMES_RECENT', RiotApi.summoner.gamesRecent);
export const fetchMasteries = createAction('SUMMONER_PROFILE_VIEW/FETCH_MASTERIES', RiotApi.summoner.masteries);
export const fetchRunes = createAction('SUMMONER_PROFILE_VIEW/FETCH_RUNES', RiotApi.summoner.runes);
export const fetchSummary = createAction('SUMMONER_PROFILE_VIEW/FETCH_SUMMARY', (summonerId, region, season) => ({ promise: RiotApi.summoner.stats.summary(summonerId, region, season), data: { season } }));
