import React, { Component, PropTypes } from 'react';
import { StyleSheet, ListView } from 'react-native';
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
    if (isFetching) {
      return <LoadingScreen />;
    }

    return (<ListView
      style={styles.rootScrollView}
      pageSize={9}
      contentContainerStyle={styles.container}
      dataSource={this.championsMasteryDataSource.cloneWithRows(masteries)}
      renderRow={mastery => <ChampionMastery mastery={mastery} />}
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
