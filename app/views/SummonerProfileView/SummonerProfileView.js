import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import SummonerProfileViewToolbar from './components/SummonerProfileViewToolbar';
import SummonerProfileViewActions from '../../redux/actions/SummonerProfileViewActions';
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
      const { isFetching, fetched } = this.props.championsMastery;

      if (!isFetching && !fetched) {
        this.props.fetchChampionsMastery();
      }
    }

    if (tabIndex === 2) {
      // GamesRecent
      const { isFetching, fetched } = this.props.gamesRecent;

      if (!isFetching && !fetched) {
        this.props.fetchGamesRecent();
      }
    }


    if (tabIndex === 3) {
      // Runes
      const { isFetching, fetched } = this.props.runes;

      if (!isFetching && !fetched) {
        this.props.fetchRunes();
      }
    }

    if (tabIndex === 4) {
      // Masteries
      const { isFetching, fetched } = this.props.masteries;

      if (!isFetching && !fetched) {
        this.props.fetchMasteries();
      }
    }

    if (tabIndex === 5) {
      // Masteries
      const { isFetching, fetched } = this.props.summary;

      if (!isFetching && !fetched) {
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
          onPressRetryButton={() => this.props.fetchSummary(this.props.summary.region)}
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
  leagueEntry: PropTypes.shape({
    isFetching: PropTypes.bool,
    fetched: PropTypes.bool,
  }),
  summonerData: PropTypes.shape({}),
  championsMastery: PropTypes.shape({
    isFetching: PropTypes.bool,
    fetched: PropTypes.bool,
  }),
  gamesRecent: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }),
  masteries: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }),
  runes: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }),
  summary: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    playerStatSummaries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    region: PropTypes.string,
  }),
};

function mapStateToProps(state) {
  const summonerData = state.summonerProfileView.get('summonerData').toJS();
  const leagueEntry = state.summonerProfileView.get('leagueEntry').toJS();
  const championsMastery = state.summonerProfileView.get('championsMastery').toJS();
  const gamesRecent = state.summonerProfileView.get('gamesRecent').toJS();
  const masteries = state.summonerProfileView.get('masteries').toJS();
  const runes = state.summonerProfileView.get('runes').toJS();
  const summary = state.summonerProfileView.get('summary').toJS();

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
      dispatch(SummonerProfileViewActions.fetchSummonerData(summonerId, region));
    },

    fetchLeagueEntry: () => {
      dispatch(SummonerProfileViewActions.fetchLeagueEntry(summonerId, region));
    },

    fetchChampionsMastery: () => {
      dispatch(SummonerProfileViewActions.fetchChampionsMastery(summonerId, region));
    },

    fetchGamesRecent: () => {
      dispatch(SummonerProfileViewActions.fetchGamesRecent(summonerId, region));
    },

    fetchMasteries: () => {
      dispatch(SummonerProfileViewActions.fetchMasteries(summonerId, region));
    },

    fetchRunes: () => {
      dispatch(SummonerProfileViewActions.fetchRunes(summonerId, region));
    },

    fetchSummary: (season) => {
      dispatch(SummonerProfileViewActions.fetchSummary(summonerId, region, season));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SummonerProfileView);
