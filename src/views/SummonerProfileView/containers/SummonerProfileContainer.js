import { connect } from 'react-redux';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import Immutable from 'immutable';

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
import denormalize from '../../../utils/denormalize';

function keyIn(...keys) {
  const keySet = Immutable.Set(keys);
  return (v, k) => keySet.has(k);
}

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

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


const createSelector = (attrName, getState, getEntities) => createImmutableSelector(
  [getState, getEntities],
  (state, entities) => {
    let newState = state;

    if (newState.get('fetched')) {
      newState = newState.merge({
        data: denormalize(newState.get('id'), attrName, entities),
      });
    }

    return newState;
  },
);

const summonerSelector = createSelector('summoners', getSummonerState, getSummonerEntities);
const masteriesSelector = createSelector('masteries', getMasteriesState, getMasteriesEntities);
const gamesRecentSelector = createSelector('gamesRecent', getGamesRecentState, getGamesRecentEntities);
const leagueEntriesSelector = createSelector('leagueEntries', getLeagueEntriesState, getLeagueEntriesEntities);
const championsMasteriesSelector = createSelector('championsMasteries', getChampionsMasteriesState, getChampionsMasteriesEntities);
const runesSelector = createSelector('runes', getRunesState, getRunesEntities);
const summarySelector = createSelector('statsSummaries', getSummaryState, getSummaryEntities);

const getSummoner = summonerSelector;
const getMasteries = masteriesSelector;
const getGamesRecent = gamesRecentSelector;
const getLeagueEntries = leagueEntriesSelector;
const getChampionsMasteries = championsMasteriesSelector;
const getRunes = runesSelector;
const getSummary = summarySelector;

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
