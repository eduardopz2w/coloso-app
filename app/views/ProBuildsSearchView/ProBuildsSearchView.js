import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Toolbar from './components/Toolbar';
import ProBuildSearchActions from '../../redux/actions/ProBuildsSearchActions';
import LoadingScreen from '../../components/LoadingScreen';
import ProBuildsList from '../../components/ProBuildsList';
import ChampionSelector from '../../components/ChampionSelector';
import ErrorScreen from '../../components/ErrorScreen';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  noBuildsMessage: {
    padding: 16,
  },
});

class ProBuildSearchView extends Component {
  constructor(props) {
    super(props);

    this.handleOnChangeChampionSelected = this.handleOnChangeChampionSelected.bind(this);
  }

  componentWillMount() {
    this.props.fetchBuilds();
  }

  handleOnChangeChampionSelected(championId) {
    this.props.fetchBuilds(championId);
  }

  render() {
    const { builds } = this.props;
    let content;

    if (builds.fetched) {
      if (builds.builds.length > 0) {
        content = (<ProBuildsList
          builds={builds.builds}
          onPressBuild={buildId => Actions.probuild_view({ buildId })}
        />);
      } else {
        content = (<Text style={styles.noBuildsMessage}>
          Actualmente no hay builds para este campeon, pronto estaran disponibles
        </Text>);
      }
    } else if (builds.isFetching) {
      content = <LoadingScreen />;
    } else {
      content = (<ErrorScreen
        message={builds.errorMessage}
        onPressRetryButton={() => { this.props.fetchBuilds(); }}
        retryButton
      />);
    }

    return (<View style={styles.root}>
      <Toolbar
        onPressMenuButton={() => { Actions.refresh({ key: 'drawer', open: true }); }}
      />
      <ChampionSelector
        style={{ paddingHorizontal: 16, backgroundColor: 'rgba(0,0,0,0.1)' }}
        onChangeSelected={this.handleOnChangeChampionSelected}
      />
      <View style={styles.container}>
        {content}
      </View>
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
    fetchBuilds: (championId) => {
      dispatch(ProBuildSearchActions.fetchBuilds(championId));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProBuildSearchView);
