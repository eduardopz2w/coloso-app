import { createAction } from 'redux-actions';
import { COLOSO_CALL, COLOSO_CALL_TYPES } from '../../../redux/middlewares/ColosoApiMiddleware';

export const setSummonerName = createAction('SUMMONER_SEARCH/SET_SUMMONER_NAME');
export const setRegion = createAction('SUMMONER_SEARCH/SET_REGION');
export const setSearchType = createAction('SUMMONER_SEARCH/SET_SEARCH_TYPE');
export const clearSearchError = createAction('SUMMONER_SEARCH/CLEAR_SEARCH_ERROR');
export const clearFoundData = createAction('SUMMONER_SEARCH/CLEAR_FOUND_DATA');
export const searchGame = createAction('SUMMONER_SEARCH/SEARCH_GAME',
  (summonerName, region) => ({
    summonerName,
    region,
    [COLOSO_CALL]: {
      type: COLOSO_CALL_TYPES.GAME_CURRENT,
    },
  }),
);
export const searchSummoner = createAction('SUMMONER_SEARCH/SEARCH_SUMMONER',
  (summonerName, region) => ({
    summonerName,
    region,
    [COLOSO_CALL]: {
      type: COLOSO_CALL_TYPES.SUMMONER_BY_NAME,
    },
  }),
);
