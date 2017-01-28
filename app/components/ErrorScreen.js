import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MKButton } from 'react-native-material-kit';
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
        <MKButton
          style={styles.retryButton}
          onPress={this.props.onPressRetryButton}
          rippleColor="rgba(0,0,0,0.1)"
        >
          <Text style={styles.retryText}>REINTENTAR</Text>
        </MKButton>
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
