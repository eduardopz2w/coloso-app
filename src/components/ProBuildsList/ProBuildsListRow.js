import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { View, Text, Image, TouchableNativeFeedback } from 'react-native';
import { MediaQuery, MediaQueryStyleSheet } from 'react-native-responsive';
import moment from 'moment';
import numeral from 'numeral';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ProPlayerImage from '../ProPlayerImage';
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

    uiIcon: {
      width: 15,
      height: 15,
      marginHorizontal: 4,
    },

    scoreText: {
      fontSize: 15,
      fontWeight: 'bold',
    },

    statsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    statContainer: {
      flexDirection: 'row',
      alignItems: 'center',
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

    timeAgoRow: {
      marginTop: 4,
    },
    favoriteButtonContainer: {
      width: 36,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
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
      championName: {
        fontSize: 16,
      },
      scoreText: {
        fontSize: 16,
      },
      championNameAndScore: {
        flex: 0,
        width: 70,
        marginRight: 8,
      },
      statsContainer: {
        flex: 1,
        justifyContent: 'space-around',
      },
      statContainer: {
        flex: 1,
        justifyContent: 'center',
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

class ProBuild extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.renderFavoriteButton = this.renderFavoriteButton.bind(this);
    this.handleOnPressAddFavorite = this.handleOnPressAddFavorite.bind(this);
    this.handleOnPressRemoveFavorite = this.handleOnPressRemoveFavorite.bind(this);
    this.getTimeAgo = this.getTimeAgo.bind(this);
  }

  getTimeAgo() {
    return moment(this.props.build.get('gameCreation') - (this.props.build.get('gameDuration') * 1000)).fromNow();
  }

  handleOnPressAddFavorite() {
    if (this.props.onAddFavorite) {
      this.props.onAddFavorite(this.props.build.get('id'));
    }
  }

  handleOnPressRemoveFavorite() {
    if (this.props.onRemoveFavorite) {
      this.props.onRemoveFavorite(this.props.build.get('id'));
    }
  }

  renderFavoriteButton() {
    const isFavorite = this.props.build.get('isFavorite');

    if (isFavorite) {
      return (<TouchableNativeFeedback onPress={this.handleOnPressRemoveFavorite}>
        <View style={styles.favoriteButtonContainer}>
          <Icon name="favorite" size={28} color="#C62828" />
        </View>
      </TouchableNativeFeedback>);
    }

    return (<TouchableNativeFeedback onPress={this.handleOnPressAddFavorite}>
      <View style={styles.favoriteButtonContainer}>
        <Icon name="favorite" size={28} color="gray" />
      </View>
    </TouchableNativeFeedback>);
  }
  render() {
    const { build } = this.props;

    return (<TouchableNativeFeedback onPress={this.props.onPress} >
      <View style={[styles.root, build.getIn(['stats', 'win']) ? styles.win : styles.loss]}>
        <View>
          <View style={styles.playerData}>
            <ProPlayerImage
              imageUrl={build.getIn(['proSummoner', 'proPlayer', 'imageUrl'])}
              role={build.getIn(['proSummoner', 'proPlayer', 'role'])}
            />
            <Text style={styles.playerName}>{build.getIn(['proSummoner', 'proPlayer', 'name'])}</Text>
            {this.renderFavoriteButton()}
          </View>
          <View style={styles.gameDataRow}>
            <Image source={{ uri: `champion_square_${build.get('championId')}` }} style={styles.championImage} />
            <View>
              <Image source={{ uri: `summoner_spell_${build.get('spell1Id')}` }} style={styles.summonerSpell} />
              <Image source={{ uri: `summoner_spell_${build.get('spell2Id')}` }} style={styles.summonerSpell} />
            </View>

            <View style={styles.championNameAndScore} >
              <Text numberOfLines={1} style={styles.championName}>{build.getIn(['championData', 'name'])}</Text>
              <MediaQuery maxDeviceWidth={599}>
                <Text style={styles.scoreText}>
                  <Text style={styles.killsText}>{build.getIn(['stats', 'kills'])}</Text>/
                  <Text style={styles.deathsText}>{build.getIn(['stats', 'deaths'])}</Text>/
                  <Text style={styles.assistsText}>{build.getIn(['stats', 'assists'])}</Text>
                </Text>
              </MediaQuery>
            </View>

            <View style={styles.statsContainer}>
              <MediaQuery minDeviceWidth={600}>
                <View style={styles.statContainer}>
                  <Image style={styles.uiIcon} source={{ uri: 'ui_score' }} />
                  <Text style={styles.scoreText}>
                    <Text style={styles.killsText}>{build.getIn(['stats', 'kills'])}</Text>/
                    <Text style={styles.deathsText}>{build.getIn(['stats', 'deaths'])}</Text>/
                    <Text style={styles.assistsText}>{build.getIn(['stats', 'assists'])}</Text>
                  </Text>
                </View>
              </MediaQuery>

              <MediaQuery minDeviceWidth={800}>
                <View style={styles.statContainer}>
                  <Image style={styles.uiIcon} source={{ uri: 'ui_minion' }} />
                  <Text style={{ fontWeight: 'bold' }}>{build.getIn(['stats', 'totalMinionsKilled']) || 0}</Text>
                </View>
              </MediaQuery>

              <View style={styles.statContainer}>
                <Image style={styles.uiIcon} source={{ uri: 'ui_gold' }} />
                <MediaQuery maxDeviceWidth={399}>
                  <Text style={styles.goldText}>{numeral(build.getIn(['stats', 'goldEarned'])).format('0a')}</Text>
                </MediaQuery>
                <MediaQuery minDeviceWidth={400}>
                  <Text style={styles.goldText}>{numeral(build.getIn(['stats', 'goldEarned'])).format('0,0')}</Text>
                </MediaQuery>
              </View>
            </View>
            <View style={styles.itemsContainer} >
              {renderItem(build.getIn(['stats', 'item0']))}
              {renderItem(build.getIn(['stats', 'item1']))}
              {renderItem(build.getIn(['stats', 'item2']))}
              {renderItem(build.getIn(['stats', 'item3']))}
              {renderItem(build.getIn(['stats', 'item4']))}
              {renderItem(build.getIn(['stats', 'item5']))}
            </View>
            {renderItem(build.getIn(['stats', 'item6']))}
          </View>
          <View style={styles.timeAgoRow}>
            <Text style={{ textAlign: 'right' }}>{this.getTimeAgo()}</Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>);
  }
}

ProBuild.propTypes = {
  build: ImmutablePropTypes.mapContains({
    id: PropTypes.string.isRequired,
    spell1Id: PropTypes.number.isRequired,
    spell2Id: PropTypes.number.isRequired,
    championId: PropTypes.number.isRequired,
    championData: ImmutablePropTypes.mapContains({
      name: PropTypes.string,
      title: PropTypes.string,
    }),
    gameCreation: PropTypes.number.isRequired,
    gameDuration: PropTypes.number.isRequired,
    stats: ImmutablePropTypes.mapContains({
      win: PropTypes.bool.isRequired,
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
      totalMinionsKilled: PropTypes.number.isRequired,
    }).isRequired,
    proPlayer: ImmutablePropTypes.mapContains({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      role: PropTypes.string,
    }),
  }).isRequired,
  onPress: PropTypes.func,
  onAddFavorite: PropTypes.func,
  onRemoveFavorite: PropTypes.func,
};

export default ProBuild;
