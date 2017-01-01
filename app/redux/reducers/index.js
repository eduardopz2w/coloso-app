import { combineReducers } from 'redux';
import searchView from './searchViewReducer';
import summonerProfileView from './summonerProfileViewReducer';
import gameCurrent from './gameCurrentReducer';
import searchHistory from './searchHistoryReducer';
import proBuildsSearchView from './proBuildsSearchViewReducer';
import proBuildView from './proBuildViewReducer';

export default combineReducers({
  searchView,
  summonerProfileView,
  gameCurrent,
  searchHistory,
  proBuildsSearchView,
  proBuildView,
});
