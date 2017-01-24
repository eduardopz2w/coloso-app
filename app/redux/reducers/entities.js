import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { mergeEntities } from '../actions/EntitiesActions';

const initialState = Immutable.fromJS({
  summoners: {},
  leagueEntries: {},
  championsMasteries: {},
});

export default typeToReducer({
  [mergeEntities]: (state, action) => state.merge(Immutable.fromJS(action.payload)),
}, initialState);
