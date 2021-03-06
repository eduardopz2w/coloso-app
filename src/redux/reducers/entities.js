import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { mergeEntities } from '../../modules/EntitiesActions';

const initialState = Immutable.fromJS({
  summoners: {},
  leagueEntries: {},
  championsMasteries: {},
  proBuilds: {},
  proPlayers: {},
  proSummoners: {},
  games: {},
  statsSummaries: {},
});

export default typeToReducer({
  [mergeEntities]: (state, action) => state.mergeDeep(Immutable.fromJS(action.payload)),
}, initialState);
