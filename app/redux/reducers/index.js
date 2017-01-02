import { combineReducers } from 'redux';
import searchView from './searchViewReducer';
import summonerProfileView from './summonerProfileViewReducer';
import gameCurrentView from './gameCurrentViewReducer';
import searchHistory from './searchHistoryReducer';
import proBuildsSearchView from './proBuildsSearchViewReducer';
import proBuildView from './proBuildViewReducer';

export default combineReducers({
  searchView,
  summonerProfileView,
  gameCurrentView,
  searchHistory,
  proBuildsSearchView,
  proBuildView,
});
