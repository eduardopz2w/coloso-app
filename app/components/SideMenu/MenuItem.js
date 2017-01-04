import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
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
    marginRight: 16,
  },
});

class MenuItem extends PureComponent {
  render() {
    return (<MKButton
      style={styles.menuItem}
      rippleColor="rgba(0,0,0,0.1)"
      onPress={this.props.onPress}
    >
      <View style={{ flexDirection: 'row' }}>
        <Icon style={styles.icon} name={this.props.iconName} size={22} color="rgba(0,0,0,0.7)" />
        <Text style={styles.menuItemText} >{this.props.title}</Text>
      </View>
    </MKButton>);
  }
}

MenuItem.propTypes = {
  iconName: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
};

export default MenuItem;
