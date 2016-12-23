import { combineReducers } from 'redux';
import searchView from './searchViewReducer';
import summonerProfileViewReducer from './summonerProfileViewReducer';
import gameCurrentReducer from './gameCurrentReducer';
import searchHistoryReducer from './searchHistoryReducer';

export default combineReducers({
  searchView,
  summonerProfileView: summonerProfileViewReducer,
  gameCurrent: gameCurrentReducer,
  searchHistory: searchHistoryReducer,
});
