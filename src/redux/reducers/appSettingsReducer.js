import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import { set, loadSettings, DEFAULT_SETTINGS } from '../../modules/AppSettingsActions';

const initialState = Immutable.fromJS(DEFAULT_SETTINGS);

export default typeToReducer({
  [loadSettings]: {
    FULFILLED: (state, { payload }) => Immutable.fromJS(payload),
  },
  [set]: {
    FULFILLED: (state, { payload }) => Immutable.fromJS(payload),
  },
}, initialState);
