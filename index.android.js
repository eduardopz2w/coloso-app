import React from 'react';
import { AppRegistry } from 'react-native';
import AppContainer from './app';
import store from './app/redux/store';

function Coloso() {
  return <AppContainer store={store} />;
}

AppRegistry.registerComponent('lolcena', () => Coloso);
