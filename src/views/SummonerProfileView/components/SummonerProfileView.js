import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import I18n from 'i18n-js';
import Toolbar from './Toolbar';

import LeagueEntryView from './LeagueEntryView';
import ChampionsMasteryView from './ChampionsMasteryView';
import GamesRecentView from './GamesRecentView';
import MasteriesView from './MasteriesView';
import SummonerSummaryView from './SummonerSummaryView';
import RunesView from './RunesView';
import colors from '../../../utils/colors';
import { tracker } from '../../../utils/analytics';

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
    if (this.props.summonerUrid !== this.props.summonerData.getIn(['data', 'summonerUrid'])) {
      this.props.clearCache();
      this.props.fetchSummonerData();
      this.props.fetchLeagueEntry();
    }
  }

  componentDidMount() {
    tracker.trackScreenView('SummonerProfileView');
  }

  handleOnChangeTab({ i: tabIndex }) {
    if (tabIndex === 1) {
      // championsMasteries

      if (!this.props.championsMasteries.get('isFetching') && !this.props.championsMasteries.get('fetched')) {
        this.props.fetchChampionsMasteries();
      }
    }

    if (tabIndex === 2) {
      // GamesRecent

      if (!this.props.gamesRecent.get('isFetching') && !this.props.gamesRecent.get('fetched')) {
        this.props.fetchGamesRecent();
      }
    }


    if (tabIndex === 3) {
      // Runes

      if (!this.props.runes.get('isFetching') && !this.props.runes.get('fetched')) {
        this.props.fetchRunes();
      }
    }

    if (tabIndex === 4) {
      // Masteries

      if (!this.props.masteries.get('isFetching') && !this.props.masteries.get('fetched')) {
        this.props.fetchMasteries();
      }
    }

    if (tabIndex === 5) {
      // Summary

      if (!this.props.summary.get('isFetching') && !this.props.summary.get('fetched')) {
        this.props.fetchSummary('SEASON2017');
      }
    }
  }

  render() {
    return (<View style={styles.root}>
      <Toolbar
        summonerData={this.props.summonerData}
        onPressBackButton={() => { Actions.pop(); }}
        onPressRetryButton={() => { this.props.fetchSummonerData(); }}
      />
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
        tabBarBackgroundColor={colors.primary}
        tabBarActiveTextColor={colors.accent}
        tabBarInactiveTextColor="rgba(255,255,255,0.8)"
        tabBarUnderlineStyle={{ backgroundColor: colors.accent }}
        onChangeTab={this.handleOnChangeTab}
      >
        <LeagueEntryView
          tabLabel={I18n.t('ranked')}
          leagueEntries={this.props.leagueEntries}
          onPressRetryButton={() => this.props.fetchLeagueEntry()}
        />
        <ChampionsMasteryView
          tabLabel={I18n.t('champions')}
          championsMasteries={this.props.championsMasteries}
          onPressRetryButton={() => this.props.fetchChampionsMasteries()}
        />
        <GamesRecentView
          tabLabel={I18n.t('history')}
          gamesRecent={this.props.gamesRecent}
          onPressRetryButton={() => this.props.fetchGamesRecent()}
        />
        <RunesView
          tabLabel={I18n.t('runes')}
          runes={this.props.runes}
          onPressRetryButton={() => this.props.fetchRunes()}
        />
        <MasteriesView
          tabLabel={I18n.t('masteries')}
          masteries={this.props.masteries}
          onPressRetryButton={() => this.props.fetchMasteries()}
        />
        <SummonerSummaryView
          summary={this.props.summary}
          tabLabel={I18n.t('stats')}
          onPressRetryButton={() => this.props.fetchSummary(this.props.summary.get('season'))}
          onChangeSeason={season => this.props.fetchSummary(season)}
        />
      </ScrollableTabView>
    </View>);
  }

}


SummonerProfileView.propTypes = {
  summonerUrid: PropTypes.string.isRequired,
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
