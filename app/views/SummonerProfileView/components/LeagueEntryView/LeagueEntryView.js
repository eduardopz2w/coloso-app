import React, { Component, PropTypes } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { MKSpinner } from 'react-native-material-kit';
import LeagueEntry from './LeagueEntry';

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

class LeagueEntryView extends Component {
  render() {
    const { isFetching, entries } = this.props.leagueEntry;

    if (isFetching) {
      return (<View style={styles.spinnerContainer}>
        <MKSpinner style={styles.spinner} />
      </View>);
    }

    return (<ScrollView
      style={styles.roowScrollView}
      contentContainerStyle={styles.rootScrollViewContainer}
    >
      {entries.map((leagueEntry, key) => <LeagueEntry key={key} leagueEntry={leagueEntry} />)}
    </ScrollView>);
  }
}

LeagueEntryView.propTypes = {
  leagueEntry: PropTypes.shape({
    isFetching: PropTypes.bool,
    entries: PropTypes.array,
  }),
};

export default LeagueEntryView;
