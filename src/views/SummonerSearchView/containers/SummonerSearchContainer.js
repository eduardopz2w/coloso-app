import { connect } from 'react-redux';

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

import SummonerSearchView from '../components/SummonerSearchView';

function mapStateToProps(state) {
  const searchViewState = state.summonerSearch;

  return {
    summonerName: searchViewState.get('summonerName'),
    region: searchViewState.get('region'),
    searchType: searchViewState.get('searchType'),
    isSearching: searchViewState.get('isSearching'),
    searchError: searchViewState.get('searchError'),
    errorMessage: searchViewState.get('errorMessage'),
    summonerFoundId: searchViewState.get('summonerFoundId'),
    gameFound: searchViewState.get('gameFound'),
    searchHistoryEntries: state.searchHistory.get('entries'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchSummoner: (params) => {
      dispatch(searchSummoner(params));
    },

    searchGame: (params) => {
      dispatch(searchGame(params));
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

    addSearchEntry: (params) => {
      dispatch(addEntry(params));
    },

    deleteSearchEntry: (params) => {
      dispatch(deleteEntry(params));
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

export default connect(mapStateToProps, mapDispatchToProps)(SummonerSearchView);
