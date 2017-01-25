import { createAction } from 'redux-actions';
import { COLOSO_CALL, COLOSO_CALL_TYPES } from '../middlewares/ColosoApiMiddleware';

export const setSummonerName = createAction('SEARCH_VIEW/SET_SUMMONER_NAME');
export const setRegion = createAction('SEARCH_VIEW/SET_REGION');
export const setSearchType = createAction('SEARCH_VIEW/SET_SEARCH_TYPE');
export const clearSearchError = createAction('SEARCH_VIEW/CLEAR_SEARCH_ERROR');
export const clearFoundData = createAction('SEARCH_VIEW/CLEAR_FOUND_DATA');
export const searchGame = createAction('SEARCH_VIEW/SEARCH_GAME', (summonerName, region) => new Promise((resolve, reject) => {
  // TODO
}));
export const searchSummoner = createAction('SEARCH_VIEW/SEARCH_SUMMONER',
  (summonerName, region) => ({
    summonerName,
    region,
    [COLOSO_CALL]: {
      type: COLOSO_CALL_TYPES.SUMMONER_BY_NAME,
    },
  }),
);
