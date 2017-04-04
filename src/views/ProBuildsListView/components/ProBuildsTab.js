import React, { PureComponent, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import I18n from 'i18n-js';
import Immutable from 'immutable';

import ProBuildsList from '../../../components/ProBuildsList';

class ProBuildsTab extends PureComponent {
  shouldComponentUpdate(nextProps) {
    return !Immutable.is(nextProps.proBuilds, this.props.proBuilds);
  }

  render() {
    const proBuilds = this.props.proBuilds;
    const fetchError = proBuilds.get('fetchError');
    const errorMessage = proBuilds.get('errorMessage');
    const isFetching = proBuilds.get('isFetching');
    const isRefreshing = proBuilds.get('isRefreshing');
    const buildsList = proBuilds.get('data');

    return (<ProBuildsList
      builds={buildsList}
      isFetching={isFetching}
      fetchError={fetchError}
      errorMessage={errorMessage}
      isRefreshing={isRefreshing}
      emptyListMessage={I18n.t('no_results_found')}
      onPressBuild={this.props.onPressBuild}
      onLoadMore={this.props.onLoadMore}
      onRefresh={this.props.onPressRefreshButton}
      onPressRetry={this.props.onPressRetryButton}
      onAddFavorite={this.props.onAddFavorite}
      onRemoveFavorite={this.props.onRemoveFavorite}
      refreshControl
    />);
  }
}

ProBuildsTab.propTypes = {
  proBuilds: ImmutablePropTypes.mapContains({
    data: ImmutablePropTypes.list.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    pagination: ImmutablePropTypes.mapContains({
      currentPage: PropTypes.number.isRequired,
      totalPages: PropTypes.number.isRequired,
    }).isRequired,
    filters: ImmutablePropTypes.mapContains({
      championId: PropTypes.number,
      proPlayerId: PropTypes.string,
    }),
  }).isRequired,
  onPressRetryButton: PropTypes.func.isRequired,
  onPressRefreshButton: PropTypes.func.isRequired,
  onPressBuild: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
};

export default ProBuildsTab;
