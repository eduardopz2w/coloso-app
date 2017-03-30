import React, { PureComponent, PropTypes } from 'react';
import { View } from 'react-native';

import LoadingIndicator from './LoadingIndicator';
import ErrorScreen from './ErrorScreen';

class LoaderLayout extends PureComponent {
  render() {
    if (this.props.renderContent) {
      return this.props.renderFunction();
    } else if (this.props.isFetching) {
      return (<View style={{ padding: 16, alignItems: 'center' }}>
        <LoadingIndicator />
      </View>);
    } else if (this.props.fetchError) {
      return (<ErrorScreen
        message={this.props.errorMessage}
        onPressRetryButton={this.props.onPressRetryButton}
      />);
    }

    return null;
  }
}

LoaderLayout.propTypes = {
  renderContent: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  renderFunction: PropTypes.func.isRequired,
  onPressRetryButton: PropTypes.func.isRequired,
};

export default LoaderLayout;
