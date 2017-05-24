import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from 'utils';

const ACTIVE_COLOR = colors.accent;

const styles = StyleSheet.create({
  menuItem: {
    height: 48,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 14,
  },
  activeText: {
    color: ACTIVE_COLOR,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 28,
  },
});

class MenuItem extends PureComponent {
  constructor(props) {
    super(props);

    this.getIconColor = this.getIconColor.bind(this);
  }

  getIconColor() {
    let color = 'rgba(0,0,0,0.7)';

    if (this.props.active) {
      color = ACTIVE_COLOR;
    }

    return color;
  }

  render() {
    return (<TouchableNativeFeedback
      onPress={this.props.onPress}
    >
      <View style={[styles.menuItem, this.props.active && styles.active]}>
        <Icon
          style={styles.icon}
          name={this.props.iconName}
          size={22}
          color={this.getIconColor()}
        />
        <Text
          style={[styles.menuItemText, this.props.active && styles.activeText]}
        >{this.props.title}</Text>
      </View>
    </TouchableNativeFeedback>);
  }
}

MenuItem.propTypes = {
  iconName: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
  active: PropTypes.bool,
};

MenuItem.defaultProps = {
  active: false,
};

export default MenuItem;
