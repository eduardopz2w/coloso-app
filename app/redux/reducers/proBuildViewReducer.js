import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  fetched: false,
  fetchError: false,
  errorMessage: '',
  isFetching: true,
  build: {},
});

function probuildViewReducer(state = initialState, action) {
  let newState = state;

  if (action.type === 'PROBUILD_VIEW/FETCH_BUILD_PENDING') {
    newState = newState.merge({
      fetched: false,
      isFetching: true,
      fetchError: false,
    });
  }

  if (action.type === 'PROBUILD_VIEW/FETCH_BUILD_FULFILLED') {
    newState = newState.merge({
      fetched: true,
      isFetching: false,
      build: action.payload,
    });
  }

  if (action.type === 'PROBUILD_VIEW/FETCH_BUILD_REJECTED') {
    newState = newState.merge({
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    });
  }

  return newState;
}

export default probuildViewReducer;
