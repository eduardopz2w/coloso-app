import React, { Component, PropTypes } from 'react';
import { View, Image, Text, Dimensions, TouchableNativeFeedback } from 'react-native';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import I18n from 'i18n-js';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import { MKButton } from 'react-native-material-kit';

import RankedMiniseries from '../../../components/RankedMiniseries';
import colors from '../../../utils/colors';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      padding: 8,
      flexDirection: 'row',
      borderLeftWidth: 6,
      borderColor: colors.blueTeam,
    },
    redTeam: {
      borderColor: colors.redTeam,
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
      fontSize: 15,
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
    },

    roundedButtonText: {
      fontSize: 12,
      textAlign: 'center',
      color: colors.primary,
      fontWeight: 'bold',
    },
    profileButton: {
      height: 22,
      paddingLeft: 8,
      paddingRight: 8,
      borderRadius: 5,
      backgroundColor: colors.primary,
      marginLeft: 8,
      justifyContent: 'center',
    },
    profileButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
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
      profileButton: {
        height: 30,
      },
      profileButtonText: {
        fontSize: 16,
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

  shouldComponentUpdate(props) {
    if (Immutable.is(this.props.participant, props.participant)) {
      return false;
    }

    return true;
  }

  getRankedSoloEntry() {
    const entryFound = this.props.participant.getIn(['leagueEntry', 'entries']).find((entry) => {
      const queue = entry.get('queue');

      if (queue === 'RANKED_SOLO_5x5') {
        return true;
      }

      return false;
    });

    if (entryFound) {
      return entryFound;
    }

    return Immutable.fromJS({
      name: 'Unranked',
      tier: 'UNRANKED',
      queue: 'RANKED_SOLO_5x5',
      entries: [
        {
          wins: 0,
          losses: 0,
          division: 'N/A',
          leaguePoints: 0,
        },
      ],
    });
  }

  renderTierImage() {
    const leagueEntry = this.getRankedSoloEntry();

    return <Image style={styles.tierImage} source={{ uri: leagueEntry.get('tier') }} />;
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
    const { participant } = this.props;
    const rankedSoloEntry = this.getRankedSoloEntry();

    return (<TouchableNativeFeedback
      onPress={() => this.props.onPressProfileButton(participant.get('summonerUrid'))}
    >
      <View style={[styles.root, participant.get('teamId') === 200 && styles.redTeam]}>
        <View>
          <View style={styles.flexRow}>
            <Image style={styles.championImage} source={{ uri: `champion_square_${participant.get('championId')}` }} />
            <View style={styles.spellsCol}>
              <Image style={styles.spellImage} source={{ uri: `summoner_spell_${participant.get('spell1Id')}` }} />
              <Image style={styles.spellImage} source={{ uri: `summoner_spell_${participant.get('spell2Id')}` }} />
            </View>
          </View>

          {this.renderTierImage()}
        </View>
        <View style={styles.dataCol}>
          <View style={styles.flexRow}>
            <Text style={styles.summonerName}>{participant.get('summonerName')}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.flexText}>{I18n.t('tier')}: {this.renderTierText(rankedSoloEntry.get('tier'))}</Text>
            {rankedSoloEntry.getIn(['entries', 0, 'division']) &&
              <Text style={styles.flexText}>
                {I18n.t('division')}: <Text style={styles.blackText}>{rankedSoloEntry.getIn(['entries', 0, 'division'])}</Text>
              </Text>
            }
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.flexText}>
              {I18n.t('victories')}: <Text style={styles.victoriesNumberText}>{rankedSoloEntry.getIn(['entries', 0, 'wins'])}</Text>
            </Text>
            <Text style={styles.flexText}>
              {I18n.t('defeats')}: <Text style={styles.defeatsNumberText}>{rankedSoloEntry.getIn(['entries', 0, 'losses'])}</Text>
            </Text>
          </View>
          <View style={styles.flexRow}>
            {rankedSoloEntry.getIn(['entries', 0, 'miniSeries']) ? (
              <View style={styles.flexRow}>
                <Text style={styles.dataText}>{I18n.t('progress')}: </Text>
                <View style={{ flex: 1 }}>
                  <RankedMiniseries
                    progress={rankedSoloEntry.getIn(['entries', 0, 'miniSeries', 'progress'])}
                    iconsSize={getMiniseriesIconsSize()}
                  />
                </View>
              </View>
            ) : (
              <Text style={styles.flexText}>
                {I18n.t('league_points')}: <Text style={styles.blackText}>{rankedSoloEntry.getIn(['entries', 0, 'leaguePoints']) || 0}</Text>
              </Text>
            )}
          </View>
          <View style={styles.buttonsRow}>
            <MKButton
              style={styles.roundedButton}
              rippleColor="rgba(0,0,0,0.1)"
              onPress={() => this.props.onPressRunesButton(participant.get('summonerUrid'))}
            >
              <Text style={styles.roundedButtonText}>{I18n.t('runes').toUpperCase()}</Text>
            </MKButton>

            <MKButton
              style={styles.roundedButton}
              rippleColor="rgba(0,0,0,0.1)"
              onPress={() => this.props.onPressMasteriesButton(participant.get('summonerUrid'))}
            >
              <Text style={styles.roundedButtonText}>{I18n.t('masteries').toUpperCase()}</Text>
            </MKButton>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>);
  }
}

Participant.propTypes = {
  participant: ImmutablePropTypes.map,
  onPressRunesButton: PropTypes.func,
  onPressMasteriesButton: PropTypes.func,
  onPressProfileButton: PropTypes.func,
};

export default Participant;
