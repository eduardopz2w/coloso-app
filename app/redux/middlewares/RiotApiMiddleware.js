import _ from 'lodash';
import normalize from 'json-api-normalizer';
import RiotApi from '../../utils/RiotApi';
import { mergeEntities } from '../actions/EntitiesActions';

export const RIOT_CALL = 'RIOT_API_MIDDLEWARE/RIOT_CALL';
export const RIOT_CALL_TYPES = {
  SUMMONER_BY_NAME: 'RIOT_CALL/SUMMONER_BY_NAME',
  SUMMONER: 'RIOT_CALL/SUMMONER',
  LEAGUE_ENTRY: 'RIOT_CALL/LEAGUE_ENTRY',
  CHAMPIONS_MASTERIES: 'RIOT_CALL/CHAMPIONS_MASTERIES',
  GAMES_RECENT: 'RIOT_CALL/GAMES_RECENT',
  MASTERIES: 'RIOT_CALL/MASTERIES',
  RUNES: 'RIOT_CALL/RUNES',
};

// TODO: Handle errors

const middleware = ({ dispatch }) => next => action => {
  if (!_.has(action, ['payload', RIOT_CALL])) {
    return next(action);
  }

  dispatch({
    type: `${action.type}_PENDING`,
    payload: _.omit(action.payload, RIOT_CALL),
  });

  const callData = action.payload[RIOT_CALL];

  if (callData.type === RIOT_CALL_TYPES.SUMMONER_BY_NAME) {
    RiotApi.summoner.findByName(action.payload.summonerName, action.payload.region)
      .then((response) => {
        const normalized = normalize(response);

        dispatch(mergeEntities(normalized));
        dispatch({
          type: `${action.type}_FULFILLED`,
          payload: {
            summonerUrid: _.first(_.keys(normalized.summoners)),
          },
        });
      });
  }

  if (callData.type === RIOT_CALL_TYPES.SUMMONER) {
    RiotApi.summoner.findByUrid(action.payload.summonerUrid)
      .then((response) => {
        const normalized = normalize(response);

        dispatch(mergeEntities(normalized));
        dispatch({
          type: `${action.type}_FULFILLED`,
          payload: {
            summonerUrid: action.payload.summonerUrid,
          },
        });
      });
  }

  if (callData.type === RIOT_CALL_TYPES.LEAGUE_ENTRY) {
    RiotApi.summoner.leagueEntry(action.payload.summonerUrid)
      .then((response) => {
        const normalized = normalize(response);

        dispatch(mergeEntities(normalized));
        dispatch({
          type: `${action.type}_FULFILLED`,
          payload: {
            leagueEntryId: _.first(_.keys(normalized.leagueEntries)),
          },
        });
      });
  }

  if (callData.type === RIOT_CALL_TYPES.CHAMPIONS_MASTERIES) {
    RiotApi.summoner.championsMastery(action.payload.summonerUrid)
      .then((response) => {
        const normalized = normalize(response);

        dispatch(mergeEntities(normalized));
        dispatch({
          type: `${action.type}_FULFILLED`,
          payload: {
            championsMasteriesId: _.first(_.keys(normalized.championsMasteries)),
          },
        });
      });
  }

  if (callData.type === RIOT_CALL_TYPES.GAMES_RECENT) {
    RiotApi.summoner.gamesRecent(action.payload.summonerUrid)
      .then((response) => {
        const normalized = normalize(response);

        dispatch(mergeEntities(normalized));
        dispatch({
          type: `${action.type}_FULFILLED`,
          payload: {
            gamesRecentId: _.first(_.keys(normalized.gamesRecent)),
          },
        });
      });
  }

  if (callData.type === RIOT_CALL_TYPES.MASTERIES) {
    RiotApi.summoner.masteries(action.payload.summonerUrid)
      .then((response) => {
        const normalized = normalize(response);

        dispatch(mergeEntities(normalized));
        dispatch({
          type: `${action.type}_FULFILLED`,
          payload: {
            masteriesId: _.first(_.keys(normalized.masteries)),
          },
        });
      });
  }

  if (callData.type === RIOT_CALL_TYPES.RUNES) {
    RiotApi.summoner.runes(action.payload.summonerUrid)
      .then((response) => {
        const normalized = normalize(response);

        dispatch(mergeEntities(normalized));
        dispatch({
          type: `${action.type}_FULFILLED`,
          payload: {
            runesId: _.first(_.keys(normalized.runes)),
          },
        });
      });
  }

  if (callData.type === RIOT_CALL_TYPES.STATS_SUMMARY) {
    RiotApi.summoner.stats.summary(action.payload.summonerUrid, action.payload.season)
      .then((response) => {
        const normalized = normalize(response);

        dispatch(mergeEntities(normalized));
        dispatch({
          type: `${action.type}_FULFILLED`,
          payload: {
            statsSummariesId: _.first(_.keys(normalized.statsSummaries)),
          },
        });
      });
  }
};

export default middleware;
