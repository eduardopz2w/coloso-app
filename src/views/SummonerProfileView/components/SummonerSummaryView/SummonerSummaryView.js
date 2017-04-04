import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, ListView, View } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';

import LoadingIndicator from '../../../../components/LoadingIndicator';
import ErrorScreen from '../../../../components/ErrorScreen';
import SeasonSelector from '../../../../components/SeasonSelector';
import Summary from './Summary';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  listView: {
    flex: 1,
  },
  summaryContainer: {
    flex: 1,
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

class SummonerSumaryView extends PureComponent {
  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !Immutable.is(r1, r2),
    });

    this.renderContent = this.renderContent.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !Immutable.is(nextProps.summary, this.props.summary);
  }

  renderContent() {
    const summary = this.props.summary;
    const summaries = filterEmpty(summary.getIn(['data', 'playerStatSummaries']));

    return (<View style={styles.root}>
      <View style={styles.headerSelector}>
        <SeasonSelector
          initialValue={summary.get('season')}
          onChangeSelected={this.props.onChangeSeason}
          disabled={summary.get('isFetching')}
        />
      </View>
      <View style={styles.summaryContainer}>
        <ListView
          style={styles.listView}
          dataSource={this.dataSource.cloneWithRows(summaries.toArray())}
          renderRow={(summaryRow, sectionId, rowId) => <Summary key={rowId} summary={summaryRow} />}
        />
      </View>
    </View>);
  }
  render() {
    const summary = this.props.summary;

    if (summary.get('isFetching')) {
      return (<View style={{ padding: 16, alignItems: 'center' }}>
        <LoadingIndicator />
      </View>);
    } else if (summary.get('fetchError')) {
      return (<ErrorScreen
        message={summary.get('errorMessage')}
        onPressRetryButton={this.props.onPressRetryButton}
      />);
    } else if (summary.get('fetched')) {
      return this.renderContent();
    }

    return null;
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
