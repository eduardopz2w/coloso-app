import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { mergeEntities } from '../actions/EntitiesActions';

const initialState = Immutable.fromJS({
  summoners: {},
  leagueEntries: {},
  championsMasteries: {},
  proBuilds: {},
  proPlayers: {},
  proSummoners: {},
});

export default typeToReducer({
  [mergeEntities]: (state, action) => state.mergeDeep(Immutable.fromJS(action.payload)),
}, initialState);
