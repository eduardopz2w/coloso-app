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
    const favoriteProBuilds = this.props.favoriteProBuilds;
    const fetchError = favoriteProBuilds.get('fetchError');
    const errorMessage = favoriteProBuilds.get('errorMessage');
    const isFetching = favoriteProBuilds.get('isFetching');
    const isRefreshing = favoriteProBuilds.get('isRefreshing');
    const proBuildsList = favoriteProBuilds.get('builds');

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
        isFetching={isFetching}
        isRefreshing={isRefreshing}
        fetchError={fetchError}
        errorMessage={errorMessage}
        onPressRetry={this.props.onPressRetryButton}
        onRemoveFavorite={this.props.onRemoveFavorite}
      />);
    }

    return (<View style={styles.container}>
      <Text>
        {I18n.t('empty_favorite_builds')}
      </Text>
    </View>);
  }
}

ProBuildsTab.propTypes = {
  favoriteProBuilds: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    builds: ImmutablePropTypes.list.isRequired,
    championSelected: PropTypes.number,
    proPlayerSelected: PropTypes.string,
  }).isRequired,
  onPressRetryButton: PropTypes.func.isRequired,
  onPressBuild: PropTypes.func.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
};

export default ProBuildsTab;
