import { combineReducers } from 'redux';
import searchView from './searchView';
import summonerProfileView from './summonerProfileView';
import gameCurrentView from './gameCurrentView';
import searchHistory from './searchHistory';
import proBuildsSearchView from './proBuildsSearchView';
import proBuildView from './proBuildView';
import ownerAccount from './ownerAccount';

export default combineReducers({
  searchView,
  summonerProfileView,
  gameCurrentView,
  searchHistory,
  proBuildsSearchView,
  proBuildView,
  ownerAccount,
});
