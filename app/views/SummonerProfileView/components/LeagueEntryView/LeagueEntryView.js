import React, { PureComponent, PropTypes } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import LeagueEntry from './LeagueEntry';
import LoadingScreen from '../../../../components/LoadingScreen';
import ErrorScreen from '../../../../components/ErrorScreen';
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
});

class LeagueEntryView extends PureComponent {
  componentDidMount() {
    tracker.trackScreenView('LeagueEntryView');
  }

  render() {
    const { isFetching, fetched, entries } = this.props.leagueEntry;

    if (fetched) {
      return (<ScrollView
        style={styles.roowScrollView}
        contentContainerStyle={styles.rootScrollViewContainer}
      >
        {entries.map((leagueEntry, key) => {
          let reverse = true;

          if (key % 2 === 0) {
            reverse = false;
          }

          return <LeagueEntry key={key} leagueEntry={leagueEntry} reverse={reverse} />;
        })}
      </ScrollView>);
    } else if (isFetching) {
      return <LoadingScreen />;
    }

    return (<ErrorScreen
      message={this.props.leagueEntry.errorMessage}
      onPressRetryButton={this.props.onPressRetryButton}
      retryButton
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
