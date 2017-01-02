/*eslint-disable */
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  gameData: {},
  builds: {
    fetched: false,
    fetchError: false,
    errorMessage: '',
    isFetching: true,
    builds: [],
  },
});

function searchView(state = initialState, action) {
  let newState = state;

  if (action.type === 'SEARCH_VIEW/SEARCH_GAME_FULFILLED') {
    newState = newState.merge({
      gameData: action.payload,
      builds: {
        fetched: false,
        fetchError: false,
        errorMessage: '',
        isFetching: true,
        builds: [],
      }
    });
  }

  if (action.type === 'GAME_CURRENT_VIEW/FETCH_BUILDS_PENDING') {
    newState = newState.mergeIn(['builds'], {
      fetched: false,
      isFetching: true,
      fetchError: false,
      builds: [],
    });
  }

  if (action.type === 'GAME_CURRENT_VIEW/FETCH_BUILDS_FULFILLED') {
    newState = newState.mergeIn(['builds'], {
      fetched: true,
      isFetching: false,
      builds: action.payload,
    });
  }

  if (action.type === 'GAME_CURRENT_VIEW/FETCH_BUILDS_REJECTED') {
    newState = newState.mergeIn(['builds'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    });
  }

  return newState;
}

export default searchView;
