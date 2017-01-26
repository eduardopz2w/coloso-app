import _ from 'lodash';
import normalize from 'json-api-normalizer';
import ColosoApi from '../../utils/ColosoApi';
import { mergeEntities } from '../actions/EntitiesActions';

export const COLOSO_CALL = 'RIOT_API_MIDDLEWARE/COLOSO_CALL';
export const COLOSO_CALL_TYPES = {
  SUMMONER_BY_NAME: 'COLOSO_CALL/SUMMONER_BY_NAME',
  SUMMONER: 'COLOSO_CALL/SUMMONER',
  LEAGUE_ENTRY: 'COLOSO_CALL/LEAGUE_ENTRY',
  CHAMPIONS_MASTERIES: 'COLOSO_CALL/CHAMPIONS_MASTERIES',
  GAMES_RECENT: 'COLOSO_CALL/GAMES_RECENT',
  MASTERIES: 'COLOSO_CALL/MASTERIES',
  RUNES: 'COLOSO_CALL/RUNES',
  PRO_BUILDS: 'COLOSO_CALL/PRO_BUILDS',
  PRO_PLAYERS: 'COLOSO_CALL/PRO_PLAYERS',
};

// TODO: Handle errors

const middleware = ({ dispatch }) => next => (action) => {
  if (!_.has(action, ['payload', COLOSO_CALL])) {
    return next(action);
  }

  dispatch({
    type: `${action.type}_PENDING`,
    payload: _.omit(action.payload, COLOSO_CALL),
  });

  const callData = action.payload[COLOSO_CALL];

  if (callData.type === COLOSO_CALL_TYPES.SUMMONER_BY_NAME) {
    ColosoApi.getSummonerByName(action.payload.summonerName, action.payload.region)
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

  if (callData.type === COLOSO_CALL_TYPES.SUMMONER) {
    ColosoApi.getSummonerByUrid(action.payload.summonerUrid)
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

  if (callData.type === COLOSO_CALL_TYPES.LEAGUE_ENTRY) {
    ColosoApi.getLeagueEntry(action.payload.summonerUrid)
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

  if (callData.type === COLOSO_CALL_TYPES.CHAMPIONS_MASTERIES) {
    ColosoApi.getChampionsMasteries(action.payload.summonerUrid)
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

  if (callData.type === COLOSO_CALL_TYPES.GAMES_RECENT) {
    ColosoApi.getGamesRecent(action.payload.summonerUrid)
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

  if (callData.type === COLOSO_CALL_TYPES.MASTERIES) {
    ColosoApi.getMasteries(action.payload.summonerUrid)
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

  if (callData.type === COLOSO_CALL_TYPES.RUNES) {
    ColosoApi.getRunes(action.payload.summonerUrid)
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

  if (callData.type === COLOSO_CALL_TYPES.STATS_SUMMARY) {
    ColosoApi.getStatsSummary(action.payload.summonerUrid, action.payload.season)
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

  if (callData.type === COLOSO_CALL_TYPES.PRO_BUILDS) {
    ColosoApi.getProBuilds(action.payload.queryParams, action.payload.pageParams)
      .then((response) => {
        const normalized = normalize(response);

        dispatch(mergeEntities(normalized));
        dispatch({
          type: `${action.type}_FULFILLED`,
          payload: {
            proBuildsIds: _.keys(normalized.proBuilds),
            pagination: {
              currentPage: response.meta.currentPage,
              totalPages: response.meta.totalPages,
            },
          },
        });
      });
  }

  if (callData.type === COLOSO_CALL_TYPES.PRO_PLAYERS) {
    ColosoApi.getProPlayers()
      .then((response) => {
        const normalized = normalize(response);

        dispatch(mergeEntities(normalized));
        dispatch({
          type: `${action.type}_FULFILLED`,
          payload: {
            proPlayersIds: _.keys(normalized.proPlayers),
          },
        });
      });
  }

  return null;
};

export default middleware;
