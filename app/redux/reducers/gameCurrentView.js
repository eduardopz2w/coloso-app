import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { fetchBuilds } from '../actions/GameCurrentViewActions';
import { searchGame } from '../actions/SearchViewActions';

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

export default typeToReducer({
  [searchGame]: {
    FULFILLED: (state, action) => state.merge({
      gameData: action.payload,
      builds: {
        fetched: false,
        fetchError: false,
        errorMessage: '',
        isFetching: true,
        builds: [],
      },
    }),
  },

  [fetchBuilds]: {
    PENDING: (state, action) => state.withMutations((mutator) => {
      if (action.payload.page === 1) {
        mutator.setIn(['builds', 'fetched'], false);
        mutator.setIn(['builds', 'builds'], []);
        mutator.setIn(['builds', 'pagination'], {
          page: 1,
          pageCount: 1,
        });
      }

      mutator.setIn(['builds', 'fetchError'], false);
      mutator.setIn(['builds', 'isFetching'], true);
    }),

    FULFILLED: (state, action) => state.withMutations((mutator) => {
      mutator.setIn(['builds', 'fetched'], true);
      mutator.setIn(['builds', 'isFetching'], false);
      mutator.updateIn(['builds', 'builds'], builds => builds.concat(action.payload.probuilds));
      mutator.setIn(['builds', 'pagination'], action.payload.pagination);
    }),

    REJECTED: (state, action) => state.mergeIn(['builds'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
}, initialState);
