import RiotApi from '../../utils/RiotApi';

function searchSummonerProfile(summonerName, region) {
  return {
    type: 'SEARCH_VIEW/SEARCH_SUMMONER_PROFILE',
    payload: {
      promise: RiotApi.summoner.findByName(summonerName, region),
    },
  };
}

function clearSearchError() {
  return {
    type: 'SEARCH_VIEW/CLEAR_SEARCH_ERROR',
  };
}

function clearSummonerFound() {
  return {
    type: 'SEARCH_VIEW/CLEAR_SUMMONER_FOUND',
  };
}

const actions = {
  searchSummonerProfile,
  clearSearchError,
  clearSummonerFound,
};

export default actions;
