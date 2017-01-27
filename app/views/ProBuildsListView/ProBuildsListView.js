import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Actions } from 'react-native-router-flux';
import Toolbar from './components/Toolbar';
import { fetchBuilds, refreshBuilds } from '../../redux/actions/ProBuildsListActions';
import { fetchProPlayers } from '../../redux/actions/ProPlayersActions';
import { tracker } from '../../utils/analytics';
import ProBuildsList from '../../components/ProBuildsList';
import ErrorScreen from '../../components/ErrorScreen';
import denormalize from '../../utils/denormalize';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});

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
    const proBuildsList = probuilds.getIn(['data', 'proBuilds']);

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
          Actualmente no hay builds disponibles para este campeón o jugador, muy pronto estarán disponibles.
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

ProBuildSearchView.propTypes = {
  fetchBuilds: PropTypes.func,
  fetchProPlayers: PropTypes.func,
  refreshBuilds: PropTypes.func,
  proBuilds: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool,
    isRefreshing: PropTypes.bool,
    fetchError: PropTypes.bool,
    errorMessage: PropTypes.string,
    proBuildsIds: PropTypes.list,
    data: ImmutablePropTypes.mapContains({
      proBuilds: ImmutablePropTypes.list,
    }),
    pagination: ImmutablePropTypes.mapContains({
      currentPage: PropTypes.number,
      totalPages: PropTypes.number,
    }),
    championSelected: PropTypes.number,
    proPlayerSelected: PropTypes.string,
  }),
  proPlayers: ImmutablePropTypes.mapContains({
    fetched: PropTypes.bool,
  }),
};

function mapStateToProps(state) {
  let proBuilds = state.proBuildsList;
  let proPlayers = state.proPlayers;

  const proBuildsIds = proBuilds.get('proBuildsIds');
  const proPlayersIds = proPlayers.get('proPlayersIds');

  proBuilds = proBuilds.setIn(['data', 'proBuilds'], proBuildsIds.map(proBuildId => denormalize(proBuildId, 'proBuilds', state.entities)));
  proPlayers = proPlayers.setIn(['data', 'proPlayers'], proPlayersIds.map(proPlayerId => denormalize(proPlayerId, 'proPlayers', state.entities)));

  return {
    proBuilds,
    proPlayers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBuilds: (queryParams, pageNumber) => {
      dispatch(fetchBuilds(queryParams, pageNumber));
    },
    refreshBuilds: (queryParams) => {
      dispatch(refreshBuilds(queryParams));
    },
    fetchProPlayers: () => {
      dispatch(fetchProPlayers());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProBuildSearchView);
