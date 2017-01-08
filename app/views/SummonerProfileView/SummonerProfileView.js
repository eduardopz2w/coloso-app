import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import SummonerProfileViewToolbar from './components/SummonerProfileViewToolbar';
import {
  fetchSummonerData,
  fetchLeagueEntry,
  fetchChampionsMastery,
  fetchGamesRecent,
  fetchMasteries,
  fetchRunes,
  fetchSummary,
} from '../../redux/actions/SummonerProfileViewActions';
import LeagueEntryView from './components/LeagueEntryView';
import ChampionsMasteryView from './components/ChampionsMasteryView';
import GamesRecentView from './components/GamesRecentView';
import MasteriesView from './components/MasteriesView';
import SummonerSummaryView from './components/SummonerSummaryView';
import RunesView from './components/RunesView';
import colors from '../../utils/colors';
import { tracker } from '../../utils/analytics';

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
    this.props.fetchSummonerData();
    this.props.fetchLeagueEntry();
  }

  componentDidMount() {
    tracker.trackScreenView('SummonerProfileView');
  }

  handleOnChangeTab({ i: tabIndex }) {
    if (tabIndex === 1) {
      // championsMastery

      if (!this.props.championsMastery.get('isFetching') && !this.props.championsMastery.get('fetched')) {
        this.props.fetchChampionsMastery();
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
        this.props.fetchSummary('SEASON2016');
      }
    }
  }

  render() {
    return (<View style={styles.root}>
      <SummonerProfileViewToolbar
        summonerData={this.props.summonerData}
        onPressBackButton={() => { Actions.pop(); }}
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
          tabLabel="Clasificatoria"
          leagueEntry={this.props.leagueEntry}
          onPressRetryButton={() => this.props.fetchLeagueEntry()}
        />
        <ChampionsMasteryView
          tabLabel="Campeones"
          championsMastery={this.props.championsMastery}
          onPressRetryButton={() => this.props.fetchChampionsMastery()}
        />
        <GamesRecentView
          tabLabel="Historial"
          gamesRecent={this.props.gamesRecent}
          onPressRetryButton={() => this.props.fetchGamesRecent()}
        />
        <RunesView
          tabLabel="Runas"
          runes={this.props.runes}
          onPressRetryButton={() => this.props.fetchRunes()}
        />
        <MasteriesView
          tabLabel="Maestrias"
          masteries={this.props.masteries}
          onPressRetryButton={() => this.props.fetchMasteries()}
        />
        <SummonerSummaryView
          summary={this.props.summary}
          tabLabel="Estadisticas"
          onPressRetryButton={() => this.props.fetchSummary(this.props.summary.season)}
          onChangeSeason={season => this.props.fetchSummary(season)}
        />
      </ScrollableTabView>
    </View>);
  }

}

SummonerProfileView.propTypes = {
  summonerId: PropTypes.number,
  region: PropTypes.string,
  fetchSummonerData: PropTypes.func,
  fetchLeagueEntry: PropTypes.func,
  fetchChampionsMastery: PropTypes.func,
  fetchGamesRecent: PropTypes.func,
  fetchMasteries: PropTypes.func,
  fetchSummary: PropTypes.func,
  fetchRunes: PropTypes.func,
  leagueEntry: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool,
    fetched: PropTypes.bool,
  }),
  summonerData: ImmutablePropTypes.map,
  championsMastery: ImmutablePropTypes.mapContains({
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

function mapStateToProps(state) {
  const summonerData = state.summonerProfileView.get('summonerData');
  const leagueEntry = state.summonerProfileView.get('leagueEntry');
  const championsMastery = state.summonerProfileView.get('championsMastery');
  const gamesRecent = state.summonerProfileView.get('gamesRecent');
  const masteries = state.summonerProfileView.get('masteries');
  const runes = state.summonerProfileView.get('runes');
  const summary = state.summonerProfileView.get('summary');

  return {
    summonerData,
    leagueEntry,
    championsMastery,
    gamesRecent,
    masteries,
    runes,
    summary,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { summonerId, region } = ownProps;

  return {
    fetchSummonerData: () => {
      dispatch(fetchSummonerData(summonerId, region));
    },

    fetchLeagueEntry: () => {
      dispatch(fetchLeagueEntry(summonerId, region));
    },

    fetchChampionsMastery: () => {
      dispatch(fetchChampionsMastery(summonerId, region));
    },

    fetchGamesRecent: () => {
      dispatch(fetchGamesRecent(summonerId, region));
    },

    fetchMasteries: () => {
      dispatch(fetchMasteries(summonerId, region));
    },

    fetchRunes: () => {
      dispatch(fetchRunes(summonerId, region));
    },

    fetchSummary: (season) => {
      dispatch(fetchSummary(summonerId, region, season));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SummonerProfileView);
