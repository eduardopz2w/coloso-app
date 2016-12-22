import React, { Component, PropTypes } from 'react';
import { StyleSheet, ListView, Dimensions } from 'react-native';
import ChampionMastery from './ChampionMastery';
import LoadingScreen from '../../../../components/LoadingScreen';

const styles = StyleSheet.create({
  roowScrollView: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
  },
});

class ChampionsMasteryView extends Component {
  constructor(props) {
    super(props);

    this.championsMasteryDataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
  }
  render() {
    const { isFetching, masteries } = this.props.championsMastery;
    let championImageSize;
    let progressWidth;
    let pageSize;

    if (Dimensions.get('window').width <= 500) {
      championImageSize = 70;
      progressWidth = 5;
      pageSize = 9;
    } else {
      championImageSize = 100;
      progressWidth = 7;
      pageSize = 16;
    }

    if (isFetching) {
      return <LoadingScreen />;
    }

    return (<ListView
      style={styles.rootScrollView}
      pageSize={pageSize}
      contentContainerStyle={styles.container}
      dataSource={this.championsMasteryDataSource.cloneWithRows(masteries)}
      renderRow={mastery => <ChampionMastery
        mastery={mastery}
        championImageSize={championImageSize}
        progressWidth={progressWidth}
      />}
    />);
  }
}

ChampionsMasteryView.propTypes = {
  championsMastery: PropTypes.shape({
    isFetching: PropTypes.bool,
    fetched: PropTypes.bool,
    masteries: PropTypes.array,
  }),
};

export default ChampionsMasteryView;
