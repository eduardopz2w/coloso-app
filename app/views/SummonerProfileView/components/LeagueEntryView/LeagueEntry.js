import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import RankedMiniseries from '../../../../components/RankedMiniseries';
import riotConstantsParser from '../../../../utils/riotConstantsParser';

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
    paddingTop: 8,
    paddingBottom: 8,
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
    color: '#4CAF50',
    paddingLeft: 15,
  },
  defeatsNumberText: {
    fontSize: 24,
    color: '#D32F2F',
    paddingLeft: 15,
  },
  leaguePointsTitleText: {
    textAlign: 'center',
  },
  leaguePointsText: {
  },
  miniseriesRow: {
    flexDirection: 'row',
  },
  textBold: {
    fontWeight: 'bold',
  },
});

class LeagueEntry extends Component {
  constructor(props) {
    super(props);

    this.renderTierImage = this.renderTierImage.bind(this);
    this.getTierTextStyle = this.getTierTextStyle.bind(this);
  }


  getTierTextStyle() {
    // TODO add color
    const { tier } = this.props.leagueEntry;
    const tierTextStyle = {};

    if (tier === 'UNRANKED') {
      tierTextStyle.color = '#000';
    } else if (tier === 'SILVER') {
      tierTextStyle.color = '#545556';
    } else if (tier === 'BRONZE') {
      tierTextStyle.color = '#8e6f00';
    } else if (tier === 'GOLD') {
      tierTextStyle.color = '#f9d13e';
    } else if (tier === 'PLATINUM') {
      tierTextStyle.color = '#0c819e';
    } else if (tier === 'DIAMOND') {
      tierTextStyle.color = '#009965';
    } else if (tier === 'MASTER') {
      tierTextStyle.color = '#f9d13e';
    } else if (tier === 'CHALLENGER') {
      tierTextStyle.color = '#f9d13e';
    }

    return tierTextStyle;
  }

  renderTierImage() {
    return <Image style={styles.tierImage} source={{ uri: this.props.leagueEntry.tier }} />;
  }

  render() {
    const { name: leagueName, queue, tier } = this.props.leagueEntry;
    let entries = {};

    if (this.props.leagueEntry.entries) {
      entries = this.props.leagueEntry.entries[0];
    }

    return (<View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}><Text style={styles.textBold}>{riotConstantsParser(queue)}:</Text> {leagueName || 'Unranked'}</Text>
      </View>

      <View style={styles.entryContainer}>
        <View>
          {this.renderTierImage()}
        </View>

        <View style={styles.entryDataContainer}>
          {entries.playerOrTeamName &&
            <Text style={styles.nameText}>
              <Text style={styles.textBold}>Name: </Text>
              {entries.playerOrTeamName}
            </Text>
          }

          <View style={styles.tierAndDivisionRow}>
            <Text style={styles.tierText}>
              <Text style={styles.textBold}>Tier: </Text>
              <Text style={[this.getTierTextStyle(), styles.textBold]}>{tier}</Text>
            </Text>
            {entries.division &&
              <Text style={styles.divisionText}>
                <Text style={styles.textBold}>Division: </Text>
                {entries.division}
              </Text>
            }
          </View>

          <View style={styles.victoriesAndDefeatsRow}>
            <Text style={styles.victoriesText}>
              <Text style={[styles.victoriesTitleText, styles.textBold]}>V:</Text>
              <Text style={styles.victoriesNumberText}>{entries.wins || '0'}</Text>
            </Text>
            <Text style={styles.defeatsText}>
              <Text style={[styles.defeatsTitleText, styles.textBold]}>D:</Text>
              <Text style={styles.defeatsNumberText}>{entries.losses || '0'}</Text>
            </Text>
          </View>

          <View>
            {entries.miniSeries ? (
              <View style={styles.miniseriesRow}>
                <Text style={styles.textBold}>Progress:</Text>
                <RankedMiniseries progress={entries.miniSeries.progress} style={{ flex: 1 }} />
              </View>
            ) : (
              <Text style={styles.leaguePointsTitleText}>
                League Points: <Text style={styles.leaguePointsText}>{entries.leaguePoints || '0'}</Text>
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>);
  }
}

LeagueEntry.propTypes = {
  leagueEntry: PropTypes.shape({
    tier: PropTypes.string,
    name: PropTypes.string,
    queue: PropTypes.string,
    entries: PropTypes.array,
  }),
};

export default LeagueEntry;
