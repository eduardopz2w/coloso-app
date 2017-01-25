import { createStore, applyMiddleware } from 'redux';
import Immutable from 'immutable';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import _ from 'lodash';
import promiseMiddleware from 'redux-promise-middleware';
import ColosoApiMiddleware from './middlewares/ColosoApiMiddleware';
import mainReducer from './reducers';

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
  });

  middlewares = [...middlewares, logger];
}

export default function configureStore() {
  const store = createStore(mainReducer, applyMiddleware(...middlewares));

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
