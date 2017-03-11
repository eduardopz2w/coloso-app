import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import I18n from 'i18n-js';

import Toolbar from './Toolbar';
import { tracker } from '../../../utils/analytics';
import colors from '../../../utils/colors';
import ProBuildsTab from './ProBuildsTab';
import FavoriteProBuildsTab from './FavoriteProBuildsTab';

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

    this.state = {
      proPlayerSelected: null,
      championSelected: null,
    };

    this.handleOnPressProBuildsTabRetryButton = this.handleOnPressProBuildsTabRetryButton.bind(this);
    this.handleOnPressFavoriteProBuildsTabRetryButton = this.handleOnPressFavoriteProBuildsTabRetryButton.bind(this);
    this.handleOnLoadMoreProBuildsTab = this.handleOnLoadMoreProBuildsTab.bind(this);
    this.handleOnPressProBuildsTabRefreshButton = this.handleOnPressProBuildsTabRefreshButton.bind(this);
    this.handleOnChangeProPlayerSelected = this.handleOnChangeProPlayerSelected.bind(this);
    this.handleOnChangeChampionSelected = this.handleOnChangeChampionSelected.bind(this);
  }

  componentWillMount() {
    this.props.fetchProPlayers();
    this.props.fetchBuilds({}, 1);
    this.props.fetchFavoriteBuilds();
  }

  componentDidMount() {
    tracker.trackScreenView('ProBuildsListView');
  }

  handleOnPressProBuildsTabRetryButton() {
    this.props.fetchBuilds({
      championId: this.props.proBuilds.get('championSelected'),
      proPlayerId: this.props.proBuilds.get('proPlayerSelected'),
    }, this.props.proBuilds.getIn(['pagination', 'currentPage']) + 1);
  }

  handleOnPressFavoriteProBuildsTabRetryButton() {
    this.props.fetchFavoriteBuilds();
  }

  handleOnPressProBuildsTabRefreshButton() {
    this.props.refreshBuilds({
      championId: this.props.proBuilds.get('championSelected'),
      proPlayerId: this.props.proBuilds.get('proPlayerSelected'),
    }, 1);
  }

  handleOnLoadMoreProBuildsTab() {
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

  handleOnChangeProPlayerSelected(proPlayerSelected) {
    this.setState({ proPlayerSelected });

    this.props.fetchBuilds({
      championId: this.state.championSelected,
      proPlayerId: proPlayerSelected,
    }, 1);
    this.props.setFavoriteBuildsFilters({
      championSelected: this.state.championSelected,
      proPlayerSelected,
    });
  }

  handleOnChangeChampionSelected(championSelected) {
    this.setState({ championSelected });

    this.props.fetchBuilds({
      championId: championSelected,
      proPlayerId: this.state.proPlayerSelected,
    }, 1);
    this.props.setFavoriteBuildsFilters({
      championSelected,
      proPlayerSelected: this.state.proPlayerSelected,
    });
  }

  render() {
    return (<View style={styles.root}>
      <Toolbar
        proPlayers={this.props.proPlayers}
        disabledFilters={this.props.proBuilds.get('isFetching')}
        onPressMenuButton={() => { Actions.refresh({ key: 'drawer', open: true }); }}
        championSelected={this.state.championSelected}
        proPlayerSelected={this.state.proPlayerSelected}
        onChangeChampionSelected={this.handleOnChangeChampionSelected}
        onChangeProPlayerSelected={this.handleOnChangeProPlayerSelected}
      />
      <ScrollableTabView
        initialPage={0}
        style={{ flex: 1 }}
        renderTabBar={() => <DefaultTabBar />}
        tabBarBackgroundColor={colors.primary}
        tabBarActiveTextColor={colors.accent}
        tabBarInactiveTextColor="rgba(255,255,255,0.8)"
        tabBarUnderlineStyle={{ backgroundColor: colors.accent }}
        onChangeTab={this.handleOnChangeTab}
      >
        <ProBuildsTab
          tabLabel="Builds"
          proBuilds={this.props.proBuilds}
          onPressRetryButton={this.handleOnPressProBuildsTabRetryButton}
          onPressRefreshButton={this.handleOnPressProBuildsTabRefreshButton}
          onPressBuild={buildId => Actions.probuild_view({ buildId })}
          onLoadMore={this.handleOnLoadMoreProBuildsTab}
          onAddFavorite={this.props.addFavoriteBuild}
          onRemoveFavorite={this.props.removeFavoriteBuild}
        />
        <FavoriteProBuildsTab
          tabLabel={I18n.t('favorites')}
          favoriteProBuilds={this.props.favoriteProBuilds}
          onPressRetryButton={this.handleOnPressFavoriteProBuildsTabRetryButton}
          onPressBuild={buildId => Actions.probuild_view({ buildId })}
          onRemoveFavorite={this.props.removeFavoriteBuild}
        />
      </ScrollableTabView>
    </View>);
  }
}

ProBuildsListView.propTypes = {
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
  favoriteProBuilds: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    builds: ImmutablePropTypes.list.isRequired,
    championSelected: PropTypes.number,
    proPlayerSelected: PropTypes.string,
  }).isRequired,
  proPlayers: ImmutablePropTypes.map.isRequired,
  // Dispatchers
  fetchBuilds: PropTypes.func.isRequired,
  fetchFavoriteBuilds: PropTypes.func.isRequired,
  fetchProPlayers: PropTypes.func.isRequired,
  refreshBuilds: PropTypes.func.isRequired,
  addFavoriteBuild: PropTypes.func.isRequired,
  removeFavoriteBuild: PropTypes.func.isRequired,
  setFavoriteBuildsFilters: PropTypes.func.isRequired,
};

export default ProBuildsListView;
