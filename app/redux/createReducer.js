import { combineReducers } from 'redux';
import searchView from './reducers/searchView';
import summonerProfileView from './reducers/summonerProfileView';
import gameCurrentView from './reducers/gameCurrentView';
import searchHistory from './reducers/searchHistory';
import ownerAccount from './reducers/ownerAccount';
import proPlayers from './reducers/proPlayers';
import entities from './reducers/entities';

export default function createReducer(asyncReducers) {
  return combineReducers({
    searchView,
    summonerProfileView,
    gameCurrentView,
    searchHistory,
    ownerAccount,
    proPlayers,
    entities,
    ...asyncReducers,
  });
}
