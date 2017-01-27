import React from 'react';
import { AppRegistry } from 'react-native';
import AppContainer from './app';
import configureStore from './app/redux/configureStore';

const store = configureStore();

function Coloso() {
  return <AppContainer store={store} />;
}

AppRegistry.registerComponent('lolcena', () => Coloso);
