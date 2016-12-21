import RiotApi from '../../utils/RiotApi';

function searchSummoner(summonerName, region) {
  return {
    type: 'SEARCH_VIEW/SEARCH_SUMMONER',
    payload: {
      promise: RiotApi.summoner.findByName(summonerName, region),
    },
  };
}

function searchGame(summonerId, region) {
  return {
    type: 'SEARCH_VIEW/SEARCH_GAME',
    payload: {
      promise: RiotApi.summoner.gameCurrent(summonerId, region),
    },
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
