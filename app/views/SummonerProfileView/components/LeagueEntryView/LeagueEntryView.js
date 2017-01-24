import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, ListView, RefreshControl } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import LeagueEntry from './LeagueEntry';
import ErrorScreen from '../../../../components/ErrorScreen';
import colors from '../../../../utils/colors';
import { tracker } from '../../../../utils/analytics';

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  spinner: {
    width: 50,
    height: 50,
  },

  rootScrollView: {
    flex: 1,
  },

  rootScrollViewContainer: {
    paddingBottom: 16,
  },

  container: {
    flex: 1,
    padding: 16,
  },
});

class LeagueEntryView extends Component {
  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !Immutable.is(r1, r2),
    });
    this.getEntriesList = this.getEntriesList.bind(this);
  }

  componentDidMount() {
    tracker.trackScreenView('LeagueEntryView');
  }

  getEntriesList() {
    const entriesList = this.props.leagueEntry.getIn(['data', 'attributes', 'entries']);

    if (entriesList) {
      return entriesList;
    }

    return Immutable.List();
  }

  render() {
    const { leagueEntry } = this.props;

    if (leagueEntry.get('fetchError')) {
      return (<View style={styles.container}>
        <ErrorScreen
          message={leagueEntry.get('errorMessage')}
          onPressRetryButton={this.props.onPressRetryButton}
          retryButton
        />
      </View>);
    }

    return (<ListView
      style={styles.rootScrollView}
      dataSource={this.dataSource.cloneWithRows(this.getEntriesList().toArray())}
      refreshControl={
        <RefreshControl
          refreshing={leagueEntry.get('isFetching')}
          enabled={false}
          colors={[colors.spinnerColor]}
        />
      }
      renderRow={(entry, sectionId, rowId) => {
        let reverse = true;

        if (parseInt(rowId, 10) % 2 === 0) {
          reverse = false;
        }

        return <LeagueEntry key={rowId} leagueEntry={entry} reverse={reverse} />;
      }}
      enableEmptySections
    />);
  }
}

LeagueEntryView.propTypes = {
  leagueEntry: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool,
    fetchError: PropTypes.bool,
    fetched: PropTypes.bool,
    errorMessage: PropTypes.string,
  }),
  onPressRetryButton: PropTypes.func.isRequired,
};

export default LeagueEntryView;
