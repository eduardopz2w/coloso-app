import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { View, Linking } from 'react-native';
import Dialog from 'react-native-dialogs';
import { AdMobBanner } from 'react-native-admob';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import I18n from 'i18n-js';
import moment from 'moment';
import Config from 'react-native-config';
import KeepAwake from 'react-native-keep-awake';
import 'moment/locale/es';

import versionChecker from './utils/versionChecker';
import Routes from './routes';
import translations from './translations';
import logger from './utils/logger';
import ColosoClient from './utils/ColosoClient';

const ADMOB_BANNER_ID = Config.ADMOB_BANNER_ID;

I18n.translations = translations;

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
  moment.locale(locale);
}

function goToPlayStore() {
  const playstoreUrl = 'market://details?id=com.pedronalbert.lolcena';
  Linking.openURL(playstoreUrl);
}

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

class AppContainer extends Component {
  componentWillMount() {
    configureLocale();

    versionChecker()
      .then(({ state }) => {
        if (state === 'UPDATED') {
          return;
        }

        const dialog = new Dialog();
        const dialogOptions = {
          cancelable: false,
        };

        if (state === 'UPDATE_AVAILABLE') {
          dialogOptions.title = I18n.t('update_available');
          dialogOptions.content = I18n.t('update_available_message');
          dialogOptions.positiveText = I18n.t('continue');
          dialogOptions.negativeText = I18n.t('update');
          dialogOptions.onNegative = goToPlayStore;
        } else if (state === 'UPDATE_REQUIRED') {
          dialogOptions.title = I18n.t('update_required');
          dialogOptions.content = I18n.t('update_required_message');
          dialogOptions.negativeText = I18n.t('update');
          dialogOptions.onNegative = () => {
            goToPlayStore();
            dialog.show();
          };
        }

        dialog.set(dialogOptions);
        dialog.show();
      });
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
        {renderAdmob()}
        <KeepAwake />
      </View>
    </Provider>);
  }
}

AppContainer.propTypes = {
  store: PropTypes.shape({}),
};

export default AppContainer;
