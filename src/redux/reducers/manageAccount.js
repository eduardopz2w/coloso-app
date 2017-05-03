import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { loadAccount, saveAccount } from '../../modules/ManageAccountActions';

const initialState = Immutable.fromJS({
  id: null,
  accountId: null,
  name: null,
  profileIconId: null,
  region: null,
});

export default typeToReducer({
  [saveAccount]: (state, action) => state.merge(action.payload),
  [loadAccount]: {
    FULFILLED: (state, action) => state.merge(action.payload),
  },
}, initialState);
