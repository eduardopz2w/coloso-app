import React, { PureComponent, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  root: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class IconButton extends PureComponent {
  constructor(props) {
    super(props);

    this.handleOnPress = this.handleOnPress.bind(this);
  }

  handleOnPress() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }

  render() {
    const { iconSize, iconName, iconColor } = this.props;

    return (<TouchableNativeFeedback
      onPress={this.handleOnPress}
    >
      <View style={[styles.root, this.props.style]}>
        <Icon name={iconName} size={iconSize} color={iconColor} />
      </View>
    </TouchableNativeFeedback>);
  }

}

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  style: View.propTypes.style,
  onPress: PropTypes.func,
};

IconButton.defaultProps = {
  iconSize: 30,
  iconColor: '#ffffff',
};

export default IconButton;
