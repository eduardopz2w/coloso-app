import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text, Image, Alert, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import regionHumanize from '../../utils/regionHumanize';
import colors from '../../utils/colors';
import MenuItem from './MenuItem';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flex: 1,
    width: 240,
  },
  header: {
    width: 240,
    height: 150,
    paddingHorizontal: 18,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  appIcon: {
    width: 100,
    height: 100,
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 50,
    height: 50,
  },
  accountDataRow: {
    justifyContent: 'center',
  },
  accountDataText: {
    color: '#FFF',
  },
  summonerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

class SideMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.renderAccountData = this.renderAccountData.bind(this);
    this.handleOnPressProfile = this.handleOnPressProfile.bind(this);
  }

  handleOnPressProfile() {
    const { ownerAccount } = this.props;

    if (ownerAccount.summonerId === 0) {
      Alert.alert(null, 'Debes agregar tu cuenta de invocador');
    } else {
      Actions.summoner_profile_view({
        summonerId: ownerAccount.summonerId,
        region: ownerAccount.region,
      });
      this.context.drawer.close();
    }
  }

  renderAccountData() {
    const ownerAccount = this.props.ownerAccount;

    if (ownerAccount.summonerId === 0) {
      return (<TouchableWithoutFeedback
        onPress={() => {
          Actions.manage_account_view();
          this.context.drawer.close();
        }}
      >
        <View style={styles.accountDataContainer}>
          <View style={[styles.accountImage, styles.noAccountCircle]}>
            <Icon name="add" size={20} color="#FFF" />
          </View>
          <View style={styles.accountDataRow}>
            <Text style={styles.accountDataText}>Agregar Cuenta</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>);
    }

    const url = `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${ownerAccount.profileIconId}.png`;

    return (<TouchableWithoutFeedback
      onPress={() => {
        Actions.manage_account_view();
        this.context.drawer.close();
      }}
    >
      <View style={styles.accountDataContainer}>
        <Image source={{ uri: url }} style={styles.accountImage} />
        <View style={styles.accountDataRow}>
          <Text style={styles.summonerName}>{ownerAccount.summonerName}</Text>
          <Text style={styles.accountDataText}>{regionHumanize(ownerAccount.region)}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>);
  }

  render() {
    return (<View style={styles.root}>
      <View style={styles.header}>
        {this.renderAccountData()}
      </View>
      <MenuItem
        iconName="account-circle"
        title="Mi Perfil"
        onPress={this.handleOnPressProfile}
      />

      <MenuItem
        title="Busquedas"
        iconName="search"
        onPress={() => {
          Actions.search_view();
          this.context.drawer.close();
        }}
      />

      <MenuItem
        title="Builds Profesionales"
        iconName="gavel"
        onPress={() => {
          Actions.probuilds_search_view();
          this.context.drawer.close();
        }}
      />
    </View>);
  }
}

SideMenu.propTypes = {
  ownerAccount: PropTypes.shape({
    summonerId: PropTypes.number,
    summonerName: PropTypes.string,
    profileIconId: PropTypes.number,
    region: PropTypes.string,
  }),
};

SideMenu.contextTypes = {
  drawer: React.PropTypes.object,
};

export default SideMenu;
