import RiotApi from '../../utils/RiotApi'

const searchSummonerProfile = (summonerName, region) => {
  return {
    type: 'SEARCH_VIEW/SEARCH_SUMMONER_PROFILE',
    payload: {
      promise: RiotApi.summoner.findByName(summonerName, region)
    }
  }
}

const clearSearchError = () => {
  return {
    type: 'SEARCH_VIEW/CLEAR_SEARCH_ERROR'
  }
}

const clearSummonerFound = () => {
  return {
    type: 'SEARCH_VIEW/CLEAR_SUMMONER_FOUND'
  }
}

let actions = {
  searchSummonerProfile: searchSummonerProfile,
  clearSearchError: clearSearchError,
  clearSummonerFound: clearSummonerFound
}

export default actions
