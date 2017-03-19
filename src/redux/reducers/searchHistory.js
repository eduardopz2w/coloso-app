import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { addEntry, loadEntries, deleteEntry } from '../../modules/SearchHistoryActions';

const initialState = Immutable.fromJS({
  entries: [],
});

export default typeToReducer({
  [addEntry]: {
    FULFILLED: (state, action) => state.set('entries', Immutable.fromJS(action.payload.entries)),
  },
  [deleteEntry]: {
    FULFILLED: (state, action) => state.set('entries', Immutable.fromJS(action.payload.entries)),
  },
  [loadEntries]: {
    FULFILLED: (state, action) => state.set('entries', Immutable.fromJS(action.payload)),
  },
}, initialState);
