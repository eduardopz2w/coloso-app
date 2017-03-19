import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  menuItem: {
    height: 56,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
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
    return (<TouchableNativeFeedback
      onPress={this.props.onPress}
    >
      <View style={styles.menuItem}>
        <Icon style={styles.icon} name={this.props.iconName} size={22} color="rgba(0,0,0,0.7)" />
        <Text style={styles.menuItemText} >{this.props.title}</Text>
      </View>
    </TouchableNativeFeedback>);
  }
}

MenuItem.propTypes = {
  iconName: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
};

export default MenuItem;
