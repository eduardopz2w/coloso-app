import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Actions } from 'react-native-router-flux';
import Toolbar from './components/Toolbar';
import { fetchBuilds, refreshBuilds } from '../../redux/actions/ProBuildsSearchActions';
import { fetchPlayers } from '../../redux/actions/ProPlayersActions';
import { tracker } from '../../utils/analytics';
import ProBuildsList from '../../components/ProBuildsList';
import ErrorScreen from '../../components/ErrorScreen';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});

const PAGESIZE = 25;

class ProBuildSearchView extends Component {
  constructor(props) {
    super(props);

    this.handleOnChangeChampionSelected = this.handleOnChangeChampionSelected.bind(this);
    this.handleOnChangeProPlayerSelected = this.handleOnChangeProPlayerSelected.bind(this);
    this.handleOnLoadMore = this.handleOnLoadMore.bind(this);
  }

  componentWillMount() {
    this.props.fetchBuilds({}, 1);

    if (!this.props.proPlayers.get('fetched')) {
      this.props.fetchPlayers();
    }
  }

  componentDidMount() {
    tracker.trackScreenView('ProbuildsSearchView');
  }

  handleOnChangeChampionSelected(championId) {
    this.props.fetchBuilds({
      championId,
      proPlayerId: this.props.probuilds.get('proPlayerSelected'),
    }, 1);
  }

  handleOnChangeProPlayerSelected(proPlayerId) {
    this.props.fetchBuilds({
      championId: this.props.probuilds.get('championSelected'),
      proPlayerId,
    }, 1);
  }

  handleOnLoadMore() {
    const pagData = this.props.probuilds.get('pagination').toJS();
    const isFetching = this.props.probuilds.get('isFetching');

    if (!isFetching && pagData.pageCount > pagData.page) {
      const championSelected = this.props.probuilds.get('championSelected');
      const proPlayerSelected = this.props.probuilds.get('proPlayerSelected');

      this.props.fetchBuilds(
        {
          championId: championSelected,
          proPlayerId: proPlayerSelected,
        },
        pagData.page + 1,
      );
    }
  }

  render() {
    const probuilds = this.props.probuilds;
    const isFetching = probuilds.get('isFetching');
    const isRefreshing = probuilds.get('isRefreshing');
    const championSelected = probuilds.get('championSelected');
    const proPlayerSelected = probuilds.get('proPlayerSelected');
    const builds = probuilds.get('builds');

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
    } else if (builds.size > 0 || isFetching) {
      content = (<ProBuildsList
        builds={builds}
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
          Actualmente no hay builds disponibles para este campeón o jugador, muy pronto estarán disponibles.
        </Text>
      </View>);
    }

    return (<View style={styles.root}>
      <Toolbar
        proPlayers={this.props.proPlayers}
        onPressMenuButton={() => { Actions.refresh({ key: 'drawer', open: true }); }}
        championSelected={this.props.probuilds.get('championSelected')}
        proPlayerSelected={this.props.probuilds.get('proPlayerSelected')}
        onChangeChampionSelected={this.handleOnChangeChampionSelected}
        onChangeProPlayerSelected={this.handleOnChangeProPlayerSelected}
        disabledFilters={isFetching || isRefreshing}
      />
      {content}
    </View>);
  }
}

ProBuildSearchView.propTypes = {
  fetchBuilds: PropTypes.func,
  fetchPlayers: PropTypes.func,
  refreshBuilds: PropTypes.func,
  probuilds: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool,
    isRefreshing: PropTypes.bool,
    fetchError: PropTypes.bool,
    errorMessage: PropTypes.string,
    builds: ImmutablePropTypes.list,
    pagination: ImmutablePropTypes.mapContains({
      page: PropTypes.number,
      pageSize: PropTypes.number,
      pageCount: PropTypes.number,
    }),
    championSelected: PropTypes.number,
    proPlayerSelected: PropTypes.number,
  }),
  proPlayers: ImmutablePropTypes.mapContains({
    fetched: PropTypes.bool,
  }),
};

function mapStateToProps(state) {
  const probuilds = state.proBuildsSearchView;
  const proPlayers = state.proPlayers;

  return {
    probuilds,
    proPlayers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBuilds: (filters, page) => {
      dispatch(fetchBuilds(filters, page, PAGESIZE));
    },
    refreshBuilds: (filters) => {
      dispatch(refreshBuilds(filters, PAGESIZE));
    },
    fetchPlayers: () => {
      dispatch(fetchPlayers());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProBuildSearchView);
