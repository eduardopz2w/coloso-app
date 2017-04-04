import { createSelectorCreator, defaultMemoize } from 'reselect';
import Immutable from 'immutable';

import denormalize from './denormalize';

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

export default (attrName, getState, getEntities) => createImmutableSelector(
  [getState, getEntities],
  (state, entities) => {
    let newState = state;

    if (newState.get('fetched')) {
      newState = newState.merge({
        data: denormalize(newState.get('id'), attrName, entities),
      });
    }

    return newState;
  },
);
