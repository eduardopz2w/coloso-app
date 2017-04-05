import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback, Image } from 'react-native';
import I18n from 'i18n-js';

import colors from '../utils/colors';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
  retryButton: {
    minWidth: 64,
    height: 36,
    marginTop: 8,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 8,
  },
});

class ErrorScreen extends PureComponent {
  render() {
    return (<View style={styles.root}>
      <Image style={styles.image} source={{ uri: 'sticker_poro_sad' }} />
      <Text style={styles.message}>{this.props.message}</Text>
      {this.props.retryButton &&
        <TouchableNativeFeedback
          onPress={this.props.onPressRetryButton}
        >
          <View style={styles.retryButton}>
            <Text style={styles.retryText}>{I18n.t('retry').toUpperCase()}</Text>
          </View>
        </TouchableNativeFeedback>
      }
    </View>);
  }
}

ErrorScreen.propTypes = {
  message: PropTypes.string.isRequired,
  retryButton: PropTypes.bool,
  onPressRetryButton: PropTypes.func,
};

ErrorScreen.defaultProps = {
  retryButton: true,
};

export default ErrorScreen;
