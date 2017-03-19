import { combineReducers } from 'redux';
import searchHistory from './reducers/searchHistory';
import ownerAccount from './reducers/ownerAccount';
import proPlayers from './reducers/proPlayers';
import proBuilds from './reducers/proBuildsReducer';
import favoriteProBuilds from './reducers/favoriteProBuildsReducer';
import entities from './reducers/entities';

export default function createReducer(asyncReducers) {
  return combineReducers({
    searchHistory,
    ownerAccount,
    proPlayers,
    proBuilds,
    favoriteProBuilds,
    entities,
    ...asyncReducers,
  });
}
