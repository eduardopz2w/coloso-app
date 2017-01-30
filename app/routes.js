import React from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';

import Drawer from './containers/DrawerContainer';

// -------- Views --------------
import SummonerSearch from './views/SummonerSearch';
import SummonerProfile from './views/SummonerProfile';
import ProBuildsList from './views/ProBuildsList';
import ManageAccount from './views/ManageAccount';
import ProBuild from './views/ProBuild';
import GameCurrent from './views/GameCurrent';

function Routes() {
  return (<Router>
    <Scene key="drawer" component={Drawer}>
      <Scene key="root">
        <Scene
          key="search_view"
          component={SummonerSearch}
          hideNavBar
          type={ActionConst.RESET}
          initial
        />
        <Scene
          key="probuilds_search_view"
          component={ProBuildsList}
          hideNavBar
          type={ActionConst.RESET}
        />
        <Scene key="probuild_view" component={ProBuild} hideNavBar />
        <Scene key="summoner_profile_view" component={SummonerProfile} hideNavBar />
        <Scene key="game_current" component={GameCurrent} hideNavBar />
        <Scene key="manage_account_view" component={ManageAccount} hideNavBar />
      </Scene>
    </Scene>
  </Router>);
}

export default Routes;
