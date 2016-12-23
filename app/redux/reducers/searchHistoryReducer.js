/*eslint-disable */
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  entries: []
});

function searchView(state = initialState, action) {
  let newState = state;

  if (action.type === 'SEARCH_HISTORY/UPDATE_ENTRIES') {
    // TODO: Cargar entradas
    newState = newState.merge({
      entries: action.payload.entries,
    });
  }

  return newState;
}

export default searchView;
