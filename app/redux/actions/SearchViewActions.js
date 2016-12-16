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

let actions = {
  searchSummonerProfile: searchSummonerProfile,
  clearSearchError: clearSearchError
}

export default actions
