import React from 'react';
import { AppRegistry } from 'react-native';
import AppContainer from './src';
import store from './src/redux/store';

function Coloso() {
  return <AppContainer store={store} />;
}

AppRegistry.registerComponent('lolcena', () => Coloso);
