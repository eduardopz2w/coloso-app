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

function fetchChampionsMastery(summonerId, region) {
  return {
    type: 'SUMMONER_PROFILE_VIEW/FETCH_CHAMPIONS_MASTERY',
    payload: {
      promise: RiotApi.summoner.championsMastery(summonerId, region),
    },
  };
}

function fetchGamesRecent(summonerId, region) {
  return {
    type: 'SUMMONER_PROFILE_VIEW/FETCH_GAMES_RECENT',
    payload: {
      promise: RiotApi.summoner.gamesRecent(summonerId, region),
    },
  };
}

function fetchMasteries(summonerId, region) {
  return {
    type: 'SUMMONER_PROFILE_VIEW/FETCH_MASTERIES',
    payload: {
      promise: RiotApi.summoner.masteries(summonerId, region),
    },
  };
}

function fetchRunes(summonerId, region) {
  return {
    type: 'SUMMONER_PROFILE_VIEW/FETCH_RUNES',
    payload: {
      promise: RiotApi.summoner.runes(summonerId, region),
    },
  };
}

function fetchSummary(summonerId, region, season) {
  return {
    type: 'SUMMONER_PROFILE_VIEW/FETCH_SUMMARY',
    payload: {
      promise: RiotApi.summoner.stats.summary(summonerId, region, season),
    },
  };
}

const actions = {
  fetchSummonerData,
  fetchLeagueEntry,
  fetchChampionsMastery,
  fetchGamesRecent,
  fetchMasteries,
  fetchRunes,
  fetchSummary,
};

export default actions;
