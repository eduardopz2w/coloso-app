import React, { Component, PropTypes } from 'react';
import { StyleSheet, ListView, Dimensions } from 'react-native';
import ChampionMastery from './ChampionMastery';
import LoadingScreen from '../../../../components/LoadingScreen';
import ErrorScreen from '../../../../components/ErrorScreen';

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
    const { isFetching, masteries, fetched } = this.props.championsMastery;
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

    if (fetched) {
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
    } else if (isFetching) {
      return <LoadingScreen />;
    }

    return (<ErrorScreen
      message="Error al cargar los campeones"
      onPressRetryButton={this.props.onPressRetryButton}
      retryButton
    />);
  }
}

ChampionsMasteryView.propTypes = {
  championsMastery: PropTypes.shape({
    isFetching: PropTypes.bool.isRequied,
    fetched: PropTypes.bool.isRequied,
    fetchError: PropTypes.bool.isRequied,
    masteries: PropTypes.array.isRequied,
  }).isRequired,
  onPressRetryButton: PropTypes.func.isRequired,
};

export default ChampionsMasteryView;
