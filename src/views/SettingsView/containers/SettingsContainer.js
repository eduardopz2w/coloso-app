import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

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

    goBack: () => {
      dispatch(NavigationActions.back());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsView);
