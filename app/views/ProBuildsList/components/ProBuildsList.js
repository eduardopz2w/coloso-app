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

  render() {
    const probuilds = this.props.proBuilds;
    const isFetching = probuilds.get('isFetching');
    const isRefreshing = probuilds.get('isRefreshing');
    const championSelected = probuilds.get('championSelected');
    const proPlayerSelected = probuilds.get('proPlayerSelected');
    const proBuildsList = probuilds.get('proBuildsList');

    let content;

    if (probuilds.get('fetchError')) {
      content = (<View style={styles.container}>
        <ErrorScreen
          message={probuilds.get('errorMessage')}
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
        championSelected={this.props.proBuilds.get('championSelected')}
        proPlayerSelected={this.props.proBuilds.get('proPlayerSelected')}
        onChangeChampionSelected={this.handleOnChangeChampionSelected}
        onChangeProPlayerSelected={this.handleOnChangeProPlayerSelected}
        disabledFilters={isFetching || isRefreshing}
      />
      {content}
    </View>);
  }
}

ProBuildsListView.propTypes = {
  fetchBuilds: PropTypes.func,
  fetchProPlayers: PropTypes.func,
  refreshBuilds: PropTypes.func,
  proBuilds: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool,
    isRefreshing: PropTypes.bool,
    fetchError: PropTypes.bool,
    errorMessage: PropTypes.string,
    proBuildsIds: PropTypes.list,
    proBuildsList: ImmutablePropTypes.list,
    pagination: ImmutablePropTypes.mapContains({
      currentPage: PropTypes.number,
      totalPages: PropTypes.number,
    }),
    championSelected: PropTypes.number,
    proPlayerSelected: PropTypes.string,
  }),
  proPlayers: ImmutablePropTypes.mapContains({
    fetched: PropTypes.bool,
    proPlayersList: ImmutablePropTypes.list,
  }),
};

export default ProBuildsListView;
