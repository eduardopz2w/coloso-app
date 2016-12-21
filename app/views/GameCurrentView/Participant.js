import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import _ from 'lodash';
import RankedMiniseries from '../../components/RankedMiniseries';
import { MKButton } from 'react-native-material-kit';

const styles = StyleSheet.create({
  root: {
    padding: 8,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  championImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'black',
    zIndex: 1,
  },
  spellImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
  spellsCol: {
    marginLeft: -10,
  },
  flexRow: {
    flexDirection: 'row',
  },
  dataCol: {
    flex: 1,
    marginLeft: 16,
  },
  summonerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  tierImage: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginTop: 10,
  },
  flexOne: {
    flex: 1,
  },
  flexText: {
    flex: 1,
    fontWeight: 'bold',
  },
  victoriesNumberText: {
    fontSize: 16,
    color: '#4CAF50',
    paddingLeft: 15,
  },
  defeatsNumberText: {
    fontSize: 16,
    color: '#D32F2F',
    paddingLeft: 15,
  },
  blackText: {
    color: 'black',
  },

  buttonsRow: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },

  roundedButton: {
    marginTop: 12,
    width: 100,
    padding: 4,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.2)',
  },

  roundedButtonText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

class Participant extends Component {
  constructor(props) {
    super(props);

    this.renderTierImage = this.renderTierImage.bind(this);
    this.getRankedSoloEntry = this.getRankedSoloEntry.bind(this);
  }

  getRankedSoloEntry() {
    return _.find(this.props.participant.leagueEntries, { queue: 'RANKED_SOLO_5x5' });
  }

  renderTierImage() {
    const leagueEntry = this.getRankedSoloEntry();

    return <Image style={styles.tierImage} source={{ uri: leagueEntry.tier }} />;
  }

  renderTierText(tier) {
    let color;

    if (tier === 'UNRANKED') {
      color = '#000';
    } else if (tier === 'SILVER') {
      color = '#545556';
    } else if (tier === 'BRONZE') {
      color = '#8e6f00';
    } else if (tier === 'GOLD') {
      color = '#f9d13e';
    } else if (tier === 'PLATINUM') {
      color = '#0c819e';
    } else if (tier === 'DIAMOND') {
      color = '#009965';
    } else if (tier === 'MASTER') {
      color = '#f9d13e';
    } else if (tier === 'CHALLENGER') {
      color = '#f9d13e';
    }

    return <Text style={[styles.tierText, { color }]}>{tier}</Text>;
  }

  render() {
    const { championId, spell1Id, spell2Id, summonerName } = this.props.participant;
    const rankedSoloEntry = this.getRankedSoloEntry();
    const { division, wins, losses, leaguePoints, miniSeries } = rankedSoloEntry.entries[0];

    return (<View style={styles.root}>
      <View>
        <View style={styles.flexRow}>
          <Image style={styles.championImage} source={{ uri: `champion_square_${championId}` }} />
          <View style={styles.spellsCol}>
            <Image style={styles.spellImage} source={{ uri: `summoner_spell_${spell1Id}` }} />
            <Image style={styles.spellImage} source={{ uri: `summoner_spell_${spell2Id}` }} />
          </View>
        </View>

        {this.renderTierImage()}
      </View>
      <View style={styles.dataCol}>
        <Text style={styles.summonerName}>{summonerName}</Text>
        <View style={styles.flexRow}>
          <Text style={styles.flexText}>Tier: {this.renderTierText(rankedSoloEntry.tier)}</Text>
          {division &&
            <Text style={styles.flexText}>
              Division:<Text style={styles.blackText}>{division}</Text>
            </Text>
          }
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.flexText}>
            Victorias: <Text style={styles.victoriesNumberText}>{wins}</Text>
          </Text>
          <Text style={styles.flexText}>
            Derrotas: <Text style={styles.defeatsNumberText}>{losses}</Text>
          </Text>
        </View>
        <View style={styles.flexRow}>
          {miniSeries ? (
            <View style={styles.flexRow}>
              <Text style={{ fontWeight: 'bold' }}>Progreso: </Text>
              <RankedMiniseries progress={miniSeries.progress} />
            </View>
          ) : (
            <Text style={styles.flexText}>
              Puntos de Liga: <Text style={styles.blackText}>{leaguePoints || 0}</Text>
            </Text>
          )}
        </View>
        <View style={styles.buttonsRow}>
          <MKButton style={styles.roundedButton}>
            <Text style={styles.roundedButtonText}>RUNAS</Text>
          </MKButton>

          <MKButton style={styles.roundedButton}>
            <Text style={styles.roundedButtonText}>MAESTRIAS</Text>
          </MKButton>
        </View>
      </View>
    </View>);
  }
}

Participant.propTypes = {
  participant: PropTypes.shape({
    championId: PropTypes.number.isRequired,
    spell1Id: PropTypes.number.isRequired,
    spell2Id: PropTypes.number.isRequired,
    summonerName: PropTypes.string.isRequired,
    leagueEntries: PropTypes.arrayOf(PropTypes.shape({
      queue: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

export default Participant;
