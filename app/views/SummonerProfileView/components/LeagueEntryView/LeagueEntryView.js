import React, { PureComponent, PropTypes } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import LeagueEntry from './LeagueEntry';
import LoadingScreen from '../../../../components/LoadingScreen';
import ErrorScreen from '../../../../components/ErrorScreen';

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
  render() {
    const { isFetching, fetchError, fetched, entries } = this.props.leagueEntry;

    if (isFetching || !fetched) {
      return <LoadingScreen />;
    }

    if (fetchError) {
      return (<ErrorScreen
        message="Error al cargar la informacion"
        onPressRetryButton={this.props.onPressRetryButton}
        retryButton
      />);
    }

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
  }
}

LeagueEntryView.propTypes = {
  leagueEntry: PropTypes.shape({
    isFetching: PropTypes.bool,
    fetchError: PropTypes.bool,
    fetched: PropTypes.bool,
    entries: PropTypes.array,
  }),
  onPressRetryButton: PropTypes.func.isRequired,
};

export default LeagueEntryView;
