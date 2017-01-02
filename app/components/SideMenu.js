import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import appIcon from '../assets/appIcon.png';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flex: 1,
    width: 230,
  },
  header: {
    width: 250,
    height: 170,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#303F9F',
  },
  appIcon: {
    width: 100,
    height: 100,
  },
  menuItem: {
    height: 56,
    paddingLeft: 16,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },

  menuItemText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 8,
  },
});

class SideMenu extends PureComponent {
  render() {
    return (<View style={styles.root}>
      <View style={styles.header}>
        <Image source={appIcon} style={styles.appIcon} />
      </View>
      <MKButton
        style={styles.menuItem}
        rippleColor="rgba(0,0,0,0.1)"
        onPress={() => {
          Actions.search_view();
          this.context.drawer.close();
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Icon style={styles.icon} name="search" size={18} color="rgba(0,0,0,0.7)" />
          <Text style={styles.menuItemText} >Busquedas</Text>
        </View>
      </MKButton>

      <MKButton
        style={styles.menuItem}
        rippleColor="rgba(0,0,0,0.1)"
        onPress={() => {
          Actions.probuilds_search_view();
          this.context.drawer.close();
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Icon style={styles.icon} name="gavel" size={18} color="rgba(0,0,0,0.7)" />
          <Text style={styles.menuItemText} >Builds Profesionales</Text>
        </View>
      </MKButton>
    </View>);
  }
}

SideMenu.contextTypes = {
  drawer: React.PropTypes.object,
};

export default SideMenu;
