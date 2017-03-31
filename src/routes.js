import React from 'react';
import { ToastAndroid } from 'react-native';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import I18n from 'i18n-js';

import Drawer from './containers/DrawerContainer';

// -------- Views --------------
import SummonerSearchView from './views/SummonerSearchView';
import SummonerProfileView from './views/SummonerProfileView';
import ProBuildsListView from './views/ProBuildsListView';
import ManageAccountView from './views/ManageAccountView';
import ProBuildView from './views/ProBuildView';
import GameCurrentView from './views/GameCurrentView';

let waitingNextExit = false;

function handleOnExitApp() {
  if (waitingNextExit) {
    return false;
  }

  waitingNextExit = true;

  setTimeout(() => {
    waitingNextExit = false;
  }, 3000);

  ToastAndroid.show(I18n.t('press_again_to_quit'), ToastAndroid.SHORT);

  return true;
}

function Routes() {
  return (<Router onExitApp={handleOnExitApp}>
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
