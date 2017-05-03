import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { fetchGame } from './GameActions';

const initialState = Immutable.fromJS({
  fetched: false,
  fetchError: false,
  errorMessage: '',
  isFetching: true,
  id: null,
});

export default typeToReducer({
  [fetchGame]: {
    PENDING: state => state.merge({
      fetched: false,
      isFetching: true,
      fetchError: false,
    }),

    FULFILLED: (state, { payload: { id } }) => state.merge({
      fetched: true,
      isFetching: false,
      id,
    }),

    REJECTED: (state, { payload: { error } }) => state.merge({
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: error.message,
    }),
  },
}, initialState);
