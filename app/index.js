import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { AdMobBanner } from 'react-native-admob';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import I18n from 'i18n-js';
import 'moment/locale/es';

import StorageInstance from './utils/Storage';
import Routes from './routes';
import translations from './translations';
import logger from './utils/logger';
import ColosoClient from './utils/ColosoClient';

I18n.translations = translations;

moment.locale('es');
global.Storage = StorageInstance;

const ADMOB_BANNER_ID = 'ca-app-pub-9850680385333731/3213566801';

function configureLocale() {
  const deviceLocale = DeviceInfo.getDeviceLocale().slice(0, 2).toLowerCase();
  let locale;

  if (deviceLocale === 'en' || deviceLocale === 'es') {
    locale = deviceLocale;
    logger.debug(`Locale loaded from device: ${deviceLocale}`);
  } else {
    locale = 'en';
    logger.debug('Locale default: en');
  }

  I18n.locale = locale;
  ColosoClient.setLocale(locale);
}

class AppContainer extends Component {
  componentWillMount() {
    configureLocale();
  }

  componentDidMount() {
    Actions.refresh({ key: 'drawer', open: true });
  }

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
