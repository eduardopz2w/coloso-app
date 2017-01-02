import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import IconButton from '../../../components/IconButton';
import colors from '../../../utils/colors';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      backgroundColor: colors.primary,
      height: 56,
    },
  },
);

class BasicToolbar extends Component {
  constructor(props) {
    super(props);

    this.handleOnPressBackButton = this.handleOnPressBackButton.bind(this);
  }

  handleOnPressBackButton() {
    if (this.props.onPressBackButton) {
      return this.props.onPressBackButton();
    }

    return null;
  }

  render() {
    return (<View style={styles.root}>
      <IconButton iconName="arrow-back" onPress={this.handleOnPressBackButton} />
    </View>);
  }

}

BasicToolbar.propTypes = {
  onPressBackButton: PropTypes.func,
};

export default BasicToolbar;
