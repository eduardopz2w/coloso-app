import { connect } from 'react-redux';

import DefaultLayout from '../layouts/DefaultLayout';
import { loadSettings } from '../modules/AppSettingsActions';

function mapStateToProps(state) {
  return {
    keepAwake: state.appSettings.get('keepAwake'),
    router: state.router,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAppSettings() {
      dispatch(loadSettings());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
