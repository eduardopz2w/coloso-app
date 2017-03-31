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
import denormalize from '../../../utils/denormalize';

function mapStateToProps(state) {
  let summonerData = state.summonerProfile.get('summonerData');
  let leagueEntry = state.summonerProfile.get('leagueEntry');
  let championsMasteries = state.summonerProfile.get('championsMasteries');
  let gamesRecent = state.summonerProfile.get('gamesRecent');
  let masteries = state.summonerProfile.get('masteries');
  let runes = state.summonerProfile.get('runes');
  let summary = state.summonerProfile.get('summary');
  const entities = state.entities;

  if (summonerData.get('fetched')) {
    summonerData = summonerData.merge({
      data: denormalize(summonerData.get('summonerUrid'), 'summoners', entities),
    });
  }

  if (leagueEntry.get('fetched')) {
    leagueEntry = leagueEntry.merge({
      data: denormalize(leagueEntry.get('leagueEntryId'), 'leagueEntries', entities),
    });
  }

  if (championsMasteries.get('fetched')) {
    championsMasteries = championsMasteries.merge({
      data: denormalize(championsMasteries.get('championsMasteriesId'), 'championsMasteries', entities),
    });
  }

  if (gamesRecent.get('fetched')) {
    gamesRecent = gamesRecent.merge({
      data: denormalize(gamesRecent.get('gamesRecentId'), 'gamesRecent', entities),
    });
  }

  if (masteries.get('fetched')) {
    masteries = masteries.merge({
      data: denormalize(masteries.get('masteriesId'), 'masteries', entities),
    });
  }

  if (runes.get('fetched')) {
    runes = runes.merge({
      data: denormalize(runes.get('runesId'), 'runes', entities),
    });
  }

  if (summary.get('fetched')) {
    summary = summary.merge({
      data: denormalize(summary.get('statsSummariesId'), 'statsSummaries', entities),
    });
  }

  return {
    summonerData,
    leagueEntry,
    championsMasteries,
    gamesRecent,
    masteries,
    runes,
    summary,
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
