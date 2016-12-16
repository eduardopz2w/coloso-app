/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import { AppRegistry } from 'react-native'
import Immutable from 'immutable'
import SearchView from './app/views/SearchView'
import lolcenaApp from './app/redux/reducers'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

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

export default class lolcena extends Component {
  render () {
    return <Provider store={store}>
      <SearchView />
    </Provider>
  }
}

AppRegistry.registerComponent('lolcena', () => lolcena)
