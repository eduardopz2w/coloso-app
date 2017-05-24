// import { ToastAndroid } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
// import I18n from 'i18n-js';
import Drawer from './containers/DrawerContainer';

import { injectReducer } from './redux/store';

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

const ContentNavigator = StackNavigator({
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
  headerMode: 'none',
  cardStyle: {
    backgroundColor: 'white',
  },
});

const SideMenuNavigator = DrawerNavigator({
  Content: {
    screen: ContentNavigator,
  },
}, {
  contentComponent: Drawer,
  drawerWidth: 250,
});

const AppNavigator = SideMenuNavigator;

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('SummonerSearchView'));

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

injectReducer('router', navReducer);

const initialState2 = ContentNavigator.router.getStateForAction(ContentNavigator.router.getActionForPathAndParams('SummonerSearchView'));

const navReducer2 = (state = initialState2, action) => {
  const nextState = ContentNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

injectReducer('router2', navReducer2);

export default AppNavigator;
