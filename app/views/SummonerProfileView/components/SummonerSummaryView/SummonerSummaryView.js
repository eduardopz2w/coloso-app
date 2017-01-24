import React, { Component, PropTypes } from 'react';
import { StyleSheet, ListView, View } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import ErrorScreen from '../../../../components/ErrorScreen';
import SeasonSelector from '../../../../components/SeasonSelector';
import Summary from './Summary';

const styles = StyleSheet.create({
  root: {},
  summaryContainer: {
    marginTop: 8,
  },
  headerSelector: {
    paddingLeft: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  container: {
    flex: 1,
    padding: 16,
  },
});

function filterEmpty(summaries) {
  return summaries.filter((summary) => {
    if (summary.get('wins') >= 0 || summary.get('losses') >= 0) {
      return true;
    }

    return false;
  });
}

class SummonerSumaryView extends Component {
  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !Immutable.is(r1, r2),
    });
  }
  render() {
    const summonerSummary = this.props.summary;

    if (summonerSummary.get('fetched')) {
      const summaries = filterEmpty(summonerSummary.getIn(['data', 'attributes', 'playerStatSummaries']));

      return (
        <View>
          <View style={styles.headerSelector}>
            <SeasonSelector
              initialValue={summonerSummary.get('season')}
              onChangeSelected={this.props.onChangeSeason}
              disabled={summonerSummary.get('isFetching')}
            />
          </View>
          <View style={styles.summaryContainer}>
            <ListView
              dataSource={this.dataSource.cloneWithRows(summaries.toArray())}
              renderRow={(summary, sectionId, rowId) => <Summary key={rowId} summary={summary} />}
            />
          </View>
        </View>
      );
    } else if (summonerSummary.get('isFetching')) {
      return (<View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 16 }}>
        <LoadingIndicator />
      </View>);
    }

    return (<View style={styles.container}>
      <ErrorScreen
        message={summonerSummary.get('errorMessage')}
        onPressRetryButton={this.props.onPressRetryButton}
        retryButton
      />
    </View>);
  }
}

SummonerSumaryView.propTypes = {
  summary: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    playerStatSummaries: ImmutablePropTypes.list,
    errorMessage: PropTypes.string,
  }),
  onPressRetryButton: PropTypes.func.isRequired,
  onChangeSeason: PropTypes.func.isRequired,
};

export default SummonerSumaryView;
