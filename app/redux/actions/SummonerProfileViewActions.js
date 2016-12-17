import RiotApi from '../../utils/RiotApi'

const fetchSummonerData = (summonerId, region) => {
  return {
    type: 'SUMMONER_PROFILE_VIEW/FETCH_SUMMONER_DATA',
    payload: {
      promise: RiotApi.summoner.findById(summonerId, region)
    }
  }
}

let actions = {
  fetchSummonerData: fetchSummonerData
}

export default actions
