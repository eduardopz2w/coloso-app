import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 14,
  },
  titleContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#BBB',
  },
  tierImage: {
    width: 75,
    height: 75,
  },
  entryContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
  },
  nameText: {
    textAlign: 'center',
  },
  entryDataContainer: {
    flex: 1,
  },
  tierAndDivisionRow: {
    flexDirection: 'row',
  },
  tierText: {
    flex: 1,
    textAlign: 'center',
  },
  divisionText: {
    flex: 1,
    textAlign: 'center',
  },
  victoriesAndDefeatsRow: {
    flexDirection: 'row',
  },
  victoriesText: {
    flex: 1,
    textAlign: 'center',
  },
  defeatsText: {
    flex: 1,
    textAlign: 'center',
  },
  victoriesNumberText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    paddingLeft: 15,
  },
  defeatsNumberText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D32F2F',
    paddingLeft: 15,
  },
  leaguePointsTitleText: {
    textAlign: 'center',
  },
  leaguePointsText: {
    fontWeight: 'bold',
  },
});

class LeagueEntry extends Component {
  constructor(props) {
    super(props);

    this.renderTierImage = this.renderTierImage.bind(this);
    this.getTierTextStyle = this.getTierTextStyle.bind(this);
  }

  render() {
    const { name: leagueName, queue, tier } = this.props.leagueEntry;
    let entries = {};

    if (this.props.leagueEntry.entries) {
      entries = this.props.leagueEntry.entries[0];
    }

    return (<View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{queue}: {leagueName || 'Unranked'}</Text>
      </View>

      <View style={styles.entryContainer}>
        <View>
          {this.renderTierImage()}
        </View>

        <View style={styles.entryDataContainer}>
          {entries.playerOrTeamName &&
            <Text style={styles.nameText}>
              <Text style={{ fontWeight: 'bold' }}>Name: </Text>
              {entries.playerOrTeamName}
            </Text>
          }

          <View style={styles.tierAndDivisionRow}>
            <Text style={styles.tierText}>
              <Text style={{ fontWeight: 'bold' }}>Tier: </Text>
              <Text style={this.getTierTextStyle()}>{tier}</Text>
            </Text>
            {entries.division &&
              <Text style={styles.divisionText}>
                <Text style={{ fontWeight: 'bold' }}>Division: </Text>
                {entries.division}
              </Text>
            }
          </View>

          <View style={styles.victoriesAndDefeatsRow}>
            <Text style={styles.victoriesText}>
              <Text style={styles.victoriesTitleText}>V:</Text>
              <Text style={styles.victoriesNumberText}>{entries.wins || '0'}</Text>
            </Text>
            <Text style={styles.defeatsText}>
              <Text style={styles.defeatsTitleText}>D:</Text>
              <Text style={styles.defeatsNumberText}>{entries.losses || '0'}</Text>
            </Text>
          </View>

          <View>
            <Text style={styles.leaguePointsTitleText}>
              League Points: <Text style={styles.leaguePointsText}>{entries.leaguePoints || '0'}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>);
  }

  renderTierImage() {
    return <Image style={styles.tierImage} source={{ uri: this.props.leagueEntry.tier }} />;
  }

  getTierTextStyle() {
    // TODO add color
    const { tier } = this.props.leagueEntry;
    const tierTextStyle = {};

    if (tier === 'UNRANKED') {
      tierTextStyle.color = '#000';
    }

    return tierTextStyle;
  }
}

LeagueEntry.propTypes = {
  leagueEntry: PropTypes.object,
};

export default LeagueEntry;
