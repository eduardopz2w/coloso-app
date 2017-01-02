import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  builds: {
    fetched: false,
    fetchError: false,
    errorMessage: '',
    isFetching: true,
    builds: [],
  },
});

function proBuildsSearchViewReducer(state = initialState, action) {
  let newState = state;

  if (action.type === 'PROBUILDS_SEARCH_VIEW/FETCH_BUILDS_PENDING') {
    newState = newState.mergeIn(['builds'], {
      fetched: false,
      isFetching: true,
      fetchError: false,
      builds: [],
    });
  }

  if (action.type === 'PROBUILDS_SEARCH_VIEW/FETCH_BUILDS_FULFILLED') {
    newState = newState.mergeIn(['builds'], {
      fetched: true,
      isFetching: false,
      builds: action.payload,
    });
  }

  if (action.type === 'PROBUILDS_SEARCH_VIEW/FETCH_BUILDS_REJECTED') {
    newState = newState.mergeIn(['builds'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    });
  }

  return newState;
}

export default proBuildsSearchViewReducer;
