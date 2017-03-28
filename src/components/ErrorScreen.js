import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../utils/colors';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 8,
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
});

class ErrorScreen extends PureComponent {
  render() {
    return (<View style={styles.root}>
      <Icon style={styles.icon} name="error-outline" size={80} />
      <Text style={styles.message}>{this.props.message}</Text>
      {this.props.retryButton &&
        <TouchableNativeFeedback
          onPress={this.props.onPressRetryButton}
        >
          <View style={styles.retryButton}>
            <Text style={styles.retryText}>REINTENTAR</Text>
          </View>
        </TouchableNativeFeedback>
      }
    </View>);
  }
}

ErrorScreen.defaultProps = {
  retryButton: false,
};

ErrorScreen.propTypes = {
  message: PropTypes.string.isRequired,
  retryButton: PropTypes.bool,
  onPressRetryButton: PropTypes.func,
};

export default ErrorScreen;
