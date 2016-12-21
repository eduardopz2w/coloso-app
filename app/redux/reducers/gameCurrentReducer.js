import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

function searchView(state = initialState, action) {
  let newState = state;

  if (action.type === 'SEARCH_VIEW/SEARCH_GAME_FULFILLED') {
    newState = newState.merge({
      gameData: action.payload,
    });
  }

  return newState;
}

export default searchView;
