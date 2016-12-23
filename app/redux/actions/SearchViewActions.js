import RiotApi from '../../utils/RiotApi';

function searchSummoner(summonerName, region) {
  return {
    type: 'SEARCH_VIEW/SEARCH_SUMMONER',
    payload: {
      promise: RiotApi.summoner.findByName(summonerName, region),
    },
  };
}

function searchGame(summonerName, region) {
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

function clearSearchError() {
  return {
    type: 'SEARCH_VIEW/CLEAR_SEARCH_ERROR',
  };
}

function clearFoundData() {
  return {
    type: 'SEARCH_VIEW/CLEAR_FOUND_DATA',
  };
}

const actions = {
  searchSummoner,
  clearSearchError,
  clearFoundData,
  searchGame,
};

export default actions;
