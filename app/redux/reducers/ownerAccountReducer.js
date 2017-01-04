import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  summonerId: 0,
  summonerName: '',
  profileIconId: 0,
  region: '',
});

function ownerAccountReducer(state = initialState, action) {
  let newState = state;

  if (action.type === 'OWNER_ACCOUNT/SAVE_ACCOUNT') {
    newState = newState.merge(action.payload);
  }

  if (action.type === 'OWNER_ACCOUNT/LOAD_ACCOUNT_FULFILLED') {
    newState = newState.merge(action.payload);
  }

  return newState;
}

export default ownerAccountReducer;
