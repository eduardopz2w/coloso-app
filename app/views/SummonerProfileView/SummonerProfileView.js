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
  fetchChampionsMasteries,
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
          championsMasteries={this.props.championsMasteries}
          onPressRetryButton={() => this.props.fetchChampionsMasteries()}
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
          onPressRetryButton={() => this.props.fetchSummary(this.props.summary.get('season'))}
          onChangeSeason={season => this.props.fetchSummary(season)}
        />
      </ScrollableTabView>
    </View>);
  }

}


SummonerProfileView.propTypes = {
  fetchSummonerData: PropTypes.func,
  fetchLeagueEntry: PropTypes.func,
  fetchChampionsMasteries: PropTypes.func,
  fetchGamesRecent: PropTypes.func,
  fetchMasteries: PropTypes.func,
  fetchSummary: PropTypes.func,
  fetchRunes: PropTypes.func,
  leagueEntry: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool,
    fetched: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    data: ImmutablePropTypes.mapContains({
      attributes: ImmutablePropTypes.mapContains({
        entires: PropTypes.array,
      }),
    }),
  }),
  summonerData: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool,
    fetched: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    data: ImmutablePropTypes.mapContains({
      attributes: ImmutablePropTypes.mapContains({
        name: PropTypes.string.isRequired,
        profileIconId: PropTypes.number.isRequired,
        summonerLevel: PropTypes.number.isRequired,
        region: PropTypes.string.isRequired,
      }),
    }),
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

function mapStateToProps(state) {
  let summonerData = state.summonerProfileView.get('summonerData');
  let leagueEntry = state.summonerProfileView.get('leagueEntry');
  let championsMasteries = state.summonerProfileView.get('championsMasteries');
  let gamesRecent = state.summonerProfileView.get('gamesRecent');
  let masteries = state.summonerProfileView.get('masteries');
  let runes = state.summonerProfileView.get('runes');
  let summary = state.summonerProfileView.get('summary');

  if (summonerData.get('fetched')) {
    summonerData = summonerData.merge({
      data: state.entities.getIn(['summoners', summonerData.get('summonerUrid')]),
    });
  }

  if (leagueEntry.get('fetched')) {
    leagueEntry = leagueEntry.merge({
      data: state.entities.getIn(['leagueEntries', leagueEntry.get('leagueEntryId')]),
    });
  }

  if (championsMasteries.get('fetched')) {
    championsMasteries = championsMasteries.merge({
      data: state.entities.getIn(['championsMasteries', championsMasteries.get('championsMasteriesId')]),
    });
  }

  if (gamesRecent.get('fetched')) {
    gamesRecent = gamesRecent.merge({
      data: state.entities.getIn(['gamesRecent', gamesRecent.get('gamesRecentId')]),
    });
  }

  if (masteries.get('fetched')) {
    masteries = masteries.merge({
      data: state.entities.getIn(['masteries', masteries.get('masteriesId')]),
    });
  }

  if (runes.get('fetched')) {
    runes = runes.merge({
      data: state.entities.getIn(['runes', runes.get('runesId')]),
    });
  }

  if (summary.get('fetched')) {
    summary = summary.merge({
      data: state.entities.getIn(['statsSummaries', summary.get('statsSummariesId')]),
    });
  }

  return {
    summonerData,
    leagueEntry,
    championsMasteries,
    gamesRecent,
    masteries,
    runes,
    summary,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { summonerUrid } = ownProps;

  return {
    fetchSummonerData: () => {
      dispatch(fetchSummonerData(summonerUrid));
    },

    fetchLeagueEntry: () => {
      dispatch(fetchLeagueEntry(summonerUrid));
    },

    fetchChampionsMasteries: () => {
      dispatch(fetchChampionsMasteries(summonerUrid));
    },

    fetchGamesRecent: () => {
      dispatch(fetchGamesRecent(summonerUrid));
    },

    fetchMasteries: () => {
      dispatch(fetchMasteries(summonerUrid));
    },

    fetchRunes: () => {
      dispatch(fetchRunes(summonerUrid));
    },

    fetchSummary: (season) => {
      dispatch(fetchSummary(summonerUrid, season));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SummonerProfileView);
