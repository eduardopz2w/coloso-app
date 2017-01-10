import React, { Component } from 'react';
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppRegistry, View } from 'react-native';
import { AdMobBanner } from 'react-native-admob';
import Immutable from 'immutable';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import DeviceInfo from 'react-native-device-info';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/es';

import lolcenaApp from './app/redux/reducers';
import Drawer from './app/components/Drawer';
// -------- Views --------------
import SearchView from './app/views/SearchView';
import SummonerProfileView from './app/views/SummonerProfileView';
import ProBuildsSearchView from './app/views/ProBuildsSearchView';
import ManageAccountView from './app/views/ManageAccountView';
import ProBuildView from './app/views/ProBuildView';
import GameCurrentView from './app/views/GameCurrentView';
import StorageInstance from './app/utils/Storage';


let middlewares = [thunk, promiseMiddleware()];

if (__DEV__) {
  const logger = createLogger({
    stateTransformer: (state) => {
      const newState = {};

      _.each(state, (value, key) => {
        if (Immutable.Iterable.isIterable(value)) {
          newState[key] = value.toJS();
        } else {
          newState[key] = value;
        }
      });

      return newState;
    },
  });

  middlewares = [...middlewares, logger];
}

const store = createStore(lolcenaApp, applyMiddleware(...middlewares));
const ADMOB_BANNER_ID = 'ca-app-pub-9850680385333731/3213566801';

moment.locale('es');
global.Storage = StorageInstance;

class lolcena extends Component {
  componentDidMount() {
    Actions.refresh({ key: 'drawer', open: true });
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

      </View>
    </Provider>);
  }
}

AppRegistry.registerComponent('lolcena', () => lolcena);
