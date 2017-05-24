import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, ListView } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';

import LeagueEntry from './LeagueEntry';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import ErrorScreen from '../../../../components/ErrorScreen';
import { tracker } from '../../../../utils';

const styles = StyleSheet.create({
  rootScrollView: {
    flex: 1,
  },
});

class LeagueEntryView extends PureComponent {
  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !Immutable.is(r1, r2),
    });
    this.getEntriesList = this.getEntriesList.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    tracker.trackScreenView('LeagueEntryView');
  }

  shouldComponentUpdate(nextProps) {
    return !Immutable.is(nextProps.leagueEntries, this.props.leagueEntries);
  }

  getEntriesList() {
    const entriesList = this.props.leagueEntries.getIn(['data', 'entries']);

    if (entriesList && entriesList.size > 0) {
      return entriesList;
    }

    if (this.props.leagueEntries.get('isFetching')) {
      return Immutable.List([]);
    }

    return Immutable.fromJS([
      {
        queue: 'RANKED_SOLO_5x5',
        tier: 'UNRANKED',
        entries: [{
          division: 'N/A',
          wins: 0,
          losses: 0,
        }],
      },
    ]);
  }

  renderContent() {
    return (<ListView
      style={styles.rootScrollView}
      dataSource={this.dataSource.cloneWithRows(this.getEntriesList().toArray())}
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

  render() {
    const leagueEntries = this.props.leagueEntries;

    if (leagueEntries.get('isFetching')) {
      return (<View style={{ padding: 16, alignItems: 'center' }}>
        <LoadingIndicator />
      </View>);
    } else if (leagueEntries.get('fetchError')) {
      return (<ErrorScreen
        message={leagueEntries.get('errorMessage')}
        onPressRetryButton={this.props.onPressRetryButton}
      />);
    } else if (leagueEntries.get('fetched')) {
      return this.renderContent();
    }

    return null;
  }
}

LeagueEntryView.propTypes = {
  leagueEntries: ImmutablePropTypes.mapContains({
    fetched: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
  }),
  onPressRetryButton: PropTypes.func.isRequired,
};

export default LeagueEntryView;
