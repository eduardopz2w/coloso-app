import React, { PureComponent, PropTypes } from 'react';
import { Linking } from 'react-native';
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

class MainDrawer extends PureComponent {
  constructor(props) {
    super(props);

    this.handleOnPressMyGame = this.handleOnPressMyGame.bind(this);
    this.handleOnPressProfile = this.handleOnPressProfile.bind(this);
    this.handleOnPressProBuilds = this.handleOnPressProBuilds.bind(this);
    this.handleOnPressSummonerSearch = this.handleOnPressSummonerSearch.bind(this);
    this.handleOnPressManageAccount = this.handleOnPressManageAccount.bind(this);
    this.handleOnPressSettings = this.handleOnPressSettings.bind(this);
    this.goToRoute = this.goToRoute.bind(this);
  }

  componentWillMount() {
    this.props.loadAccount();
  }

  handleOnPressMyGame() {
    const { riotAccount } = this.props;

    if (_.isNull(riotAccount.get('id'))) {
      showAddAccountDialog();
      this.goToRoute('ManageAccountView');
    } else if (!this.props.isSearchingGame) {
      this.goToRoute('SummonerSearchView');
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
      this.goToRoute('ManageAccountView');
    } else if (!this.props.isSearchingGame) {
      this.goToRoute('SummonerProfileView', { summonerId: riotAccount.get('id') });
    }
  }

  handleOnPressProBuilds() {
    this.goToRoute('ProBuildsListView');
  }

  handleOnPressSummonerSearch() {
    this.goToRoute('SummonerSearchView');
  }

  handleOnPressManageAccount() {
    this.goToRoute('ManageAccountView');
  }

  handleOnPressSettings() {
    this.goToRoute('SettingsView');
  }

  goToRoute(...args) {
    this.props.navigation.navigate(...args);
    setTimeout(() => {
      this.props.navigation.navigate('DrawerClose');
    }, 1);
  }

  render() {
    return (<SideMenu
      riotAccount={this.props.riotAccount}
      onPressMyGame={this.handleOnPressMyGame}
      onPressSuggestion={handleOnPressSuggestion}
      onPressProBuilds={this.handleOnPressProBuilds}
      onPressProfile={this.handleOnPressProfile}
      onPressSummonerSearch={this.handleOnPressSummonerSearch}
      onPressManageAccount={this.handleOnPressManageAccount}
      onPressSettings={this.handleOnPressSettings}
      onPressWeb={handleOnPressWeb}
    />);
  }
}

MainDrawer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  isSearchingGame: PropTypes.bool,
  riotAccount: ImmutablePropTypes.map,
  loadAccount: PropTypes.func,
  searchGame: PropTypes.func,
};

export default MainDrawer;
