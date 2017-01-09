import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Actions } from 'react-native-router-flux';
import Toolbar from './components/Toolbar';
import { fetchBuilds, refreshBuilds } from '../../redux/actions/ProBuildsSearchActions';
import { tracker } from '../../utils/analytics';
import ProBuildsList from '../../components/ProBuildsList';
import ChampionSelector from '../../components/ChampionSelector';
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
    this.handleOnLoadMore = this.handleOnLoadMore.bind(this);
  }

  componentWillMount() {
    this.props.fetchBuilds(null, 1);
  }

  componentDidMount() {
    tracker.trackScreenView('ProbuildsSearchView');
  }

  handleOnChangeChampionSelected(championId) {
    this.props.fetchBuilds(championId, 1);
  }

  handleOnLoadMore() {
    const pagData = this.props.probuilds.get('pagination').toJS();
    const isFetching = this.props.probuilds.get('isFetching');
    const championSelected = this.props.probuilds.get('championSelected');

    if (!isFetching && pagData.pageCount > pagData.page) {
      this.props.fetchBuilds(
        championSelected,
        pagData.page + 1,
      );
    }
  }

  render() {
    const probuilds = this.props.probuilds;
    const isFetching = probuilds.get('isFetching');
    const isRefreshing = probuilds.get('isRefreshing');
    const championSelected = probuilds.get('championSelected');
    const builds = probuilds.get('builds');

    let content;

    if (probuilds.get('fetchError')) {
      content = (<View style={styles.container}>
        <ErrorScreen
          message={probuilds.get('errorMessage')}
          onPressRetryButton={() => { this.props.fetchBuilds(championSelected, 1); }}
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
        onRefresh={() => { this.props.refreshBuilds(championSelected); }}
        refreshControl
      />);
    } else {
      content = (<View style={styles.container}>
        <Text>
          Actualmente no hay builds disponibles para este campeón, pronto estaran disponibles!.
        </Text>
      </View>);
    }

    return (<View style={styles.root}>
      <Toolbar
        onPressMenuButton={() => { Actions.refresh({ key: 'drawer', open: true }); }}
      />
      <ChampionSelector
        style={{ paddingHorizontal: 16, backgroundColor: 'rgba(0,0,0,0.1)' }}
        onChangeSelected={this.handleOnChangeChampionSelected}
      />
      {content}
    </View>);
  }
}

ProBuildSearchView.propTypes = {
  fetchBuilds: PropTypes.func,
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
  }),
};

function mapStateToProps(state) {
  const probuilds = state.proBuildsSearchView;

  return {
    probuilds,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBuilds: (championId, page) => {
      dispatch(fetchBuilds(championId, page, PAGESIZE));
    },
    refreshBuilds: (championId) => {
      dispatch(refreshBuilds(championId, PAGESIZE));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProBuildSearchView);
