import React, { Component, PropTypes } from 'react';
import { StyleSheet, ListView } from 'react-native';
import _ from 'lodash';
import LoadingScreen from '../../../../components/LoadingScreen';
import ErrorScreen from '../../../../components/ErrorScreen';
import Summary from './Summary';

const styles = StyleSheet.create({
  root: {},
  container: {
    padding: 16,
  },
});

function filterEmpty(summaries) {
  return _.filter(summaries, (summary) => {
    if (_.isNumber(summary.wins) || _.isNumber(summary.losses)) {
      return true;
    }

    return false;
  });
}

class SummonerSumaryView extends Component {
  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
  }
  render() {
    if (this.props.summary.fetched) {
      const summaries = filterEmpty(this.props.summary.playerStatSummaries);

      return (
        <ListView
          dataSource={this.dataSource.cloneWithRows(summaries)}
          renderRow={summary => <Summary summary={summary} />}
        />
      );
    } else if (this.props.summary.isFetching) {
      return <LoadingScreen />;
    }

    return (<ErrorScreen
      message="Error al cargar las estadisticas"
      onPressRetryButton={this.props.onPressRetryButton}
      retryButton
    />);
  }
}

SummonerSumaryView.propTypes = {
  summary: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    playerStatSummaries: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  onPressRetryButton: PropTypes.func.isRequired,
};

export default SummonerSumaryView;
