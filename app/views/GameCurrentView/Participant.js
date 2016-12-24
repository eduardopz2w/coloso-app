import React, { Component, PropTypes } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import _ from 'lodash';
import { MKButton } from 'react-native-material-kit';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import RankedMiniseries from '../../components/RankedMiniseries';
import colors from '../../utils/colors';

const styles = MediaQueryStyleSheet.create(
  {
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
      alignItems: 'center',
    },
    tierText: {
      textShadowColor: '#000',
      textShadowOffset: {
        width: 0.5,
        height: 0.5,
      },
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
      flex: 1,
      padding: 4,
      maxWidth: 90,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.primary,
    },

    roundedButtonText: {
      fontSize: 12,
      textAlign: 'center',
      color: colors.primary,
      fontWeight: 'bold',
    },
    dataText: {
      fontWeight: 'bold',
    },
  },
  {
    '@media (min-device-width: 600)': {
      championImage: {
        width: 80,
        height: 80,
      },
      spellImage: {
        width: 40,
        height: 40,
      },
      spellsCol: {
        marginLeft: -12,
      },
      tierImage: {
        width: 90,
        height: 90,
      },
      dataCol: {
        marginLeft: 40,
        marginRight: 20,
      },
      summonerName: {
        fontSize: 25,
        marginBottom: 4,
      },
      flexText: {
        fontSize: 20,
      },
      dataText: {
        fontSize: 20,
      },
      victoriesNumberText: {
        fontSize: 22,
      },
      defeatsNumberText: {
        fontSize: 22,
      },
      roundedButton: {
        maxWidth: 150,
      },
      roundedButtonText: {
        fontSize: 18,
      },
    },
  },
);

function getMiniseriesIconsSize() {
  if (Dimensions.get('window').width >= 600) {
    return 27;
  }

  return 20;
}

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
      color = colors.tiers.unranked;
    } else if (tier === 'SILVER') {
      color = colors.tiers.silver;
    } else if (tier === 'BRONZE') {
      color = colors.tiers.bronze;
    } else if (tier === 'GOLD') {
      color = colors.tiers.gold;
    } else if (tier === 'PLATINUM') {
      color = colors.tiers.platinum;
    } else if (tier === 'DIAMOND') {
      color = colors.tiers.diamond;
    } else if (tier === 'MASTER') {
      color = colors.tiers.master;
    } else if (tier === 'CHALLENGER') {
      color = colors.tiers.challenger;
    }

    return <Text style={[styles.tierText, { color }]}>{tier}</Text>;
  }

  render() {
    const { championId, spell1Id, spell2Id, summonerName, summonerId } = this.props.participant;
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
              Division: <Text style={styles.blackText}>{division}</Text>
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
              <Text style={styles.dataText}>Progreso: </Text>
              <RankedMiniseries
                progress={miniSeries.progress}
                iconsSize={getMiniseriesIconsSize()}
              />
            </View>
          ) : (
            <Text style={styles.flexText}>
              Puntos de Liga: <Text style={styles.blackText}>{leaguePoints || 0}</Text>
            </Text>
          )}
        </View>
        <View style={styles.buttonsRow}>
          <MKButton
            style={styles.roundedButton}
            onPress={() => this.props.onPressRunesButton(summonerId)}
          >
            <Text style={styles.roundedButtonText}>RUNAS</Text>
          </MKButton>

          <MKButton
            style={styles.roundedButton}
            onPress={() => this.props.onPressMasteriesButton(summonerId)}
          >
            <Text style={styles.roundedButtonText}>MAESTRIAS</Text>
          </MKButton>
        </View>
      </View>
    </View>);
  }
}

Participant.propTypes = {
  participant: PropTypes.shape({
    summonerId: PropTypes.number.isRequired,
    championId: PropTypes.number.isRequired,
    spell1Id: PropTypes.number.isRequired,
    spell2Id: PropTypes.number.isRequired,
    summonerName: PropTypes.string.isRequired,
    leagueEntries: PropTypes.arrayOf(PropTypes.shape({
      queue: PropTypes.string.isRequired,
    })),
  }).isRequired,
  onPressRunesButton: PropTypes.func.isRequired,
  onPressMasteriesButton: PropTypes.func.isRequired,
};

export default Participant;
