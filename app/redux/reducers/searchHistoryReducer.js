/*eslint-disable */
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  entries: [
    { summonerName: 'armaghyon', region: 'lan'},
    { summonerName: 'jhoneykerman', region: 'lan'},
    { summonerName: 'randymujik', region: 'lan'},
    { summonerName: 'crist1an', region: 'lan'},
  ]
});

function searchView(state = initialState, action) {
  let newState = state;

  if (action.type === 'SEARCH_HISTORY/LOAD_ENTRIES') {
    // TODO: Cargar entradas
  }

  return newState;
}

export default searchView;
