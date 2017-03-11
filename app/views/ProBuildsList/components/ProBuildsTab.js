import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import I18n from 'i18n-js';
import ImmutablePropTypes from 'react-immutable-proptypes';

import ErrorScreen from '../../../components/ErrorScreen';
import ProBuildsList from '../../../components/ProBuildsList';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: 16,
    flex: 1,
  },
});

class ProBuildsTab extends PureComponent {
  render() {
    const proBuilds = this.props.proBuilds;
    const fetchError = proBuilds.get('fetchError');
    const errorMessage = proBuilds.get('errorMessage');
    const isFetching = proBuilds.get('isFetching');
    const isRefreshing = proBuilds.get('isRefreshing');
    const proBuildsList = proBuilds.get('proBuildsList');

    if (fetchError && proBuildsList.size === 0) {
      return (<View style={styles.container}>
        <ErrorScreen
          message={errorMessage}
          onPressRetryButton={this.props.onPressRetryButton}
          retryButton
        />
      </View>);
    } else if (proBuildsList.size > 0 || isFetching) {
      return (<ProBuildsList
        builds={proBuildsList}
        onPressBuild={this.props.onPressBuild}
        onLoadMore={this.props.onLoadMore}
        isFetching={isFetching}
        isRefreshing={isRefreshing}
        onRefresh={this.props.onPressRefreshButton}
        fetchError={fetchError}
        errorMessage={errorMessage}
        onPressRetry={this.props.onPressRetryButton}
        onAddFavorite={this.props.onAddFavorite}
        onRemoveFavorite={this.props.onRemoveFavorite}
        refreshControl
      />);
    }

    return (<View style={styles.container}>
      <Text>
        {I18n.t('pro_builds_not_available')}
      </Text>
    </View>);
  }
}

ProBuildsTab.propTypes = {
  proBuilds: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    proBuildsList: ImmutablePropTypes.list.isRequired,
    pagination: ImmutablePropTypes.mapContains({
      currentPage: PropTypes.number.isRequired,
      totalPages: PropTypes.number.isRequired,
    }).isRequired,
    championSelected: PropTypes.number,
    proPlayerSelected: PropTypes.string,
  }).isRequired,
  onPressRetryButton: PropTypes.func.isRequired,
  onPressRefreshButton: PropTypes.func.isRequired,
  onPressBuild: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
};

export default ProBuildsTab;
