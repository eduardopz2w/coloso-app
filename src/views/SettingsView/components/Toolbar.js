import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import I18n from 'i18n-js';
import IconButton from '../../../components/IconButton';
import colors from '../../../utils/colors';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      backgroundColor: colors.primary,
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      flex: 1,
      marginLeft: 18,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
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
      <Text style={styles.title}>{I18n.t('settings')}</Text>
    </View>);
  }

}

BasicToolbar.propTypes = {
  onPressBackButton: PropTypes.func,
};

export default BasicToolbar;
