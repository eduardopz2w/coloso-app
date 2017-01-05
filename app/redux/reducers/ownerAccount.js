import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { loadAccount, saveAccount } from '../actions/OwnerAccountActions';

const initialState = Immutable.fromJS({
  summonerId: 0,
  summonerName: '',
  profileIconId: 0,
  region: '',
});

export default typeToReducer({
  [saveAccount]: (state, action) => state.merge(action.payload),
  [loadAccount]: (state, action) => state.merge(action.payload),
}, initialState);
