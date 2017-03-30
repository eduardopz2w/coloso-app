import React from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';

import Drawer from './containers/DrawerContainer';

// -------- Views --------------
import SummonerSearchView from './views/SummonerSearchView';
import SummonerProfileView from './views/SummonerProfileView';
import ProBuildsListView from './views/ProBuildsListView';
import ManageAccountView from './views/ManageAccountView';
import ProBuildView from './views/ProBuildView';
import GameCurrentView from './views/GameCurrentView';

function Routes() {
  return (<Router>
    <Scene key="drawer" component={Drawer}>
      <Scene key="root">
        <Scene
          key="summonerSearchView"
          component={SummonerSearchView}
          hideNavBar
          type={ActionConst.RESET}
          initial
        />
        <Scene
          key="proBuildsListView"
          component={ProBuildsListView}
          hideNavBar
          type={ActionConst.RESET}
        />
        <Scene key="proBuildView" component={ProBuildView} hideNavBar />
        <Scene key="summonerProfileView" component={SummonerProfileView} hideNavBar />
        <Scene key="gameCurrentView" component={GameCurrentView} hideNavBar />
        <Scene key="manageAccountView" component={ManageAccountView} hideNavBar />
      </Scene>
    </Scene>
  </Router>);
}

export default Routes;
