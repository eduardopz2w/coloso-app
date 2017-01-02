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
    pagination: {
      page: 1,
      pageSize: 1,
    },
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
    const page = action.payload.page;

    newState = newState.withMutations((mutator) => {
      if (page === 1) {
        mutator.setIn(['builds', 'fetched'], false);
        mutator.setIn(['builds', 'builds'], []);
        mutator.setIn(['builds', 'pagination'], {
          page: 1,
          pageCount: 1,
        });
      }

      mutator.setIn(['builds', 'fetchError'], false);
      mutator.setIn(['builds', 'isFetching'], true);
    });
  }

  if (action.type === 'GAME_CURRENT_VIEW/FETCH_BUILDS_FULFILLED') {
    newState = newState.withMutations((mutator) => {
      mutator.setIn(['builds', 'fetched'], true);
      mutator.setIn(['builds', 'isFetching'], false);
      mutator.updateIn(['builds', 'builds'], builds => builds.concat(action.payload.probuilds));
      mutator.setIn(['builds', 'pagination'], action.payload.pagination);
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
