/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Scene, Router } from 'react-native-router-flux';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppRegistry } from 'react-native';
import Immutable from 'immutable';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import _ from 'lodash';

import lolcenaApp from './app/redux/reducers';
// -------- Views --------------
import SearchView from './app/views/SearchView';
import SummonerProfileView from './app/views/SummonerProfileView';
import GameCurrentView from './app/views/GameCurrentView';

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

let middlewares = [thunk, promiseMiddleware()];

if (__DEV__) {
  middlewares = [...middlewares, logger];
}

const store = createStore(lolcenaApp, applyMiddleware(...middlewares));

console.disableYellowBox = true;

const lolcena = function lolcena() {
  return (<Provider store={store}>
    <Router>
      <Scene key="root">
        <Scene key="search_view" component={SearchView} hideNavBar />
        <Scene key="summoner_profile_view" component={SummonerProfileView} hideNavBar />
        <Scene key="game_current" component={GameCurrentView} hideNavBar initial />
      </Scene>
    </Router>
  </Provider>);
};

AppRegistry.registerComponent('lolcena', () => lolcena);
