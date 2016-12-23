import { combineReducers } from 'redux';
import searchView from './searchViewReducer';
import summonerProfileViewReducer from './summonerProfileViewReducer';
import gameCurrentReducer from './gameCurrentReducer';

export default combineReducers({
  searchView,
  summonerProfileView: summonerProfileViewReducer,
  gameCurrent: gameCurrentReducer,
});
