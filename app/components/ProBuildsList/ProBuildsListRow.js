import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { MediaQuery, MediaQueryStyleSheet } from 'react-native-responsive';
import moment from 'moment';
import numeral from 'numeral';
import colors from '../../utils/colors';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      paddingLeft: 10,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 8,
      borderLeftWidth: 6,
    },

    playerData: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    playerImage: {
      width: 45,
      height: 45,
      borderRadius: 50,
      marginRight: 16,
      borderWidth: 2,
      borderColor: 'black',
    },

    playerName: {
      fontWeight: 'bold',
      fontSize: 16,
      flex: 1,
    },

    championImage: {
      width: 40,
      height: 40,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: 'black',
      zIndex: 1,
    },

    championNameAndScore: {
      flex: 1,
    },

    championName: {
      fontSize: 13,
      fontWeight: 'bold',
    },

    goldText: {
      marginRight: 8,
      color: colors.tiers.gold,
      fontWeight: 'bold',
      textShadowColor: '#000',
      textShadowOffset: {
        width: 0.2,
        height: 0.2,
      },
    },

    gameDataRow: {
      paddingLeft: 16,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },

    itemsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: 70,
      justifyContent: 'space-around',
    },

    item: {
      width: 20,
      height: 20,
      borderWidth: 1.5,
      borderColor: 'black',
      backgroundColor: 'black',
      marginBottom: 1,
    },

    summonerSpell: {
      width: 20,
      height: 20,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: 'black',
      marginLeft: -5,
      marginRight: 8,
    },

    goldImage: {
      width: 15,
      height: 15,
      marginRight: 2,
    },

    scoreText: {
      fontSize: 15,
      fontWeight: 'bold',
    },

    killsText: {
      color: colors.victory,
    },

    deathsText: {
      color: colors.defeat,
    },

    win: {
      borderLeftColor: colors.victory,
    },

    loss: {
      borderLeftColor: colors.defeat,
    },
  }, {
    '@media (min-device-width: 600)': {
      itemsContainer: {
        width: null,
        marginLeft: 8,
      },
      item: {
        marginRight: 4,
        width: 25,
        height: 25,
      },
      championNameAndScore: {
        flexDirection: 'row',
      },
      championName: {
        flex: 0.60,
        fontSize: 16,
      },
      scoreText: {
        flex: 0.40,
        fontSize: 16,
      },
    },
  },
);

function renderItem(itemId) {
  if (itemId !== 0) {
    return <Image source={{ uri: `item_${itemId}` }} style={styles.item} />;
  }

  return <View style={styles.item} />;
}

function getTimeAgo(creationTime) {
  return moment(creationTime).fromNow();
}

class ProBuild extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }
  render() {
    const { build } = this.props;

    return (<View style={[styles.root, build.stats.winner ? styles.win : styles.loss]}>
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View>
          <View style={styles.playerData}>
            <Image source={{ uri: build.profPlayerData.imageUrl }} style={styles.playerImage} />
            <Text style={styles.playerName}>{this.props.build.profPlayerData.name}</Text>
            <Text>{getTimeAgo(build.matchCreation)}</Text>
          </View>
          <View style={styles.gameDataRow}>
            <Image source={{ uri: `champion_square_${build.championId}` }} style={styles.championImage} />
            <View>
              <Image source={{ uri: `summoner_spell_${build.spell1Id}` }} style={styles.summonerSpell} />
              <Image source={{ uri: `summoner_spell_${build.spell2Id}` }} style={styles.summonerSpell} />
            </View>
            <View style={styles.championNameAndScore} >
              <Text numberOfLines={1} style={styles.championName}>{build.championData.name}</Text>
              <Text style={styles.scoreText}>
                <Text style={styles.killsText}>{build.stats.kills}</Text>/
                <Text style={styles.deathsText}>{build.stats.deaths}</Text>/
                <Text style={styles.assistsText}>{build.stats.assists}</Text>
              </Text>
            </View>
            <Image style={styles.goldImage} source={{ uri: 'ui_gold' }} />
            <MediaQuery maxDeviceWidth={599}>
              <Text style={styles.goldText}>{numeral(build.stats.goldEarned).format('0a')}</Text>
            </MediaQuery>
            <MediaQuery minDeviceWidth={600}>
              <Text style={styles.goldText}>{numeral(build.stats.goldEarned).format('0,0')}</Text>
            </MediaQuery>
            <View style={styles.itemsContainer} >
              {renderItem(build.stats.item0)}
              {renderItem(build.stats.item1)}
              {renderItem(build.stats.item2)}
              {renderItem(build.stats.item3)}
              {renderItem(build.stats.item4)}
              {renderItem(build.stats.item5)}
            </View>
            {renderItem(build.stats.item6)}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>);
  }
}

ProBuild.propTypes = {
  build: PropTypes.shape({
    spell1Id: PropTypes.number.isRequired,
    spell2Id: PropTypes.number.isRequired,
    championId: PropTypes.number.isRequired,
    championData: PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
    }),
    matchCreation: PropTypes.number.isRequired,
    highestAchievedSeasonTier: PropTypes.string,
    masteries: PropTypes.arrayOf(PropTypes.shape({
      masteryId: PropTypes.number.isRequired,
      rank: PropTypes.number.isRequired,
    })),
    runes: PropTypes.arrayOf(PropTypes.shape({
      runeId: PropTypes.number.isRequired,
      rank: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.shape({
        full: PropTypes.string.isRequired,
      }),
    })),
    stats: PropTypes.shape({
      winner: PropTypes.bool,
      champLevel: PropTypes.number,
      item0: PropTypes.number.isRequired,
      item1: PropTypes.number.isRequired,
      item2: PropTypes.number.isRequired,
      item3: PropTypes.number.isRequired,
      item4: PropTypes.number.isRequired,
      item5: PropTypes.number.isRequired,
      item6: PropTypes.number.isRequired,
      kills: PropTypes.number.isRequired,
      deaths: PropTypes.number.isRequired,
      assists: PropTypes.number.isRequired,
      goldEarned: PropTypes.number.isRequired,
      largestMultiKill: PropTypes.number.isRequired,
    }),
    itemsOrder: PropTypes.arrayOf(PropTypes.shape({
      itemId: PropTypes.number.isRequired,
    })),
    skillsOrder: PropTypes.arrayOf(PropTypes.number),
    profPlayerData: PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
    }),
  }),
  onPress: PropTypes.func,
};

export default ProBuild;
