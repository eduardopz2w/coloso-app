/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 // TODO: Usar appbar en el router
import { Scene, Router } from 'react-native-router-flux';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppRegistry, View } from 'react-native';
import { AdMobBanner } from 'react-native-admob';
import Immutable from 'immutable';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/es';

import lolcenaApp from './app/redux/reducers';
// -------- Views --------------
import SearchView from './app/views/SearchView';
import SummonerProfileView from './app/views/SummonerProfileView';
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

console.disableYellowBox = true;

const lolcena = function lolcena() {
  return (<Provider store={store}>
    <View style={{ flex: 1 }}>
      <Router>
        <Scene key="root">
          <Scene key="search_view" component={SearchView} hideNavBar initial />
          <Scene key="summoner_profile_view" component={SummonerProfileView} hideNavBar />
          <Scene key="game_current" component={GameCurrentView} hideNavBar />
        </Scene>
      </Router>

      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={ADMOB_BANNER_ID}
        didFailToReceiveAdWithError={console.log}
      />
    </View>
  </Provider>);
};

AppRegistry.registerComponent('lolcena', () => lolcena);
