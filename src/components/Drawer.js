import React, { PureComponent, PropTypes } from 'react';
import { Linking, BackHandler, ToastAndroid } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import DeviceInfo from 'react-native-device-info';
import Dialog from 'react-native-dialogs';
/* eslint-disable */
import { RNMail as Mailer } from 'NativeModules';
/* eslint-enable */

import _ from 'lodash';
import I18n from 'i18n-js';

import { tracker } from 'utils';
import SideMenu from './SideMenu';


const SUGGESTION_EMAIL = 'pedron.albert@gmail.com';

const suggestionTemplate = `====== Required Info ======
App Version: ${DeviceInfo.getVersion()}
Device: ${DeviceInfo.getBrand()} (${DeviceInfo.getModel()})
System Version: ${DeviceInfo.getSystemVersion()} (${DeviceInfo.getSystemName()})
Locale: ${DeviceInfo.getDeviceLocale()}
Timezone: ${DeviceInfo.getTimezone()}
========================
Suggestion: `;

function showAddAccountDialog() {
  const dialog = new Dialog();
  dialog.set({
    content: I18n.t('have_to_add_account'),
    positiveText: 'OK',
  });
  dialog.show();
}

function handleOnPressSuggestion() {
  Mailer.mail({
    subject: 'Coloso - Suggestion',
    recipients: [SUGGESTION_EMAIL],
    body: suggestionTemplate,
  }, () => {});
}

function goToWeb() {
  tracker.trackEvent('ColosoWeb', 'OPEN');
  Linking.openURL('http://www.coloso.net');
}

function handleOnPressWeb() {
  const dialog = new Dialog();
  dialog.set({
    title: I18n.t('suggestion'),
    content: I18n.t('webDisclaimer'),
    positiveText: 'OK',
    onPositive: goToWeb,
  });

  dialog.show();
}

let waitingNextExit = false;

function handleOnExitApp() {
  if (waitingNextExit) {
    return false;
  }

  waitingNextExit = true;

  setTimeout(() => {
    waitingNextExit = false;
  }, 3000);

  ToastAndroid.show(I18n.t('press_again_to_quit'), ToastAndroid.SHORT);

  return true;
}

class Drawer extends PureComponent {
  constructor(props) {
    super(props);

    this.handleOnPressMyGame = this.handleOnPressMyGame.bind(this);
    this.handleOnPressProfile = this.handleOnPressProfile.bind(this);
  }

  componentWillMount() {
    this.props.loadAccount();
    BackHandler.addEventListener('hardwareBackPress', handleOnExitApp);
  }

  componentDidMount() {
    this.props.openDrawer();
  }

  handleOnPressMyGame() {
    const { riotAccount } = this.props;

    if (_.isNull(riotAccount.get('id'))) {
      showAddAccountDialog();
      this.props.goToManageAccount();
    } else if (!this.props.isSearchingGame) {
      this.props.goToSummonerSearch();
      this.props.searchGame({
        summonerName: riotAccount.get('name'),
        region: riotAccount.get('region'),
      });
    }
  }

  handleOnPressProfile() {
    const { riotAccount } = this.props;

    if (_.isNull(riotAccount.get('id'))) {
      showAddAccountDialog();
      this.props.goToManageAccount();
    } else if (!this.props.isSearchingGame) {
      this.props.goToSummonerProfile(riotAccount.get('id'));
    }
  }

  render() {
    return (<SideMenu
      riotAccount={this.props.riotAccount}
      onPressMyGame={this.handleOnPressMyGame}
      onPressSuggestion={handleOnPressSuggestion}
      onPressProBuilds={this.props.goToProBuildsList}
      onPressProfile={this.handleOnPressProfile}
      onPressSummonerSearch={this.props.goToSummonerSearch}
      onPressManageAccount={this.props.goToManageAccount}
      onPressSettings={this.props.goToSettings}
      onPressWeb={handleOnPressWeb}
    />);
  }
}

Drawer.propTypes = {
  isSearchingGame: PropTypes.bool,
  riotAccount: ImmutablePropTypes.map,
  loadAccount: PropTypes.func,
  searchGame: PropTypes.func,
  goToProBuildsList: PropTypes.func.isRequired,
  goToSummonerSearch: PropTypes.func.isRequired,
  goToManageAccount: PropTypes.func.isRequired,
  goToSettings: PropTypes.func.isRequired,
  goToSummonerProfile: PropTypes.func.isRequired,
  openDrawer: PropTypes.func.isRequired,
};

export default Drawer;
