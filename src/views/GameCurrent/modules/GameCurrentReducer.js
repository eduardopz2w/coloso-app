import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { searchGame } from '../../SummonerSearch/modules/SummonerSearchActions';

const initialState = Immutable.fromJS({
  gameId: null,
});

export default typeToReducer({
  [searchGame]: {
    FULFILLED: (state, action) => state.withMutations((mutator) => {
      mutator.set('gameId', action.payload.gameId);
    }),
  },
}, initialState);
