import React, { Component } from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { AppRegistry, View } from 'react-native';
import { AdMobBanner } from 'react-native-admob';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import 'moment/locale/es';


import Drawer from './app/components/Drawer';
import configureStore from './app/redux/configureStore';
// -------- Views --------------
import SearchView from './app/views/SearchView';
import SummonerProfileView from './app/views/SummonerProfileView';
import ProBuildsSearchView from './app/views/ProBuildsSearchView';
import ManageAccountView from './app/views/ManageAccountView';
import ProBuildView from './app/views/ProBuildView';
import GameCurrentView from './app/views/GameCurrentView';
import StorageInstance from './app/utils/Storage';


const store = configureStore;
const ADMOB_BANNER_ID = 'ca-app-pub-9850680385333731/3213566801';

moment.locale('es');
global.Storage = StorageInstance;

class lolcena extends Component {
  componentDidMount() {
    // Actions.refresh({ key: 'drawer', open: true });
  }

  render() {
    return (<Provider store={store}>
      <View style={{ flex: 1 }}>
        <Router>
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
              />
              <Scene key="probuild_view" component={ProBuildView} hideNavBar />
              <Scene key="summoner_profile_view" component={SummonerProfileView} hideNavBar />
              <Scene key="game_current" component={GameCurrentView} hideNavBar />
              <Scene key="manage_account_view" component={ManageAccountView} hideNavBar />
            </Scene>
          </Scene>
        </Router>

        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID={ADMOB_BANNER_ID}
          testDeviceID={DeviceInfo.getUniqueID()}
        />
      </View>
    </Provider>);
  }
}

AppRegistry.registerComponent('lolcena', () => lolcena);
