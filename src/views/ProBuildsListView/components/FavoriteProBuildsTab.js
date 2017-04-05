import React, { PureComponent, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import I18n from 'i18n-js';
import Immutable from 'immutable';

import ProBuildsList from '../../../components/ProBuildsList';

class ProBuildsTab extends PureComponent {
  shouldComponentUpdate(nextProps) {
    return !Immutable.is(nextProps.favoriteProBuilds, this.props.favoriteProBuilds);
  }

  render() {
    return (<ProBuildsList
      builds={this.props.favoriteProBuilds.get('data')}
      isFetching={this.props.favoriteProBuilds.get('isFetching')}
      fetchError={this.props.favoriteProBuilds.get('fetchError')}
      errorMessage={this.props.favoriteProBuilds.get('errorMessage')}
      emptyListMessage={I18n.t('empty_favorite_builds')}
      onPressBuild={this.props.onPressBuild}
      onPressRetry={this.props.onPressRetryButton}
      onRemoveFavorite={this.props.onRemoveFavorite}
    />);
  }
}

ProBuildsTab.propTypes = {
  favoriteProBuilds: ImmutablePropTypes.mapContains({
    data: ImmutablePropTypes.list.isRequired,
    fetched: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    championSelected: PropTypes.number,
    proPlayerSelected: PropTypes.string,
  }).isRequired,
  onPressRetryButton: PropTypes.func.isRequired,
  onPressBuild: PropTypes.func.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
};

export default ProBuildsTab;
