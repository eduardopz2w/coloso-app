import { connect } from 'react-redux';

import SettingsView from '../components/SettingsView';
import { set as setSetting } from '../../../modules/AppSettingsActions';

function mapStateToProps(state) {
  return {
    settings: state.appSettings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSetting: (key, value) => {
      dispatch(setSetting(key, value));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsView);
