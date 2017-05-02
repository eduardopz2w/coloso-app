import _ from 'lodash';
import normalize from 'json-api-normalizer';
import ColosoApi from '../../utils/ColosoApi';
import { mergeEntities } from '../../modules/EntitiesActions';

export const COLOSO_CALL = 'RIOT_API_MIDDLEWARE/COLOSO_CALL';
export const COLOSO_CALL_TYPES = {
  SUMMONER_BY_NAME: 'COLOSO_CALL/SUMMONER_BY_NAME',
  SUMMONER: 'COLOSO_CALL/SUMMONER',
  LEAGUE_ENTRY: 'COLOSO_CALL/LEAGUE_ENTRY',
  CHAMPIONS_MASTERIES: 'COLOSO_CALL/CHAMPIONS_MASTERIES',
  GAMES_RECENT: 'COLOSO_CALL/GAMES_RECENT',
  MASTERIES: 'COLOSO_CALL/MASTERIES',
  RUNES: 'COLOSO_CALL/RUNES',
  STATS_SUMMARY: 'COLOSO_CALL/STATS_SUMMARY',
  PRO_BUILDS: 'COLOSO_CALL/PRO_BUILDS',
  PRO_PLAYERS: 'COLOSO_CALL/PRO_PLAYERS',
  GAME_CURRENT: 'COLOSO_CALL/GAME_CURRENT',
  MATCH: 'COLOSO_CALL/MATCH',
};

const COLOSO_CALL_FUNC = {
  [COLOSO_CALL_TYPES.PRO_BUILDS]: ColosoApi.proBuilds.get,
  [COLOSO_CALL_TYPES.PRO_PLAYERS]: ColosoApi.proPlayers.get,
};

const middleware = ({ dispatch }) => next => (action) => {
  if (!_.has(action, ['payload', COLOSO_CALL])) {
    return next(action);
  }

  function handleError(error) {
    dispatch({
      type: `${action.type}_REJECTED`,
      payload: {
        error,
      },
    });
  }

  function dispatchSuccess(payload) {
    dispatch({
      type: `${action.type}_FULFILLED`,
      payload,
    });
  }

  dispatch({
    type: `${action.type}_PENDING`,
    payload: _.omit(action.payload[COLOSO_CALL], 'type'),
  });

  const callPayload = action.payload[COLOSO_CALL];

  COLOSO_CALL_FUNC[callPayload.type](callPayload.params)
    .then((response) => {
      const nextPayload = {};
      const normalized = normalize(response);

      dispatch(mergeEntities(normalized));

      if (_.has(response, 'meta')) {
        nextPayload.meta = response.meta;
      }

      if (_.isArray(response.data)) {
        _.merge(nextPayload, { ids: response.data.map(data => data.id) });
      } else {
        _.merge(nextPayload, { id: response.data.id });
      }

      dispatchSuccess(nextPayload);
    })
    .catch(handleError);

  return null;
};

export default middleware;
