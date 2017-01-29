import { createStore, applyMiddleware } from 'redux';
import Immutable from 'immutable';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import _ from 'lodash';
import promiseMiddleware from 'redux-promise-middleware';
import ColosoApiMiddleware from './middlewares/ColosoApiMiddleware';
import createReducer from './createReducer';

let middlewares = [thunk, promiseMiddleware(), ColosoApiMiddleware];

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
    collapsed: true,
  });

  middlewares = [...middlewares, logger];
}

const injectedReducers = {};
const store = createStore(createReducer(injectedReducers), applyMiddleware(...middlewares));

export function injectReducer(name, reducer) {
  injectedReducers[name] = reducer;

  store.replaceReducer(createReducer(injectedReducers));
}

export default store;
