import RiotApi from '../../utils/RiotApi';

function fetchSummonerData(summonerId, region) {
  return {
    type: 'SUMMONER_PROFILE_VIEW/FETCH_SUMMONER_DATA',
    payload: {
      promise: RiotApi.summoner.findById(summonerId, region),
    },
  };
}

const actions = {
  fetchSummonerData,
};

export default actions;
