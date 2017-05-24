import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import I18n from 'i18n-js';

import { tracker, colors } from 'utils';
import Toolbar from './Toolbar';
import LeagueEntryView from './LeagueEntryView';
import ChampionsMasteryView from './ChampionsMasteryView';
import GamesRecentView from './GamesRecentView';
import MasteriesView from './MasteriesView';
import SummonerSummaryView from './SummonerSummaryView';
import RunesView from './RunesView';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

class SummonerProfileView extends Component {
  constructor(props) {
    super(props);

    this.handleOnChangeTab = this.handleOnChangeTab.bind(this);
  }

  componentWillMount() {
    const { summonerId } = this.props.navigation.state.params;

    if (summonerId !== this.props.summonerData.getIn(['data', 'summonerId'])) {
      this.props.clearCache();
      this.props.fetchSummonerData(summonerId);
      this.props.fetchLeagueEntry(summonerId);
    }
  }

  componentDidMount() {
    tracker.trackScreenView('SummonerProfileView');
  }

  handleOnChangeTab({ i: tabIndex }) {
    const summonerId = this.props.navigation.state.params.summonerId;

    if (tabIndex === 1) {
      // championsMasteries

      if (!this.props.championsMasteries.get('isFetching') && !this.props.championsMasteries.get('fetched')) {
        this.props.fetchChampionsMasteries(summonerId);
      }
    }

    if (tabIndex === 2) {
      // GamesRecent

      if (!this.props.gamesRecent.get('isFetching') && !this.props.gamesRecent.get('fetched')) {
        this.props.fetchGamesRecent(summonerId);
      }
    }


    if (tabIndex === 3) {
      // Runes

      if (!this.props.runes.get('isFetching') && !this.props.runes.get('fetched')) {
        this.props.fetchRunes(summonerId);
      }
    }

    if (tabIndex === 4) {
      // Masteries

      if (!this.props.masteries.get('isFetching') && !this.props.masteries.get('fetched')) {
        this.props.fetchMasteries(summonerId);
      }
    }

    if (tabIndex === 5) {
      // Summary

      if (!this.props.summary.get('isFetching') && !this.props.summary.get('fetched')) {
        this.props.fetchSummary(summonerId, 'SEASON2017');
      }
    }
  }

  render() {
    const summonerId = this.props.navigation.state.params.summonerId;

    return (<View style={styles.root}>
      <Toolbar
        summonerData={this.props.summonerData}
        onPressBackButton={() => { this.props.navigation.goBack(); }}
        onPressRetryButton={() => { this.props.fetchSummonerData(); }}
      />
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
        tabBarBackgroundColor={colors.primary}
        tabBarActiveTextColor="white"
        tabBarInactiveTextColor="rgba(255,255,255,0.8)"
        tabBarUnderlineStyle={{ backgroundColor: colors.accent }}
        onChangeTab={this.handleOnChangeTab}
      >
        <LeagueEntryView
          tabLabel={I18n.t('ranked')}
          leagueEntries={this.props.leagueEntries}
          onPressRetryButton={() => this.props.fetchLeagueEntry(summonerId)}
        />
        <ChampionsMasteryView
          tabLabel={I18n.t('champions')}
          championsMasteries={this.props.championsMasteries}
          onPressRetryButton={() => this.props.fetchChampionsMasteries(summonerId)}
        />
        <GamesRecentView
          tabLabel={I18n.t('history')}
          gamesRecent={this.props.gamesRecent}
          onPressRetryButton={() => this.props.fetchGamesRecent(summonerId)}
        />
        <RunesView
          tabLabel={I18n.t('runes')}
          runes={this.props.runes}
          onPressRetryButton={() => this.props.fetchRunes(summonerId)}
        />
        <MasteriesView
          tabLabel={I18n.t('masteries')}
          masteries={this.props.masteries}
          onPressRetryButton={() => this.props.fetchMasteries(summonerId)}
        />
        <SummonerSummaryView
          summary={this.props.summary}
          tabLabel={I18n.t('stats')}
          onPressRetryButton={() => this.props.fetchSummary(summonerId, this.props.summary.get('season'))}
          onChangeSeason={season => this.props.fetchSummary(summonerId, season)}
        />
      </ScrollableTabView>
    </View>);
  }

}


SummonerProfileView.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        summonerId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  fetchSummonerData: PropTypes.func.isRequired,
  fetchLeagueEntry: PropTypes.func.isRequired,
  fetchChampionsMasteries: PropTypes.func.isRequired,
  fetchGamesRecent: PropTypes.func.isRequired,
  fetchMasteries: PropTypes.func.isRequired,
  fetchSummary: PropTypes.func.isRequired,
  fetchRunes: PropTypes.func.isRequired,
  clearCache: PropTypes.func.isRequired,
  leagueEntries: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool,
    fetched: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    data: ImmutablePropTypes.map,
  }),
  summonerData: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool,
    fetched: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    data: ImmutablePropTypes.map,
  }),
  championsMasteries: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool,
    fetched: PropTypes.bool,
  }),
  gamesRecent: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }),
  masteries: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }),
  runes: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }),
  summary: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    playerStatSummaries: ImmutablePropTypes.list,
    season: PropTypes.string,
  }),
};

export default SummonerProfileView;
