import { connect } from 'react-redux';

import { keyIn, createDenormalizeSelector } from 'utils';
import SummonerProfileView from '../components/SummonerProfileView';
import {
  fetchSummonerData,
  fetchLeagueEntry,
  fetchChampionsMasteries,
  fetchGamesRecent,
  fetchMasteries,
  fetchRunes,
  fetchSummary,
  clearCache,
} from '../modules/SummonerProfileActions';

const getChampionsMasteriesId = state => state.summonerProfile.getIn(['championsMasteries', 'id']);
const getChampionsMasteriesEntities = state => state.entities.filter(keyIn('championsMasteries'));
const getGamesRecentId = state => state.summonerProfile.getIn(['gamesRecent', 'id']);
const getGamesRecentEntities = state => state.entities.filter(keyIn('gamesRecent'));
const getMasteriesId = state => state.summonerProfile.getIn(['masteries', 'id']);
const getMasteriesEntities = state => state.entities.filter(keyIn('masteries'));
const getLeagueEntriesId = state => state.summonerProfile.getIn(['leagueEntries', 'id']);
const getLeagueEntriesEntities = state => state.entities.filter(keyIn('leagueEntries'));
const getRunesId = state => state.summonerProfile.getIn(['runes', 'id']);
const getRunesEntities = state => state.entities.filter(keyIn('runes'));
const getSummaryId = state => state.summonerProfile.getIn(['summary', 'id']);
const getSummaryEntities = state => state.entities.filter(keyIn('statsSummaries'));
const getSummonerId = state => state.summonerProfile.getIn(['summonerData', 'id']);
const getSummonerEntities = state => state.entities.filter(keyIn('summoners'));

const getSummoner = createDenormalizeSelector('summoners', getSummonerId, getSummonerEntities);
const getMasteries = createDenormalizeSelector('masteries', getMasteriesId, getMasteriesEntities);
const getGamesRecent = createDenormalizeSelector('gamesRecent', getGamesRecentId, getGamesRecentEntities);
const getLeagueEntries = createDenormalizeSelector('leagueEntries', getLeagueEntriesId, getLeagueEntriesEntities);
const getChampionsMasteries = createDenormalizeSelector('championsMasteries', getChampionsMasteriesId, getChampionsMasteriesEntities);
const getRunes = createDenormalizeSelector('runes', getRunesId, getRunesEntities);
const getSummary = createDenormalizeSelector('statsSummaries', getSummaryId, getSummaryEntities);

function mapStateToProps(state) {
  let summonerData = state.summonerProfile.get('summonerData');
  let leagueEntries = state.summonerProfile.get('leagueEntries');
  let championsMasteries = state.summonerProfile.get('championsMasteries');
  let gamesRecent = state.summonerProfile.get('gamesRecent');
  let masteries = state.summonerProfile.get('masteries');
  let runes = state.summonerProfile.get('runes');
  let summary = state.summonerProfile.get('summary');

  if (summonerData.get('fetched')) {
    summonerData = summonerData.set('data', getSummoner(state));
  }

  if (leagueEntries.get('fetched')) {
    leagueEntries = leagueEntries.set('data', getLeagueEntries(state));
  }

  if (championsMasteries.get('fetched')) {
    championsMasteries = championsMasteries.set('data', getChampionsMasteries(state));
  }

  if (gamesRecent.get('fetched')) {
    gamesRecent = gamesRecent.set('data', getGamesRecent(state));
  }

  if (masteries.get('fetched')) {
    masteries = masteries.set('data', getMasteries(state));
  }

  if (runes.get('fetched')) {
    runes = runes.set('data', getRunes(state));
  }

  if (summary.get('fetched')) {
    summary = summary.set('data', getSummary(state));
  }

  return {
    summonerData,
    leagueEntries,
    championsMasteries,
    gamesRecent,
    masteries,
    runes,
    summary,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSummonerData: (summonerId) => {
      dispatch(fetchSummonerData({ id: summonerId }));
    },

    fetchLeagueEntry: (summonerId) => {
      dispatch(fetchLeagueEntry({ summonerId }));
    },

    fetchChampionsMasteries: (summonerId) => {
      dispatch(fetchChampionsMasteries({ summonerId }));
    },

    fetchGamesRecent: (summonerId) => {
      dispatch(fetchGamesRecent({ summonerId }));
    },

    fetchMasteries: (summonerId) => {
      dispatch(fetchMasteries({ summonerId }));
    },

    fetchRunes: (summonerId) => {
      dispatch(fetchRunes({ summonerId }));
    },

    fetchSummary: (summonerId, season) => {
      dispatch(fetchSummary({ summonerId, season }));
    },

    clearCache: () => {
      dispatch(clearCache());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SummonerProfileView);
