import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Drawer from '../components/Drawer';
import { loadAccount } from '../modules/ManageAccountActions';
import {
  setSummonerName,
  setRegion,
  setSearchType,
  searchGame,
} from '../views/SummonerSearchView/modules/SummonerSearchActions';

function mapStateToProps(state) {
  return {
    riotAccount: state.manageAccount.get('data'),
    isSearchingGame: state.summonerSearch.get('isSearching'),
  };
}

function replaceRoute(dispatch, routeName) {
  dispatch(NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })],
  }));
}

function mapDispatchToProps(dispatch) {
  return {
    loadAccount: () => {
      dispatch(loadAccount());
    },

    searchGame: ({ summonerName, region }) => {
      dispatch(setSummonerName(summonerName));
      dispatch(setRegion(region));
      dispatch(setSearchType('GAME_SEARCH'));
      dispatch(searchGame({ summonerName, region }));
    },

    goToProBuildsList: () => {
      replaceRoute(dispatch, 'ProBuildsListView');
    },

    goToSummonerSearch: () => {
      replaceRoute(dispatch, 'SummonerSearchView');
    },

    goToSummonerProfile: (summonerId) => {
      dispatch(NavigationActions.back({ key: null }));
      dispatch(NavigationActions.navigate({ routeName: 'SummonerProfileView', params: { summonerId } }));
    },

    goToManageAccount: () => {
      dispatch(NavigationActions.back({ key: null }));
      dispatch(NavigationActions.navigate({ routeName: 'ManageAccountView' }));
    },

    goToSettings: () => {
      dispatch(NavigationActions.back({ key: null }));
      dispatch(NavigationActions.navigate({ routeName: 'SettingsView' }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawer);
