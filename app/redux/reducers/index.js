import {combineReducers} from 'redux'
import searchView from './searchView'
import summonerProfileViewReducer from './summonerProfileViewReducer'

export default combineReducers({
  searchView: searchView,
  summonerProfileView: summonerProfileViewReducer
})
