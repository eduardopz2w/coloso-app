import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { searchGame } from '../../SummonerSearchView/modules/SummonerSearchActions';

const initialState = Immutable.fromJS({
  id: null,
  summonerId: null,
});

export default typeToReducer({
  [searchGame]: {
    FULFILLED: (state, action) => state.withMutations((mutator) => {
      mutator.set('id', action.payload.id);
      mutator.set('summonerId', action.payload.summonerId);
    }),
  },
}, initialState);
