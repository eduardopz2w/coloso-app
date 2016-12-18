import RiotApi from '../../utils/RiotApi';

function fetchSummonerData(summonerId, region) {
  return {
    type: 'SUMMONER_PROFILE_VIEW/FETCH_SUMMONER_DATA',
    payload: {
      promise: RiotApi.summoner.findById(summonerId, region),
    },
  };
}

function fetchLeagueEntry(summonerId, region) {
  return {
    type: 'SUMMONER_PROFILE_VIEW/FETCH_LEAGUE_ENTRY',
    payload: {
      promise: RiotApi.summoner.leagueEntry(summonerId, region),
    },
  };
}

const actions = {
  fetchSummonerData,
  fetchLeagueEntry,
};

export default actions;
