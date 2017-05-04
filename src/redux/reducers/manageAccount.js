import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { fetchAccount, loadAccount } from '../../modules/ManageAccountActions';

const initialState = Immutable.fromJS({
  data: {
    id: null,
    accountId: null,
    name: null,
    profileIconId: null,
    region: null,
  },
  fetched: false,
  fetching: false,
  fetchError: false,
  errorMessage: null,
});

export default typeToReducer({
  [loadAccount]: {
    FULFILLED: (state, { payload }) => state.mergeIn(['data'], payload),
  },

  [fetchAccount]: {
    PENDING: state => state.merge({
      fetched: false,
      fetching: true,
      fetchError: false,
    }),

    FULFILLED: (state, { payload }) => state.withMutations((mutator) => {
      mutator.set('data', Immutable.Map({
        id: payload.data.id,
        ...payload.data.attributes,
      }));
      mutator.set('fetched', true);
      mutator.set('fetching', false);
    }),

    REJECTED: (state, { payload: { message } }) => state.merge({
      fetching: false,
      fetchError: true,
      errorMessage: message,
    }),
  },
}, initialState);
