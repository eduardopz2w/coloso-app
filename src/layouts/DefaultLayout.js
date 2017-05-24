import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import KeepAwake from 'react-native-keep-awake';
import { AdMobBanner } from 'react-native-admob';
import DeviceInfo from 'react-native-device-info';

import Routes from '../routes';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const ADMOB_BANNER_ID = Config.ADMOB_BANNER_ID;

function renderAdmob() {
  if (__DEV__) {
    return null;
  }

  return (<AdMobBanner
    bannerSize="smartBannerPortrait"
    adUnitID={ADMOB_BANNER_ID}
    testDeviceID={DeviceInfo.getUniqueID()}
  />);
}

class DefaultLayout extends Component {
  componentWillMount() {
    this.props.loadAppSettings();
  }

  render() {
    return (<View style={styles.root}>
      <Routes />
      {renderAdmob()}
      {this.props.keepAwake && <KeepAwake />}
    </View>);
  }
}

DefaultLayout.propTypes = {
  keepAwake: PropTypes.bool.isRequired,
  // Dispatchers
  loadAppSettings: PropTypes.func.isRequired,
};

export default DefaultLayout;
