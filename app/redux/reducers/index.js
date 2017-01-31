import { combineReducers } from 'redux';
import searchView from './searchView';
import summonerProfileView from './summonerProfileView';
import gameCurrentView from './gameCurrentView';
import searchHistory from './searchHistory';
import proBuildView from './proBuildView';
import ownerAccount from './ownerAccount';
import proPlayers from './proPlayers';
import entities from './entities';

let reducer = combineReducers({
  searchView,
  summonerProfileView,
  gameCurrentView,
  searchHistory,
  proBuildView,
  ownerAccount,
  proPlayers,
  entities,
});

export function injectReducer(key, reduceToInject) {
  // TODO
}

console.log(reducer);

export default reducer;