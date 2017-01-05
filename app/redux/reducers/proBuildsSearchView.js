import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { fetchBuilds } from '../actions/ProBuildsSearchActions';

const initialState = Immutable.fromJS({
  builds: {
    fetched: false,
    fetchError: false,
    errorMessage: '',
    isFetching: false,
    builds: [],
    pagination: {
      page: 1,
      pageCount: 1,
    },
    championSelected: null,
  },
});

export default typeToReducer({
  [fetchBuilds]: {
    PENDING: (state, action) => state.withMutations((mutator) => {
      if (action.payload.page === 1) {
        mutator.setIn(['builds', 'fetched'], false);
        mutator.setIn(['builds', 'builds'], []);
        mutator.setIn(['builds', 'pagination'], {
          page: 1,
          pageCount: 1,
        });
        mutator.setIn(['builds', 'championSelected'], action.payload.championId);
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
