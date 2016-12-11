/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native'
import HomeView from './app/views/HomeView'

export default class lolcena extends Component {
  render () {
    return <HomeView />
  }
}

const styles = StyleSheet.create({
})

AppRegistry.registerComponent('lolcena', () => lolcena)
