import { createSelectorCreator, defaultMemoize } from 'reselect';
import Immutable from 'immutable';

import denormalize from './denormalize';

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

export default (attrName, getIdsFunc, getEntitiesFunc) => createImmutableSelector(
  [getIdsFunc, getEntitiesFunc],
  (idsList, entities) => {
    if (idsList instanceof Immutable.List) {
      return idsList.map(id => denormalize(id, attrName, entities));
    }

    const id = idsList;

    return denormalize(id, attrName, entities);
  },
);
