import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toolbar from './Toolbar';
import colors from '../../utils/colors';
import RuneTab from './RuneTab';
import MasteryTab from './MasteryTab';

const itemsArrowSize = 20;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  container: {
    paddingLeft: 16,
    paddingRight: 16,
  },

  championImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'black',
    zIndex: 1,
  },

  championDataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  summonerSpell: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginLeft: -8,
    marginRight: 16,
  },

  championName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  summaryRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  winText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.victory,
  },

  lossText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.defeat,
  },

  summaryIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },

  title: {
    backgroundColor: colors.titlesBackground,
    marginVertical: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  item: {
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: 'black',
    marginBottom: 16,
  },

  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  itemsArrow: {
    width: itemsArrowSize,
  },
});

class ProBuildView extends Component {
  constructor(props) {
    super(props);
    this.deviceDimensions = Dimensions.get('window');
    this.getItemStyle = this.getItemStyle.bind(this);
  }

  getItemStyle() {
    let width = this.deviceDimensions.width - 32;
    const numCols = 5;

    width -= numCols * itemsArrowSize;
    width = width / numCols;

    return {
      width,
      height: width,
    };
  }

  render() {
    const { build } = this.props;
    const itemsAndSeparators = [];
    let itemData;

    for (let i = 0; i < build.itemsOrder.length; i++) {
      itemData = build.itemsOrder[i];

      itemsAndSeparators.push(<Image
        style={[styles.item, this.getItemStyle()]}
        source={{ uri: `item_${itemData.itemId}` }}
      />);

      if (i !== build.itemsOrder.length - 1) {
        itemsAndSeparators.push(<Icon
          style={styles.itemsArrow}
          name="keyboard-arrow-right"
          color="rgba(0,0,0,0.5)"
          size={18}
        />);
      }
    }

    return (<View style={styles.root}>
      <Toolbar
        playerName={build.profPlayerData.name}
        playerImageUrl={build.profPlayerData.imageUrl}
      />
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <DefaultTabBar />}
        tabBarBackgroundColor={colors.primary}
        tabBarActiveTextColor={colors.accent}
        tabBarInactiveTextColor="rgba(255,255,255,0.8)"
        tabBarUnderlineStyle={{ backgroundColor: colors.accent }}
        onChangeTab={this.handleOnChangeTab}
      >
        <ScrollView tabLabel="Build" contentContainerStyle={styles.container}>
          <Text style={styles.title}>Informacion</Text>
          <View style={styles.championDataRow}>
            <Image source={{ uri: `champion_square_${build.championId}` }} style={styles.championImage} />
            <View>
              <Image source={{ uri: `summoner_spell_${build.spell1Id}` }} style={styles.summonerSpell} />
              <Image source={{ uri: `summoner_spell_${build.spell2Id}` }} style={styles.summonerSpell} />
            </View>
            <View>
              <Text style={styles.championName}>{build.championData.name}</Text>
              <Text style={styles.championTitle}>{build.championData.title}</Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <Text style={build.stats.winner ? styles.winText : styles.lossText}>
              {build.stats.winner ? 'Victoria' : 'Derrota'}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Image style={styles.summaryIcon} source={{ uri: 'ui_score' }} />
              <Text>{build.stats.kills}/{build.stats.deaths}/{build.stats.assists}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image style={styles.summaryIcon} source={{ uri: 'ui_gold' }} />
              <Text>{build.stats.goldEarned}</Text>
            </View>
          </View>

          <Text style={styles.title}>Objetos Comprados</Text>

          <View style={styles.itemsContainer}>
            {itemsAndSeparators}
          </View>
        </ScrollView>
        <RuneTab tabLabel="Runas" runes={this.props.build.runes} />
        <MasteryTab tabLabel="Maestrias" masteries={this.props.build.masteries} />
      </ScrollableTabView>
    </View>);
  }
}

ProBuildView.propTypes = {
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
};

ProBuildView.defaultProps = {
  build: {
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
    itemsOrder: [
      {
        itemId: 2003,
        itemName: 'Nombre del item',
      },
      {
        itemId: 2003,
        itemName: 'Nombre del item',
      },
      {
        itemId: 2003,
        itemName: 'Nombre del item',
      },
      {
        itemId: 2003,
        itemName: 'Nombre del item',
      },
      {
        itemId: 2003,
        itemName: 'Nombre del item',
      },
      {
        itemId: 2003,
        itemName: 'Nombre del item',
      },
      {
        itemId: 2003,
        itemName: 'Nombre del item',
      },
      {
        itemId: 2003,
        itemName: 'Nombre del item',
      },
      {
        itemId: 2003,
        itemName: 'Nombre del item',
      },
      {
        itemId: 2003,
        itemName: 'Nombre del item',
      },
      {
        itemId: 2003,
        itemName: 'Nombre del item',
      },
      {
        itemId: 2003,
        itemName: 'Nombre del item',
      },
      {
        itemId: 2003,
        itemName: 'Nombre del item',
      },
    ],
    runes: [
      {
        runeId: 5253,
        count: 9,
        name: 'Nombre de runa',
        description: 'Descripcion de la runa',
        image: {
          full: 'y_4_3.png',
        },
      },
      {
        runeId: 5289,
        count: 9,
        name: 'Nombre de runa',
        description: 'Descripcion de la runa',
        image: {
          full: 'y_4_3.png',
        },
      },
      {
        runeId: 5317,
        count: 9,
        name: 'Nombre de runa',
        description: 'Descripcion de la runa',
        image: {
          full: 'y_4_3.png',
        },
      },
      {
        runeId: 5335,
        count: 3,
        name: 'Nombre de runa',
        description: 'Descripcion de la runa',
        image: {
          full: 'y_4_3.png',
        },
      },
    ],
  },
};

export default ProBuildView;
