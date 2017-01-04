import RiotApi from '../../utils/RiotApi';

function setSummonerName(summonerName) {
  return {
    type: 'SEARCH_VIEW/SET_SUMMONER_NAME',
    payload: { summonerName },
  };
}

function setRegion(region) {
  return {
    type: 'SEARCH_VIEW/SET_REGION',
    payload: { region },
  };
}

function setSearchType(searchType) {
  return {
    type: 'SEARCH_VIEW/SET_SEARCH_TYPE',
    payload: { searchType },
  };
}

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
  setSummonerName,
  setRegion,
  setSearchType,
};

export default actions;
