import { connect } from 'react-redux';

import { tracker } from '../../../utils/analytics';
import { loadEntries, addEntry, deleteEntry } from '../../../modules/SearchHistoryActions';
import {
  setSummonerName,
  setRegion,
  setSearchType,
  searchSummoner,
  searchGame,
  clearSearchError,
  clearFoundData,
} from '../modules/SummonerSearchActions';

import SummonerSearch from '../components/SummonerSearch';

function mapStateToProps(state) {
  const searchViewState = state.summonerSearch;

  return {
    summonerName: searchViewState.get('summonerName'),
    region: searchViewState.get('region'),
    searchType: searchViewState.get('searchType'),
    isSearching: searchViewState.get('isSearching'),
    searchError: searchViewState.get('searchError'),
    errorMessage: searchViewState.get('errorMessage'),
    summonerFoundUrid: searchViewState.get('summonerFoundUrid'),
    gameFound: searchViewState.get('gameFound'),
    searchHistoryEntries: state.searchHistory.get('entries'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchSummoner: (summonerName, region) => {
      tracker.trackEvent('search profile', `name: ${summonerName} region: ${region}`);
      dispatch(searchSummoner(summonerName, region));
    },

    searchGame: (summonerName, region) => {
      tracker.trackEvent('search game', `name: ${summonerName} region: ${region}`);
      dispatch(searchGame(summonerName, region));
    },

    clearSearchError: () => {
      dispatch(clearSearchError());
    },

    clearFoundData: () => {
      dispatch(clearFoundData());
    },

    loadSearchHistory: () => {
      dispatch(loadEntries());
    },

    addSearchEntry: (summonerName, region) => {
      dispatch(addEntry(summonerName, region));
    },

    deleteSearchEntry: (summonerName, region) => {
      dispatch(deleteEntry(summonerName, region));
    },

    setSummonerName: (summonerName) => {
      dispatch(setSummonerName(summonerName));
    },

    setRegion: (region) => {
      dispatch(setRegion(region));
    },

    setSearchType: (searchType) => {
      dispatch(setSearchType(searchType));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SummonerSearch);
