import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { fetchMatch } from './MatchActions';

const initialState = Immutable.fromJS({
  fetched: false,
  fetchError: false,
  errorMessage: '',
  isFetching: true,
  id: null,
});

export default typeToReducer({
  [fetchMatch]: {
    PENDING: state => state.merge({
      fetched: false,
      isFetching: true,
      fetchError: false,
    }),

    FULFILLED: (state, { payload }) => state.merge({
      fetched: true,
      isFetching: false,
      id: payload.matchUrid,
    }),

    REJECTED: (state, action) => state.merge({
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
}, initialState);
