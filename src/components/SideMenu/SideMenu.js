import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, ScrollView, Image } from 'react-native';
import _ from 'lodash';
import DeviceInfo from 'react-native-device-info';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from 'i18n-js';

import { colors, regionHumanize } from 'utils';
import MenuItem from './MenuItem';
import ProfileImage from '../ProfileImage';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flex: 1,
    position: 'relative',
  },
  header: {
    height: 150,
    paddingHorizontal: 18,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },

  headerBackground: {
    height: 160,
    position: 'absolute',
    top: 0,
    left: 0,
  },

  accountDataContainer: {
    flexDirection: 'row',
  },
  accountImage: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#FFF',
    marginRight: 12,
  },
  noAccountCircle: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: 50,
    height: 50,
  },
  accountDataRow: {
    justifyContent: 'center',
  },
  accountDataText: {
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: {
      width: 1.5,
      height: 1.5,
    },
  },
  summonerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: {
      width: 1.5,
      height: 1.5,
    },
  },
  versionText: {
    position: 'absolute',
    bottom: 0,
    right: 8,
  },
});

class SideMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.renderAccountData = this.renderAccountData.bind(this);
  }

  renderAccountData() {
    const riotAccount = this.props.riotAccount;

    if (_.isNull(riotAccount.get('id'))) {
      return (<TouchableWithoutFeedback
        onPress={this.props.onPressManageAccount}
      >
        <View style={styles.accountDataContainer}>
          <View style={[styles.accountImage, styles.noAccountCircle]}>
            <Icon name="add" size={20} color="#FFF" />
          </View>
          <View style={styles.accountDataRow}>
            <Text style={styles.accountDataText}>{I18n.t('add_account')}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>);
    }

    return (<TouchableWithoutFeedback
      onPress={this.props.onPressManageAccount}
    >
      <View style={styles.accountDataContainer}>
        <ProfileImage id={riotAccount.get('profileIconId')} style={styles.accountImage} />
        <View style={styles.accountDataRow}>
          <Text style={styles.summonerName}>{riotAccount.get('name')}</Text>
          <Text style={styles.accountDataText}>{regionHumanize(riotAccount.get('region'))}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>);
  }

  render() {
    return (<View style={styles.root}>
      <View style={styles.header}>
        <Image style={styles.headerBackground} source={{ uri: 'background_shapes' }} />
        {this.renderAccountData()}
      </View>
      <ScrollView>
        <MenuItem
          iconName="account-circle"
          title={I18n.t('my_account')}
          onPress={this.props.onPressProfile}
        />

        <MenuItem
          iconName="games"
          title={I18n.t('my_game')}
          onPress={this.props.onPressMyGame}
        />

        <MenuItem
          iconName="search"
          title={I18n.t('searches')}
          onPress={this.props.onPressSummonerSearch}
        />

        <MenuItem
          title={I18n.t('pro_builds')}
          iconName="gavel"
          onPress={this.props.onPressProBuilds}
        />

        <MenuItem
          title="Coloso Web"
          iconName="web"
          onPress={this.props.onPressWeb}
        />

        <MenuItem
          title={I18n.t('suggestion')}
          iconName="mail"
          onPress={this.props.onPressSuggestion}
        />

        <MenuItem
          title={I18n.t('settings')}
          iconName="settings"
          onPress={this.props.onPressSettings}
        />
      </ScrollView>

      <Text style={styles.versionText}>v{DeviceInfo.getVersion()}</Text>
    </View>);
  }
}

SideMenu.propTypes = {
  riotAccount: ImmutablePropTypes.mapContains({
    id: PropTypes.string,
    name: PropTypes.string,
    profileIconId: PropTypes.number,
    region: PropTypes.string,
  }),
  onPressSuggestion: PropTypes.func,
  onPressProfile: PropTypes.func,
  onPressProBuilds: PropTypes.func,
  onPressSummonerSearch: PropTypes.func,
  onPressMyGame: PropTypes.func,
  onPressManageAccount: PropTypes.func,
  onPressSettings: PropTypes.func,
  onPressWeb: PropTypes.func,
};

export default SideMenu;
