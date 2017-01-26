import React from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';

import Drawer from './components/Drawer';

// -------- Views --------------
import SearchView from './views/SearchView';
import SummonerProfileView from './views/SummonerProfileView';
import ProBuildsSearchView from './views/ProBuildsSearchView';
import ManageAccountView from './views/ManageAccountView';
import ProBuildView from './views/ProBuildView';
import GameCurrentView from './views/GameCurrentView';

function Routes() {
  return (<Router>
    <Scene key="drawer" component={Drawer}>
      <Scene key="root">
        <Scene
          key="search_view"
          component={SearchView}
          hideNavBar initial
          type={ActionConst.RESET}
        />
        <Scene
          key="probuilds_search_view"
          component={ProBuildsSearchView}
          hideNavBar
          type={ActionConst.RESET}
          initial
        />
        <Scene key="probuild_view" component={ProBuildView} hideNavBar />
        <Scene key="summoner_profile_view" component={SummonerProfileView} hideNavBar />
        <Scene key="game_current" component={GameCurrentView} hideNavBar />
        <Scene key="manage_account_view" component={ManageAccountView} hideNavBar />
      </Scene>
    </Scene>
  </Router>);
}

export default Routes;
