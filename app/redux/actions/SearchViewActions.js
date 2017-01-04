import { createAction } from 'redux-actions';
import RiotApi from '../../utils/RiotApi';

export const setSummonerName = createAction('SEARCH_VIEW/SET_SUMMONER_NAME');
export const setRegion = createAction('SEARCH_VIEW/SET_REGION');
export const setSearchType = createAction('SEARCH_VIEW/SET_SEARCH_TYPE');
export const searchSummoner = createAction('SEARCH_VIEW/SEARCH_SUMMONER', (summonerName, region) => RiotApi.summoner.findByName(summonerName, region));
export const clearSearchError = createAction('SEARCH_VIEW/CLEAR_SEARCH_ERROR');
export const clearFoundData = createAction('SEARCH_VIEW/CLEAR_FOUND_DATA');

export function searchGame(summonerName, region) {
  return (dispatch) => {
    dispatch({
      type: 'SEARCH_VIEW/SEARCH_GAME_PENDING',
    });

    RiotApi.summoner.findByName(summonerName, region)
      .then(summonerData => RiotApi
        .summoner
        .gameCurrent(summonerData.id, summonerData.region))
      .then((gameFound) => {
        dispatch({
          type: 'SEARCH_VIEW/SEARCH_GAME_FULFILLED',
          payload: gameFound,
        });
      })
      .catch(err => dispatch({
        type: 'SEARCH_VIEW/SEARCH_GAME_REJECTED',
        payload: err,
      }));
  };
}
