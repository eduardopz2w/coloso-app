import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import RankedMiniseries from '../../../../components/RankedMiniseries';
import riotConstantsParser from '../../../../utils/riotConstantsParser';
import colors from '../../../../utils/colors';
import styleUtils from '../../../../utils/styleUtils';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 14,
  },
  titleContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: colors.titlesBackground,
  },
  tierImage: {
    width: 70,
    height: 70,
    marginRight: 8,
  },
  entryContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 16,
    flexDirection: 'row',
  },
  victoriesNumberText: {
    fontSize: 20,
    color: colors.victory,
    fontWeight: 'bold',
  },
  defeatsNumberText: {
    fontSize: 20,
    color: colors.defeat,
    fontWeight: 'bold',
  },
  leaguePointsTitleText: {
    textAlign: 'center',
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

    return {
      color: colors.tiers[tier.toLowerCase()],
      textShadowOffset: {
        width: 1,
        height: 1,
      },
    };
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
        <Text style={styles.title}><Text style={styleUtils.boldText}>{riotConstantsParser(queue)}:</Text> {leagueName || 'Unranked'}</Text>
      </View>

      <View style={styles.entryContainer}>
        <View>
          {this.renderTierImage()}
        </View>

        <View style={styleUtils.flexOne}>
          {entries.playerOrTeamName &&
            <Text style={[styleUtils.centerText, styles.nameText]}>
              <Text style={styleUtils.boldText}>Nombre: </Text>
              {entries.playerOrTeamName}
            </Text>
          }

          <View style={styleUtils.flexRow}>
            <Text style={[styleUtils.flexOne, styleUtils.centerText]}>
              <Text style={styleUtils.boldText}>Tier: </Text>
              <Text style={[this.getTierTextStyle(), styleUtils.boldText]}>{tier}</Text>
            </Text>
            {entries.division &&
              <Text style={[styleUtils.flexOne, styleUtils.centerText]}>
                <Text style={styleUtils.boldText}>Division: </Text>
                {entries.division}
              </Text>
            }
          </View>

          <View style={styleUtils.flexRow}>
            <Text style={[styleUtils.flexOne, styleUtils.centerText]}>
              <Text style={[styles.victoriesTitleText, styleUtils.boldText]}>Victorias: </Text>
              <Text style={styles.victoriesNumberText}>{entries.wins}</Text>
            </Text>
            <Text style={[styleUtils.flexOne, styleUtils.centerText]}>
              <Text style={[styles.defeatsTitleText, styleUtils.boldText]}>Derrotas: </Text>
              <Text style={styles.defeatsNumberText}>{entries.losses}</Text>
            </Text>
          </View>

          <View>
            {entries.miniSeries ? (
              <View style={styleUtils.flexRow}>
                <Text style={styleUtils.boldText}>Progreso: </Text>
                <RankedMiniseries progress={entries.miniSeries.progress} style={{ flex: 1 }} />
              </View>
            ) : (
              <Text style={styles.leaguePointsTitleText}>
                <Text style={styleUtils.boldText}>League Points: </Text>
                <Text style={styles.leaguePointsText}> {entries.leaguePoints}</Text>
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
