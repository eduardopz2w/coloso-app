import React, { Component, PropTypes } from 'react';
import { View, Image, Text, Dimensions, TouchableNativeFeedback } from 'react-native';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import I18n from 'i18n-js';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import RankedMiniseries from '../../../components/RankedMiniseries';
import colors from '../../../utils/colors';
import styleUtils from '../../../utils/styleUtils';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      borderLeftWidth: 6,
      borderColor: colors.blueTeam,
    },
    container: {
      padding: 8,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
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
      fontSize: 16.5,
      fontWeight: 'bold',
      color: 'black',
    },
    tierImage: {
      width: 60,
      height: 60,
      alignSelf: 'center',
      marginTop: 10,
    },
    title: {
      fontWeight: 'bold',
      marginTop: 4,
      color: 'rgba(0,0,0,0.85)',
      marginVertical: 4,
    },
    flexOne: {
      flex: 1,
    },
    flexText: {
      flex: 1,
    },
    victoriesText: {
      fontSize: 16,
      color: '#4CAF50',
      fontWeight: 'bold',
    },
    defeatsText: {
      fontSize: 16,
      color: '#D32F2F',
      fontWeight: 'bold',
    },
    blackText: {
      color: 'black',
    },
    buttonsRow: {
      justifyContent: 'space-around',
      flexDirection: 'row',
    },
    roundedButton: {
      marginTop: 8,
      flex: 1,
      height: 32,
      maxWidth: 90,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    roundedButtonText: {
      fontSize: 12,
      textAlign: 'center',
      color: colors.primary,
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
        fontSize: 21,
        marginBottom: 4,
      },
      roundedButton: {
        maxWidth: 150,
      },
      miniSeries: {
        maxWidth: 250,
      },
      dataTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      dataText: {
        fontSize: 18,
      },
      victoriesText: {
        fontSize: 20,
      },
      defeatsText: {
        fontSize: 20,
      },
      title: {
        fontSize: 18,
      },
    },
    '@media (min-device-width: 750)': {
      championImage: {
        width: 100,
        height: 100,
      },
      spellImage: {
        width: 50,
        height: 50,
      },
      spellsCol: {
        marginLeft: -12,
      },
      tierImage: {
        width: 100,
        height: 100,
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

function renderRateText(rate) {
  if (rate === null) {
    return <Text>N/A</Text>;
  }

  let color;

  if (rate < 50) {
    color = colors.defeat;
  } else if (rate > 50) {
    color = colors.victory;
  }

  return <Text style={[{ color }, styleUtils.boldText]}>{rate}%</Text>;
}

function renderKdaText(kda) {
  let color = 'rgba(0,0,0,0.7)';

  if (kda > 3 && kda < 5) {
    color = colors.tiers.platinum;
  } else if (kda >= 5) {
    color = colors.tiers.diamond;
  }

  return <Text style={{ color }}>{kda}:1</Text>;
}

function renderAveragesText(kills, deaths, assists) {
  return (<Text style={styleUtils.boldText}>
    <Text style={{ color: colors.victory }}>{kills}</Text> /
    <Text style={{ color: colors.defeat }}> {deaths}</Text> /
    <Text> {assists}</Text>
  </Text>);
}

class Participant extends Component {
  constructor(props) {
    super(props);

    this.getRankedSoloEntry = this.getRankedSoloEntry.bind(this);
    this.getChampionRankedStats = this.getChampionRankedStats.bind(this);
    this.getRankedStats = this.getRankedStats.bind(this);
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
          division: null,
          leaguePoints: 0,
        },
      ],
    });
  }

  getRankedStats() {
    const rankedSoloEntry = this.getRankedSoloEntry();

    const victories = rankedSoloEntry.getIn(['entries', 0, 'wins']) || 0;
    const defeats = rankedSoloEntry.getIn(['entries', 0, 'losses']) || 0;
    const gamesPlayed = victories + defeats;
    let winRate;

    if (gamesPlayed > 0) {
      winRate = ((victories * 100) / gamesPlayed).toFixed(0);
    } else {
      winRate = null;
    }

    return {
      victories,
      defeats,
      gamesPlayed,
      winRate,
    };
  }

  getChampionRankedStats() {
    const rankedStats = this.props.participant.get('championRankedStats');

    if (!rankedStats) {
      return {
        gamesPlayed: 0,
        winRate: 0,
        victories: 0,
        defeats: 0,
        kda: null,
        averageKills: 0,
        averageDeaths: 0,
        averageAssists: 0,
      };
    }

    const gamesPlayed = rankedStats.get('totalSessionsPlayed');
    const victories = rankedStats.get('totalSessionsWon') || 0;
    const defeats = rankedStats.get('totalSessionsLost') || 0;
    const kills = rankedStats.get('totalChampionKills') || 0;
    const deaths = rankedStats.get('totalDeathsPerSession') || 0;
    const assists = rankedStats.get('totalAssists') || 0;
    const kda = ((kills + assists) / (deaths > 0 ? deaths : 1)).toFixed(2);
    const averageKills = (kills / gamesPlayed).toFixed(1);
    const averageDeaths = (deaths / gamesPlayed).toFixed(1);
    const averageAssists = (assists / gamesPlayed).toFixed(1);
    const winRate = ((victories * 100) / gamesPlayed).toFixed(0);

    return {
      gamesPlayed,
      winRate,
      victories,
      defeats,
      kda,
      averageKills,
      averageDeaths,
      averageAssists,
    };
  }

  renderTierImage() {
    const leagueEntry = this.getRankedSoloEntry();

    return <Image style={styles.tierImage} source={{ uri: `tier_${leagueEntry.get('tier')}` }} />;
  }

  render() {
    const { participant } = this.props;
    const rankedSoloEntry = this.getRankedSoloEntry();
    const championRankedStats = this.getChampionRankedStats();
    const rankedStats = this.getRankedStats();

    return (<TouchableNativeFeedback
      onPress={() => this.props.onPressProfileButton(participant.get('summonerUrid'))}
    >
      <View style={[styles.root, participant.get('teamId') === 200 && styles.redTeam, this.props.style]}>
        <View style={styles.container}>
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
              <Text style={styles.flexText}>
                <Text style={styles.dataTitle}>{I18n.t('tier')}: </Text>
                <Text style={[styles.tierText, styles.dataText, { color: colors.tiers[rankedSoloEntry.get('tier').toLowerCase()] }]}>
                  {I18n.t(`tiers.${rankedSoloEntry.get('tier').toLowerCase()}`).toUpperCase()}
                </Text>
              </Text>
              {rankedSoloEntry.getIn(['entries', 0, 'division']) &&
              <Text style={styles.flexText}>
                <Text style={styles.dataTitle}>{I18n.t('division')}: </Text>
                <Text style={styles.dataText}>{rankedSoloEntry.getIn(['entries', 0, 'division'])}</Text>
              </Text>
            }
            </View>

            <View style={styles.flexRow}>
              <Text style={styles.flexText}>
                <Text style={styles.dataTitle}>{I18n.t('games')}: </Text>
                <Text style={styles.dataText}>{rankedStats.gamesPlayed}</Text>
              </Text>
              <Text style={styles.flexText}>
                <Text style={styles.dataTitle}>Rate: </Text>
                <Text style={styles.dataText}>{renderRateText(rankedStats.winRate)}</Text>
              </Text>
            </View>

            <View style={styles.flexRow}>
              <Text style={styles.flexText}>
                <Text style={styles.dataTitle}>{I18n.t('victories')}: </Text>
                <Text style={styles.victoriesText}>{rankedStats.victories}</Text>
              </Text>

              <Text style={styles.flexText}>
                <Text style={styles.dataTitle}>{I18n.t('defeats')}: </Text>
                <Text style={styles.defeatsText}>{rankedStats.defeats}</Text>
              </Text>
            </View>
            <View style={styles.flexRow}>
              {rankedSoloEntry.getIn(['entries', 0, 'miniSeries']) ? (
                <View style={styles.flexRow}>
                  <Text style={styles.dataTitle}>{I18n.t('progress')}: </Text>
                  <View style={{ flex: 1 }}>
                    <RankedMiniseries
                      style={styles.miniSeries}
                      progress={rankedSoloEntry.getIn(['entries', 0, 'miniSeries', 'progress'])}
                      iconsSize={getMiniseriesIconsSize()}
                    />
                  </View>
                </View>
              ) : (
                <Text style={styles.flexText}>
                  <Text style={styles.dataTitle}>{I18n.t('league_points')}: </Text>
                  <Text style={styles.dataText}>{rankedSoloEntry.getIn(['entries', 0, 'leaguePoints']) || 0}</Text>
                </Text>
              )}
            </View>

            {(championRankedStats.gamesPlayed > 0) &&
              <View>
                <View style={styles.flexRow}>
                  <Text style={styles.title}>{I18n.t('champion_stats')}</Text>
                </View>

                <View style={styles.flexRow}>
                  <Text style={styles.flexText}>
                    <Text style={styles.dataTitle}>{I18n.t('games')}: </Text>
                    <Text style={styles.dataText}>{championRankedStats.gamesPlayed}</Text>
                  </Text>
                  <Text style={styles.flexText}>
                    <Text style={styles.dataTitle}>Rate: </Text>
                    <Text style={styles.dataText}>
                      {renderRateText(championRankedStats.winRate)}
                    </Text>
                  </Text>
                </View>

                <View style={styles.flexRow}>
                  <Text style={styles.flexText}>
                    <Text style={styles.dataTitle}>{I18n.t('victories')}: </Text>
                    <Text style={styles.victoriesText}>{championRankedStats.victories}</Text>
                  </Text>
                  <Text style={styles.flexText}>
                    <Text style={styles.dataTitle}>{I18n.t('defeats')}: </Text>
                    <Text style={styles.defeatsText}>{championRankedStats.defeats}</Text>
                  </Text>
                </View>

                <View style={styles.flexRow}>
                  <Text style={styles.flexText}>
                    <Text style={styles.dataTitle}>KDA: </Text>
                    <Text style={[styles.dataText, styleUtils.boldText]}>
                      {renderKdaText(championRankedStats.kda)}
                    </Text>
                  </Text>
                </View>

                <View style={styles.flexRow}>
                  <Text style={styles.flexText}>
                    <Text style={styles.dataTitle}>{I18n.t('average')}: </Text>
                    <Text style={styles.dataText}>
                      {renderAveragesText(championRankedStats.averageKills,
                        championRankedStats.averageDeaths,
                        championRankedStats.averageAssists,
                      )}
                    </Text>
                  </Text>
                </View>
              </View>
            }

            <View style={styles.buttonsRow}>
              <TouchableNativeFeedback
                onPress={() => this.props.onPressRunesButton(participant.get('summonerUrid'))}
              >
                <View style={styles.roundedButton}>
                  <Text style={styles.roundedButtonText}>{I18n.t('runes').toUpperCase()}</Text>
                </View>
              </TouchableNativeFeedback>

              <TouchableNativeFeedback
                onPress={() => this.props.onPressMasteriesButton(participant.get('summonerUrid'))}
              >
                <View style={styles.roundedButton}>
                  <Text style={styles.roundedButtonText}>{I18n.t('masteries').toUpperCase()}</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>);
  }
}

Participant.propTypes = {
  style: View.propTypes.style,
  participant: ImmutablePropTypes.map,
  onPressRunesButton: PropTypes.func,
  onPressMasteriesButton: PropTypes.func,
  onPressProfileButton: PropTypes.func,
};

export default Participant;
