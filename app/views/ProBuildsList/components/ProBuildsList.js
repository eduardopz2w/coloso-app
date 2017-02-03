import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Actions } from 'react-native-router-flux';
import I18n from 'i18n-js';


import Toolbar from './Toolbar';
import { tracker } from '../../../utils/analytics';
import ProBuildsList from '../../../components/ProBuildsList';
import ErrorScreen from '../../../components/ErrorScreen';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});

class ProBuildsListView extends Component {
  constructor(props) {
    super(props);

    this.handleOnChangeChampionSelected = this.handleOnChangeChampionSelected.bind(this);
    this.handleOnChangeProPlayerSelected = this.handleOnChangeProPlayerSelected.bind(this);
    this.handleOnLoadMore = this.handleOnLoadMore.bind(this);
    this.handleOnRetry = this.handleOnRetry.bind(this);
  }

  componentWillMount() {
    this.props.fetchBuilds({}, 1);

    if (!this.props.proPlayers.get('fetched')) {
      this.props.fetchProPlayers();
    }
  }

  componentDidMount() {
    tracker.trackScreenView('ProBuildsListView');
  }

  handleOnChangeChampionSelected(championId) {
    this.props.fetchBuilds({
      championId,
      proPlayerId: this.props.proBuilds.get('proPlayerSelected'),
    }, 1);
  }

  handleOnChangeProPlayerSelected(proPlayerId) {
    this.props.fetchBuilds({
      championId: this.props.proBuilds.get('championSelected'),
      proPlayerId,
    }, 1);
  }

  handleOnLoadMore() {
    const pagData = this.props.proBuilds.get('pagination').toJS();
    const isFetching = this.props.proBuilds.get('isFetching');

    if (!isFetching && pagData.totalPages > pagData.currentPage) {
      const championSelected = this.props.proBuilds.get('championSelected');
      const proPlayerSelected = this.props.proBuilds.get('proPlayerSelected');

      this.props.fetchBuilds(
        {
          championId: championSelected,
          proPlayerId: proPlayerSelected,
        },
        pagData.currentPage + 1,
      );
    }
  }

  handleOnRetry() {
    this.props.fetchBuilds(
      {
        championId: this.props.proBuilds.get('championSelected'),
        proPlayerId: this.props.proBuilds.get('proPlayerSelected'),
      },
      this.props.proBuilds.getIn(['pagination', 'currentPage']) + 1,
    );
  }

  render() {
    const proBuilds = this.props.proBuilds;
    const fetchError = proBuilds.get('fetchError');
    const errorMessage = proBuilds.get('errorMessage');
    const isFetching = proBuilds.get('isFetching');
    const isRefreshing = proBuilds.get('isRefreshing');
    const championSelected = proBuilds.get('championSelected');
    const proPlayerSelected = proBuilds.get('proPlayerSelected');
    const proBuildsList = proBuilds.get('proBuildsList');

    let content;

    if (fetchError && proBuildsList.size === 0) {
      content = (<View style={styles.container}>
        <ErrorScreen
          message={errorMessage}
          onPressRetryButton={() => {
            this.props.fetchBuilds({
              championId: championSelected,
              proPlayerId: proPlayerSelected,
            }, 1);
          }}
          retryButton
        />
      </View>);
    } else if (proBuildsList.size > 0 || isFetching) {
      content = (<ProBuildsList
        builds={proBuildsList}
        onPressBuild={buildId => Actions.probuild_view({ buildId })}
        onLoadMore={this.handleOnLoadMore}
        isFetching={isFetching}
        isRefreshing={isRefreshing}
        onRefresh={() => {
          this.props.refreshBuilds({
            championId: championSelected,
            proPlayerId: proPlayerSelected,
          }, 1);
        }}
        fetchError={fetchError}
        errorMessage={errorMessage}
        onPressRetry={this.handleOnRetry}
        refreshControl
      />);
    } else {
      content = (<View style={styles.container}>
        <Text>
          {I18n.t('pro_builds_not_available')}
        </Text>
      </View>);
    }

    return (<View style={styles.root}>
      <Toolbar
        proPlayers={this.props.proPlayers}
        onPressMenuButton={() => { Actions.refresh({ key: 'drawer', open: true }); }}
        championSelected={championSelected}
        proPlayerSelected={proPlayerSelected}
        onChangeChampionSelected={this.handleOnChangeChampionSelected}
        onChangeProPlayerSelected={this.handleOnChangeProPlayerSelected}
        disabledFilters={isFetching || isRefreshing}
      />
      {content}
    </View>);
  }
}

ProBuildsListView.propTypes = {
  proBuilds: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    proBuildsIds: ImmutablePropTypes.list.isRequired,
    proBuildsList: ImmutablePropTypes.list.isRequired,
    pagination: ImmutablePropTypes.mapContains({
      currentPage: PropTypes.number.isRequired,
      totalPages: PropTypes.number.isRequired,
    }).isRequired,
    championSelected: PropTypes.number.isRequired,
    proPlayerSelected: PropTypes.string,
  }).isRequired,
  proPlayers: ImmutablePropTypes.map.isRequired,
  // Dispatchers
  fetchBuilds: PropTypes.func.isRequired,
  fetchProPlayers: PropTypes.func.isRequired,
  refreshBuilds: PropTypes.func.isRequired,
};

export default ProBuildsListView;
