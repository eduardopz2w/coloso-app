import { connect } from 'react-redux';

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
import createSelector from '../../../utils/createSelector';
import keyIn from '../../../utils/keyIn';

const getChampionsMasteriesState = state => state.summonerProfile.get('championsMasteries');
const getChampionsMasteriesEntities = state => state.entities.filter(keyIn('championsMasteries'));
const getGamesRecentState = state => state.summonerProfile.get('gamesRecent');
const getGamesRecentEntities = state => state.entities.filter(keyIn('gamesRecent'));
const getMasteriesState = state => state.summonerProfile.get('masteries');
const getMasteriesEntities = state => state.entities.filter(keyIn('masteries'));
const getLeagueEntriesState = state => state.summonerProfile.get('leagueEntries');
const getLeagueEntriesEntities = state => state.entities.filter(keyIn('leagueEntries'));
const getRunesState = state => state.summonerProfile.get('runes');
const getRunesEntities = state => state.entities.filter(keyIn('runes'));
const getSummaryState = state => state.summonerProfile.get('summary');
const getSummaryEntities = state => state.entities.filter(keyIn('statsSummaries'));
const getSummonerState = state => state.summonerProfile.get('summonerData');
const getSummonerEntities = state => state.entities.filter(keyIn('summoners'));

const getSummoner = createSelector('summoners', getSummonerState, getSummonerEntities);
const getMasteries = createSelector('masteries', getMasteriesState, getMasteriesEntities);
const getGamesRecent = createSelector('gamesRecent', getGamesRecentState, getGamesRecentEntities);
const getLeagueEntries = createSelector('leagueEntries', getLeagueEntriesState, getLeagueEntriesEntities);
const getChampionsMasteries = createSelector('championsMasteries', getChampionsMasteriesState, getChampionsMasteriesEntities);
const getRunes = createSelector('runes', getRunesState, getRunesEntities);
const getSummary = createSelector('statsSummaries', getSummaryState, getSummaryEntities);

function mapStateToProps(state) {
  return {
    summonerData: getSummoner(state),
    leagueEntries: getLeagueEntries(state),
    championsMasteries: getChampionsMasteries(state),
    gamesRecent: getGamesRecent(state),
    masteries: getMasteries(state),
    runes: getRunes(state),
    summary: getSummary(state),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { summonerUrid } = ownProps;

  return {
    fetchSummonerData: () => {
      dispatch(fetchSummonerData(summonerUrid));
    },

    fetchLeagueEntry: () => {
      dispatch(fetchLeagueEntry(summonerUrid));
    },

    fetchChampionsMasteries: () => {
      dispatch(fetchChampionsMasteries(summonerUrid));
    },

    fetchGamesRecent: () => {
      dispatch(fetchGamesRecent(summonerUrid));
    },

    fetchMasteries: () => {
      dispatch(fetchMasteries(summonerUrid));
    },

    fetchRunes: () => {
      dispatch(fetchRunes(summonerUrid));
    },

    fetchSummary: (season) => {
      dispatch(fetchSummary(summonerUrid, season));
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
