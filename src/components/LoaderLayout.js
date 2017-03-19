import React, { PureComponent, PropTypes } from 'react';
import { View } from 'react-native';

import LoadingIndicator from './LoadingIndicator';
import ErrorScreen from './ErrorScreen';

class LoaderLayout extends PureComponent {
  render() {
    if (this.props.fetched) {
      return this.props.renderFunction();
    } else if (this.props.isFetching) {
      return (<View style={{ padding: 16, alignItems: 'center' }}>
        <LoadingIndicator />
      </View>);
    }

    return (<View style={{ flex: 1, padding: 16 }}>
      <ErrorScreen
        message={this.props.errorMessage}
        onPressRetryButton={this.props.onPressRetryButton}
        retryButton
      />
    </View>);
  }
}

LoaderLayout.propTypes = {
  fetched: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  renderFunction: PropTypes.func.isRequired,
  onPressRetryButton: PropTypes.func.isRequired,
};

export default LoaderLayout;
