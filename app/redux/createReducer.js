import { combineReducers } from 'redux';
import searchHistory from './reducers/searchHistory';
import ownerAccount from './reducers/ownerAccount';
import proPlayers from './reducers/proPlayers';
import entities from './reducers/entities';

export default function createReducer(asyncReducers) {
  return combineReducers({
    searchHistory,
    ownerAccount,
    proPlayers,
    entities,
    ...asyncReducers,
  });
}
