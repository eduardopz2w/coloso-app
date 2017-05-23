import React, { PureComponent, PropTypes } from 'react';
import { Linking } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import Dialog from 'react-native-dialogs';
import { RNMail as Mailer } from 'NativeModules';
import _ from 'lodash';
import I18n from 'i18n-js';

import SideMenu from './SideMenu';
import tracker from '../utils/tracker';


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
  }

  componentWillMount() {
    this.props.loadAccount();
  }

  handleOnPressMyGame() {
    const { riotAccount } = this.props;

    if (_.isNull(riotAccount.get('id'))) {
      showAddAccountDialog();
      Actions.manageAccountView();
      this.drawer.close();
    } else if (!this.props.isSearchingGame) {
      Actions.summonerSearchView();
      this.drawer.close();
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
      Actions.manageAccountView();
      this.drawer.close();
    } else if (!this.props.isSearchingGame) {
      Actions.summonerProfileView({ summonerId: riotAccount.get('id') });
      this.drawer.close();
    }
  }

  handleOnPressProBuilds() {
    Actions.proBuildsListView();
    this.drawer.close();
  }

  handleOnPressSummonerSearch() {
    Actions.summonerSearchView();
    this.drawer.close();
  }

  handleOnPressManageAccount() {
    Actions.manageAccountView();
    this.drawer.close();
  }

  handleOnPressSettings() {
    Actions.settingsView();
    this.drawer.close();
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;

    return (<Drawer
      open={state.open}
      onOpen={() => Actions.refresh({ key: state.key, open: true })}
      onClose={() => Actions.refresh({ key: state.key, open: false })}
      type="overlay"
      content={<SideMenu
        riotAccount={this.props.riotAccount}
        onPressMyGame={this.handleOnPressMyGame}
        onPressSuggestion={handleOnPressSuggestion}
        onPressProBuilds={this.handleOnPressProBuilds}
        onPressProfile={this.handleOnPressProfile}
        onPressSummonerSearch={this.handleOnPressSummonerSearch}
        onPressManageAccount={this.handleOnPressManageAccount}
        onPressSettings={this.handleOnPressSettings}
        onPressWeb={handleOnPressWeb}
      />}
      captureGestures
      panOpenMask={0.02}
      panCloseMask={0.2}
      tapToClose
      negotiatePan
      ref={(drawer) => { this.drawer = drawer; }}
      tweenHandler={ratio => ({
        mainOverlay: {
          backgroundColor: `rgba(0,0,0,0.${ratio * 3})`,
        },
      })}
    >
      <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
    </Drawer>);
  }
}

MainDrawer.propTypes = {
  navigationState: PropTypes.shape({}),
  isSearchingGame: PropTypes.bool,
  onNavigate: PropTypes.func,
  riotAccount: ImmutablePropTypes.map,
  loadAccount: PropTypes.func,
  searchGame: PropTypes.func,
};

export default MainDrawer;
