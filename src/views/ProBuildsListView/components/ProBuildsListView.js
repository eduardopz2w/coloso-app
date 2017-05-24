import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import I18n from 'i18n-js';

import { colors, tracker } from 'utils';
import Toolbar from './Toolbar';
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
      proPlayerId: null,
      championId: null,
    };

    this.handleOnPressProBuildsTabRetryButton = this
      .handleOnPressProBuildsTabRetryButton.bind(this);
    this.handleOnPressFavoriteProBuildsTabRetryButton = this
      .handleOnPressFavoriteProBuildsTabRetryButton.bind(this);
    this.handleOnLoadMoreProBuildsTab = this.handleOnLoadMoreProBuildsTab.bind(this);
    this.handleOnPressProBuildsTabRefreshButton = this
      .handleOnPressProBuildsTabRefreshButton.bind(this);
    this.handleOnChangeProPlayerSelected = this.handleOnChangeProPlayerSelected.bind(this);
    this.handleOnChangeChampionSelected = this.handleOnChangeChampionSelected.bind(this);
  }

  componentWillMount() {
    this.props.fetchProPlayers();
    this.props.fetchBuilds({ page: { number: 1 } });
    this.props.fetchFavoriteBuilds();
  }

  componentDidMount() {
    tracker.trackScreenView('ProBuildsListView');
  }

  handleOnPressProBuildsTabRetryButton() {
    let page = 1;

    if (this.props.proBuilds.getIn(['pagination', 'currentPage']) !== 1) {
      page = this.props.proBuilds.getIn(['pagination', 'currentPage']) + 1;
    }

    this.props.fetchBuilds({
      championId: this.props.proBuilds.getIn(['filters', 'championId']),
      proPlayerId: this.props.proBuilds.getIn(['filters', 'proPlayerId']),
      page: {
        number: page,
      },
    });
  }

  handleOnPressFavoriteProBuildsTabRetryButton() {
    this.props.fetchFavoriteBuilds();
  }

  handleOnPressProBuildsTabRefreshButton() {
    this.props.refreshBuilds({
      championId: this.props.proBuilds.getIn(['filters', 'championId']),
      proPlayerId: this.props.proBuilds.getIn(['filters', 'proPlayerId']),
      page: { number: 1 },
    });
  }

  handleOnLoadMoreProBuildsTab() {
    const pagData = this.props.proBuilds.get('pagination').toJS();
    const isFetching = this.props.proBuilds.get('isFetching');

    if (!isFetching && pagData.totalPages > pagData.currentPage) {
      const championId = this.props.proBuilds.getIn(['filters', 'championId']);
      const proPlayerId = this.props.proBuilds.getIn(['filters', 'proPlayerId']);

      this.props.fetchBuilds({
        championId,
        proPlayerId,
        page: { number: pagData.currentPage + 1 },
      });
    }
  }

  handleOnChangeProPlayerSelected(proPlayerId) {
    this.setState({ proPlayerId });

    this.props.fetchBuilds({
      championId: this.state.championId,
      proPlayerId,
      page: { number: 1 },
    });
    this.props.setFavoriteBuildsFilters({
      championId: this.state.championId,
      proPlayerId,
    });
  }

  handleOnChangeChampionSelected(championId) {
    this.setState({ championId });

    this.props.fetchBuilds({
      championId,
      proPlayerId: this.state.proPlayerId,
      page: { number: 1 },
    });
    this.props.setFavoriteBuildsFilters({
      championId,
      proPlayerId: this.state.proPlayerId,
    });
  }

  render() {
    return (<View style={styles.root}>
      <Toolbar
        proPlayers={this.props.proPlayers}
        disabledFilters={this.props.proBuilds.get('isFetching')}
        onPressMenuButton={this.props.openDrawer}
        championSelected={this.state.championId}
        proPlayerSelected={this.state.proPlayerId}
        onChangeChampionSelected={this.handleOnChangeChampionSelected}
        onChangeProPlayerSelected={this.handleOnChangeProPlayerSelected}
      />
      <ScrollableTabView
        initialPage={0}
        style={{ flex: 1 }}
        renderTabBar={() => <DefaultTabBar />}
        tabBarBackgroundColor={colors.primary}
        tabBarActiveTextColor="white"
        tabBarInactiveTextColor="rgba(255,255,255,0.8)"
        tabBarUnderlineStyle={{ backgroundColor: colors.accent }}
        onChangeTab={this.handleOnChangeTab}
        locked
      >
        <ProBuildsTab
          tabLabel="Builds"
          proBuilds={this.props.proBuilds}
          onPressRetryButton={this.handleOnPressProBuildsTabRetryButton}
          onPressRefreshButton={this.handleOnPressProBuildsTabRefreshButton}
          onPressBuild={this.props.goToBuild}
          onLoadMore={this.handleOnLoadMoreProBuildsTab}
          onAddFavorite={this.props.addFavoriteBuild}
          onRemoveFavorite={this.props.removeFavoriteBuild}
        />
        <FavoriteProBuildsTab
          tabLabel={I18n.t('favorites')}
          favoriteProBuilds={this.props.favoriteProBuilds}
          onPressRetryButton={this.handleOnPressFavoriteProBuildsTabRetryButton}
          onPressBuild={this.props.goToBuild}
          onRemoveFavorite={this.props.removeFavoriteBuild}
        />
      </ScrollableTabView>
    </View>);
  }
}

ProBuildsListView.propTypes = {
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
  favoriteProBuilds: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    data: ImmutablePropTypes.list.isRequired,
    filters: ImmutablePropTypes.mapContains({
      championId: PropTypes.number,
      proPlayerId: PropTypes.string,
    }),
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
  goToBuild: PropTypes.func.isRequired,
  openDrawer: PropTypes.func.isRequired,
};

export default ProBuildsListView;
