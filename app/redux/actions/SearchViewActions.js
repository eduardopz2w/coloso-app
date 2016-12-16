import RiotApi from '../../utils/RiotApi'

const searchSummonerProfile = (summonerName, region) => {
  return {
    type: 'SEARCH_VIEW/SEARCH_SUMMONER_PROFILE',
    payload: {
      promise: RiotApi.summoner.findByName(summonerName, region)
    }
  }
}

let actions = {
  searchSummonerProfile: searchSummonerProfile
}

export default actions
