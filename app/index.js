import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { AdMobBanner } from 'react-native-admob';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import 'moment/locale/es';

import StorageInstance from './utils/Storage';
import Routes from './routes';

moment.locale('es');
global.Storage = StorageInstance;

const ADMOB_BANNER_ID = 'ca-app-pub-9850680385333731/3213566801';

class AppContainer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<Provider store={this.props.store}>
      <View style={{ flex: 1 }}>
        <Routes />
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID={ADMOB_BANNER_ID}
          testDeviceID={DeviceInfo.getUniqueID()}
        />
      </View>
    </Provider>);
  }
}

AppContainer.propTypes = {
  store: PropTypes.shape({}),
};

export default AppContainer;
