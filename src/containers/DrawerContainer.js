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
      dispatch(NavigationActions.navigate({ routeName: 'ProBuildsListView' }));
    },

    goToSummonerSearch: () => {
      dispatch(NavigationActions.navigate({ routeName: 'SummonerSearchView' }));
    },

    goToSummonerProfile: (summonerId) => {
      dispatch(NavigationActions.navigate({ routeName: 'SummonerProfileView', params: { summonerId } }));
    },

    goToManageAccount: () => {
      dispatch(NavigationActions.navigate({ routeName: 'ManageAccountView' }));
    },

    goToSettings: () => {
      dispatch(NavigationActions.navigate({ routeName: 'SettingsView' }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawer);
