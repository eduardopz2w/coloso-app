// import { ToastAndroid } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
// import I18n from 'i18n-js';

import Drawer from './containers/DrawerContainer';

// -------- Views --------------
import SummonerSearchView from './views/SummonerSearchView';
import SummonerProfileView from './views/SummonerProfileView';
import ProBuildsListView from './views/ProBuildsListView';
import ManageAccountView from './views/ManageAccountView';
import ProBuildView from './views/ProBuildView';
import GameCurrentView from './views/GameCurrentView';
import SettingsView from './views/SettingsView';

// let waitingNextExit = false;
//
// function handleOnExitApp() {
//   if (waitingNextExit) {
//     return false;
//   }
//
//   waitingNextExit = true;
//
//   setTimeout(() => {
//     waitingNextExit = false;
//   }, 3000);
//
//   ToastAndroid.show(I18n.t('press_again_to_quit'), ToastAndroid.SHORT);
//
//   return true;
// }

export default DrawerNavigator({
  SummonerSearchView: {
    screen: SummonerSearchView,
  },
  ProBuildsListView: {
    screen: ProBuildsListView,
  },
  ProBuildView: {
    screen: ProBuildView,
  },
  SummonerProfileView: {
    screen: SummonerProfileView,
  },
  GameCurrentView: {
    screen: GameCurrentView,
  },
  ManageAccountView: {
    screen: ManageAccountView,
  },
  SettingsView: {
    screen: SettingsView,
  },
}, {
  drawerWidth: 250,
  contentComponent: Drawer,
});
