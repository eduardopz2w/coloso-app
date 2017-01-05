import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { fetchBuild } from '../actions/ProBuildViewActions';

const initialState = Immutable.fromJS({
  fetched: false,
  fetchError: false,
  errorMessage: '',
  isFetching: true,
  build: {},
});

export default typeToReducer({
  [fetchBuild]: {
    PENDING: state => state.merge({
      fetched: false,
      isFetching: true,
      fetchError: false,
    }),

    FULFILLED: (state, action) => state.merge({
      fetched: true,
      isFetching: false,
      build: action.payload,
    }),

    REJECTED: (state, action) => state.merge({
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
}, initialState);
