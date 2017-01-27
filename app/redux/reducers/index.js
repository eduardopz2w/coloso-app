import { combineReducers } from 'redux';
import searchView from './searchView';
import summonerProfileView from './summonerProfileView';
import gameCurrentView from './gameCurrentView';
import searchHistory from './searchHistory';
import proBuildsList from './proBuildsList';
import proBuildView from './proBuildView';
import ownerAccount from './ownerAccount';
import proPlayers from './proPlayers';
import entities from './entities';

export default combineReducers({
  searchView,
  summonerProfileView,
  gameCurrentView,
  searchHistory,
  proBuildsList,
  proBuildView,
  ownerAccount,
  proPlayers,
  entities,
});
