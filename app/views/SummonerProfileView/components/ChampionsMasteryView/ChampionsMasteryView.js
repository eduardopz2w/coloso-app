import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, ListView } from 'react-native';
import { MKSpinner } from 'react-native-material-kit';
import ChampionMastery from './ChampionMastery';

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
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  spinner: {
    width: 50,
    height: 50,
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
      return (<View style={styles.spinnerContainer}>
        <MKSpinner style={styles.spinner} />
      </View>);
    }

    return (<ListView
      style={styles.rootScrollView}
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
