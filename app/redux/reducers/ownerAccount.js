import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { loadAccount, saveAccount } from '../actions/OwnerAccountActions';

const initialState = Immutable.fromJS({
  summonerUrid: null,
  summonerName: null,
  profileIconId: null,
  region: null,
});

export default typeToReducer({
  [saveAccount]: (state, action) => state.merge(action.payload),
  [loadAccount]: {
    FULFILLED: (state, action) => state.merge(action.payload),
  },
}, initialState);
