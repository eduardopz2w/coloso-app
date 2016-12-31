import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Image, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import numeral from 'numeral';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
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
  },

  goldText: {
    marginRight: 8,
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
  },

  summonerSpell: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: -5,
    marginRight: 16,
  },

  goldImage: {
    width: 15,
    height: 15,
    marginRight: 4,
  },

  win: {
    borderLeftColor: colors.victory,
  },

  loss: {
    borderLeftColor: colors.defeat,
  },
});

function renderItem(itemId) {
  if (itemId) {
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
            <Text>{getTimeAgo(build.matchC)}</Text>
          </View>
          <View style={styles.gameDataRow}>
            <Image source={{ uri: `champion_square_${build.championId}` }} style={styles.championImage} />
            <View>
              <Image source={{ uri: `summoner_spell_${build.spell1Id}` }} style={styles.summonerSpell} />
              <Image source={{ uri: `summoner_spell_${build.spell2Id}` }} style={styles.summonerSpell} />
            </View>
            <View style={styles.championNameAndScore} >
              <Text style={styles.championName}>{build.championData.name}</Text>
              <Text>
                {build.stats.kills}/{build.stats.deaths}/{build.stats.assists}
              </Text>
            </View>
            <Image style={styles.goldImage} source={{ uri: 'ui_gold' }} />
            <Text style={styles.goldText}>{numeral(build.stats.goldEarned).format('0a')}</Text>
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
    championData: {
      name: PropTypes.string,
      title: PropTypes.string,
    },
    matchCreation: PropTypes.number.isRequired,
    highestAchievedSeasonTier: PropTypes.string,
    masteries: PropTypes.arrayOf(PropTypes.shape({
      masteryId: PropTypes.number.isRequired,
      rank: PropTypes.number.isRequired,
    })),
    runes: PropTypes.arrayOf(PropTypes.shape({
      runeId: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
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
    itemsOrder: PropTypes.arrayOf({
      itemId: PropTypes.number.isRequired,
    }),
    skillsOrder: PropTypes.arrayOf(PropTypes.number),
    profPlayerData: PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }),
  }),
  onPress: PropTypes.func,
};

export default ProBuild;
