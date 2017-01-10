import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { fetchPlayers } from '../actions/ProPlayersActions';

const initState = Immutable.fromJS({
  fetched: false,
  isFetching: false,
  proPlayers: [],
  fetchError: false,
  errorMessage: '',
});

export default typeToReducer({
  [fetchPlayers]: {
    PENDING: state => state.merge({ fetchError: false, isFetching: true }),
    FULFILLED: (state, action) => state.merge({
      fetched: true,
      isFetching: false,
      proPlayers: Immutable.fromJS(action.payload.proPlayers),
    }),
    REJECTED: (state, action) => state.merge({
      isFetching: false,
      fetchError: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
}, initState);
