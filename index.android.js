/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {Scene, Router} from 'react-native-router-flux'
import React, { Component } from 'react'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import { AppRegistry } from 'react-native'
import Immutable from 'immutable'
import lolcenaApp from './app/redux/reducers'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

// -------- Views --------------
import SearchView from './app/views/SearchView'

const logger = createLogger({
  stateTransformer: (state) => {
    let newState = {}

    for (var i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS()
      } else {
        newState[i] = state[i]
      }
    };

    return newState
  }
})

let store = createStore(lolcenaApp, applyMiddleware(thunk, logger, promiseMiddleware()))

console.disableYellowBox = true

export default class lolcena extends Component {
  render () {
    return <Provider store={store}>
      <Router>
        <Scene key="root">
          <Scene key="search_view" component={SearchView} hideNavBar={true} initial={true}/>
        </Scene>
      </Router>
    </Provider>
  }
}

AppRegistry.registerComponent('lolcena', () => lolcena)
