import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, ListView, RefreshControl } from 'react-native';
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
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
  }
  componentDidMount() {
    tracker.trackScreenView('LeagueEntryView');
  }

  render() {
    const { isFetching, fetchError, entries } = this.props.leagueEntry;

    if (fetchError) {
      return (<View style={styles.container}>
        <ErrorScreen
          message={this.props.leagueEntry.errorMessage}
          onPressRetryButton={this.props.onPressRetryButton}
          retryButton
        />
      </View>);
    }

    return (<ListView
      style={styles.rootScrollView}
      dataSource={this.dataSource.cloneWithRows(entries)}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
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
  leagueEntry: PropTypes.shape({
    isFetching: PropTypes.bool,
    fetchError: PropTypes.bool,
    fetched: PropTypes.bool,
    entries: PropTypes.array,
    errorMessage: PropTypes.string,
  }),
  onPressRetryButton: PropTypes.func.isRequired,
};

export default LeagueEntryView;
