import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, ListView } from 'react-native';
import ProBuildListRow from './ProBuildListRow';

const styles = StyleSheet.create({
  root: {},
  separator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

class ProBuildsList extends Component {
  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
  }
  render() {
    return (<View style={styles.root}>
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.props.builds)}
        renderRow={build => <ProBuildListRow build={build} />}
        renderSeparator={() => <View style={styles.separator} />}
      />
    </View>);
  }
}

ProBuildsList.propTypes = {
  builds: PropTypes.arrayOf(PropTypes.shape({})),
};

const builds = [];

for (let i = 0; i < 10; i++) {
  builds.push({
    spell1Id: 7,
    spell2Id: 4,
    championId: 202,
    highestAchievedSeasonTier: 'CHALLENGER',
    matchCreation: 1482952685012,
    matchId: 2565458545,
    profPlayerData: {
      name: 'Xpeke',
      imageUrl: 'http://solomid-resources.s3-website-us-east-1.amazonaws.com/probuilds/img/pros/170x240/hjarnan.png',
    },
    championData: {
      name: 'Jhin',
      title: 'El encantador de penes',
    },
    masteries: [
      {
        masteryId: 6111,
        rank: 5,
      },
      {
        masteryId: 6121,
        rank: 1,
      },
      {
        masteryId: 6131,
        rank: 5,
      },
      {
        masteryId: 6141,
        rank: 1,
      },
      {
        masteryId: 6151,
        rank: 5,
      },
      {
        masteryId: 6164,
        rank: 1,
      },
      {
        masteryId: 6312,
        rank: 5,
      },
      {
        masteryId: 6322,
        rank: 1,
      },
      {
        masteryId: 6331,
        rank: 5,
      },
      {
        masteryId: 6343,
        rank: 1,
      },
    ],
    stats: {
      winner: true,
      champLevel: 18,
      item0: 3508,
      item1: 3072,
      item2: 3111,
      item3: 3094,
      item4: 3102,
      item5: 3156,
      item6: 3363,
      kills: 15,
      deaths: 8,
      assists: 12,
      goldEarned: 21648,
      largestMultiKill: 3,
    },
    runes: [
      {
        runeId: 5253,
        count: 9,
      },
      {
        runeId: 5289,
        count: 9,
      },
      {
        runeId: 5317,
        count: 9,
      },
      {
        runeId: 5335,
        count: 3,
      },
    ],
  });
};

ProBuildsList.defaultProps = {
  builds
};

export default ProBuildsList;
