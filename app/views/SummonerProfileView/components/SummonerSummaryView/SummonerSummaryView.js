import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, ListView } from 'react-native';
import _ from 'lodash';
import LoadingScreen from '../../../../components/LoadingScreen';
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

    return (<View style={styles.root}>
      <Text>Error al cargar</Text>
    </View>);
  }
}

SummonerSumaryView.propTypes = {
  summary: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    playerStatSummaries: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

export default SummonerSumaryView;
