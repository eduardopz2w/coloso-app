import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Toolbar from './components/Toolbar';
import { fetchBuilds } from '../../redux/actions/ProBuildsSearchActions';
import LoadingScreen from '../../components/LoadingScreen';
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
    const pagData = this.props.builds.pagination;
    if (!this.props.builds.isFetching && pagData.pageCount > pagData.page) {
      this.props.fetchBuilds(
        this.props.builds.championSelected,
        pagData.page + 1,
      );
    }
  }

  render() {
    const { builds } = this.props;
    let content;

    if (builds.fetched) {
      if (builds.builds.length > 0) {
        content = (<ProBuildsList
          builds={builds.builds}
          onPressBuild={buildId => Actions.probuild_view({ buildId })}
          onLoadMore={this.handleOnLoadMore}
          isFetching={builds.isFetching}
        />);
      } else {
        content = (<View style={styles.container}>
          <Text style={styles.noBuildsMessage}>
            Actualmente no hay builds disponibles para este campeon, pronto estaran disponibles!.
          </Text>
        </View>);
      }
    } else if (builds.isFetching) {
      content = <LoadingScreen />;
    } else {
      content = (<View style={styles.container}>
        <ErrorScreen
          message={builds.errorMessage}
          onPressRetryButton={() => { this.props.fetchBuilds(); }}
          retryButton
        />
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
  builds: PropTypes.shape({
    isFetching: PropTypes.bool,
    fetched: PropTypes.bool,
    fetchError: PropTypes.bool,
    errorMessage: PropTypes.string,
    builds: PropTypes.arrayOf(PropTypes.shape({})),
    pagination: PropTypes.shape({
      page: PropTypes.number,
      pageSize: PropTypes.number,
      pageCount: PropTypes.number,
    }),
    championSelected: PropTypes.number,
  }),
};

function mapStateToProps(state) {
  const builds = state.proBuildsSearchView.get('builds').toJS();

  return {
    builds,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBuilds: (championId, page) => {
      dispatch(fetchBuilds(championId, page, PAGESIZE));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProBuildSearchView);
