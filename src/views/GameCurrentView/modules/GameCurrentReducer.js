import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { searchGame } from '../../SummonerSearchView/modules/SummonerSearchActions';

const initialState = Immutable.fromJS({
  id: null,
});

export default typeToReducer({
  [searchGame]: {
    FULFILLED: (state, action) => state.withMutations((mutator) => {
      mutator.set('id', action.payload.gameId);
    }),
  },
}, initialState);
