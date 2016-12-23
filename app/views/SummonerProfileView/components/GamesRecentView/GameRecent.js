import React, { PureComponent, PropTypes } from 'react';
import { View, Dimensions, Image, Text } from 'react-native';
import { Grid, Row } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import _ from 'lodash';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import colors from '../../../../utils/colors';
import styleUtils from '../../../../utils/styleUtils';
import gameModeParser from '../../../../utils/gameModeParser';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      borderBottomWidth: 1,
      borderColor: '#BBB',
    },
    container: {
      flexDirection: 'row',
      padding: 8,
    },
    championImage: {
      width: 50,
      height: 50,
      borderRadius: 50,
      borderColor: 'black',
      borderWidth: 2,
    },
    championImageContainer: {
      position: 'relative',
      height: 50,
      zIndex: 1,
    },
    championLevelContainer: {
      width: 15,
      height: 15,
      justifyContent: 'center',
      backgroundColor: 'black',
      position: 'absolute',
      bottom: 0,
      left: 0,
      borderRadius: 50,
    },
    championLevelText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 10,
    },
    spellImage: {
      width: 25,
      height: 25,
      borderRadius: 50,
      marginLeft: -9,
    },
    dataCol: {
      flex: 1,
      paddingLeft: 8,
      paddingRight: 8,
    },
    gameTitle: {
      fontSize: 13,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    iconImage: {
      width: 15,
      height: 15,
    },
    itemImage: {
      width: 24,
      height: 24,
      borderColor: 'black',
      borderWidth: 1.5,
    },
    noItem: {
      width: 24,
      height: 24,
      backgroundColor: 'black',
    },
    iconDataRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    iconDataCol: {
      minWidth: 70,
      height: 20,
      flexDirection: 'row',
    },
    itemsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 6,
      marginBottom: 6,
    },
    multikillContainer: {
      backgroundColor: '#d0aa49',
      borderRadius: 50,
      marginTop: 8,
    },
    multikillText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 12,
      fontWeight: 'bold',
    },
    timeAgoRow: {
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  },
  {
    '@media (min-device-width: 600)': {
      championImage: {
        width: 90,
        height: 90,
        borderWidth: 3,
      },
      championImageContainer: {
        width: 90,
        height: 90,
      },
      championLevelContainer: {
        width: 25,
        height: 25,
      },
      championLevelText: {
        fontSize: 16,
      },
      spellImage: {
        width: 45,
        height: 45,
      },
      multikillText: {
        fontSize: 18,
      },
      dataCol: {
        paddingLeft: 16,
        paddingRight: 16,
      },
      gameTitle: {
        fontSize: 18,
      },
      iconImage: {
        width: 25,
        height: 25,
        marginRight: 8,
      },
      dataText: {
        fontSize: 19,
      },
      iconDataCol: {
        minWidth: 130,
        height: 30,
        flexDirection: 'row',
      },
      noItem: {
        width: 45,
        height: 45,
      },
      itemImage: {
        width: 45,
        height: 45,
      },
    },
  },
);

function renderItemImage(itemId) {
  if (itemId) {
    return <Image style={styles.itemImage} source={{ uri: `item_${itemId}` }} />;
  }

  return <View style={styles.noItem} />;
}

function getIconSize() {
  if (Dimensions.get('window').width >= 600) {
    return 25;
  }

  return 15;
}

class GameRecent extends PureComponent {
  constructor(props) {
    super(props);

    this.getBorderLeftStyle = this.getBorderLeftStyle.bind(this);
    this.getGameTitleLabel = this.getGameTitleLabel.bind(this);
    this.renderMultiKillBadge = this.renderMultiKillBadge.bind(this);
  }

  getBorderLeftStyle() {
    const { win } = this.props.game.stats;
    let borderColor;

    if (this.props.game.invalid) {
      borderColor = '#BBB';
    } else if (win) {
      borderColor = colors.victory;
    } else {
      borderColor = colors.defeat;
    }

    return {
      borderLeftWidth: 5,
      borderColor,
    };
  }

  getGameTitleLabel() {
    const { subType } = this.props.game;

    if (subType.includes('RANKED') && !subType.includes('UNRANKED')) {
      return 'Clasificatoria';
    }

    return 'Normal';
  }

  renderMultiKillBadge() {
    const { largestMultiKill } = this.props.game.stats;
    let multikillText;

    if (_.isUndefined(largestMultiKill) || largestMultiKill <= 1) {
      return null;
    }

    if (largestMultiKill === 2) {
      multikillText = 'DOUBLE';
    } else if (largestMultiKill === 3) {
      multikillText = 'TRIPLE';
    } else if (largestMultiKill === 4) {
      multikillText = 'QUADRA';
    } else if (largestMultiKill === 5) {
      multikillText = 'PENTA';
    }
    return (<View style={styles.multikillContainer}>
      <Text style={styles.multikillText}>{multikillText}</Text>
    </View>);
  }

  render() {
    // TODO: Parsear los gametype
    const { championId, spell1, spell2, createDate, gameMode, ipEarned } = this.props.game;
    const {
      championsKilled,
      assists,
      numDeaths,
      minionsKilled,
      goldEarned,
      item0,
      item1,
      item2,
      item3,
      item4,
      item5,
      item6,
      level,
      timePlayed,
      wardPlaced,
    } = this.props.game.stats;
    const timePlayedMomentDuration = moment.duration({ seconds: timePlayed });

    return (<View style={styles.root}>
      <View style={[styles.container, this.getBorderLeftStyle()]}>
        <View>
          <View style={styleUtils.flexRow}>
            <View style={styles.championImageContainer}>
              <Image style={styles.championImage} source={{ uri: `champion_square_${championId}` }} />
              <View style={styles.championLevelContainer}>
                <Text style={styles.championLevelText}>{level}</Text>
              </View>
            </View>
            <View style={styles.spellsConainer}>
              <Image style={styles.spellImage} source={{ uri: `summoner_spell_${spell1}` }} />
              <Image style={styles.spellImage} source={{ uri: `summoner_spell_${spell2}` }} />
            </View>
          </View>
          {this.renderMultiKillBadge()}
        </View>
        <View style={styles.dataCol}>
          <Text style={styles.gameTitle}>
            {gameModeParser(gameMode)} ({this.getGameTitleLabel()})
          </Text>
          <Grid>
            <View style={styles.iconDataRow}>
              <View style={styles.iconDataCol}>
                <Image style={styles.iconImage} source={{ uri: 'ui_score' }} />
                <Text style={styles.dataText}>{championsKilled || '0'}/{assists || '0'}/{numDeaths || '0'}</Text>
              </View>
              <View style={styles.iconDataCol}>
                <Image style={styles.iconImage} source={{ uri: 'ui_minion' }} />
                <Text style={styles.dataText}>{minionsKilled}</Text>
              </View>
              <View style={styles.iconDataCol}>
                <Image style={styles.iconImage} source={{ uri: 'ui_gold' }} />
                <Text style={styles.dataText}>{goldEarned}</Text>
              </View>
              <View style={styles.iconDataCol}>
                <Image style={styles.iconImage} source={{ uri: 'ui_ward' }} />
                <Text style={styles.dataText}>{wardPlaced || 0}</Text>
              </View>
              <View style={styles.iconDataCol}>
                <Icon style={styles.iconImage} name="timer" size={getIconSize()} />
                <Text style={styles.dataText}>{moment(timePlayedMomentDuration.asMilliseconds()).format('mm:ss')}</Text>
              </View>
              <View style={styles.iconDataCol}>
                <Text style={styles.dataText}>IP: </Text>
                <Text style={styles.dataText}>+{ipEarned || 0}</Text>
              </View>
            </View>
            <Row style={styles.itemsRow}>
              {renderItemImage(item0)}
              {renderItemImage(item1)}
              {renderItemImage(item2)}
              {renderItemImage(item3)}
              {renderItemImage(item4)}
              {renderItemImage(item5)}
              {renderItemImage(item6)}
            </Row>
            <Row style={[styleUtils.flexRow, styles.timeAgoRow]}>
              <Icon style={styles.iconImage} name="access-time" size={getIconSize()} />
              <Text style={styles.dataText}> {moment(createDate).fromNow()}</Text>
            </Row>
          </Grid>
        </View>
      </View>
    </View>);
  }
}

GameRecent.propTypes = {
  game: PropTypes.shape({
    championId: PropTypes.number,
    spell1: PropTypes.number,
    spell2: PropTypes.number,
    subType: PropTypes.string,
    gameType: PropTypes.string,
    gameMode: PropTypes.string,
    invalid: PropTypes.bool,
    createDate: PropTypes.number,
    ipEarned: PropTypes.number,
    stats: PropTypes.shape({
      win: PropTypes.bool,
      championsKilled: PropTypes.number,
      assists: PropTypes.number,
      numDeaths: PropTypes.number,
      minionsKilled: PropTypes.number,
      goldEarned: PropTypes.number,
      level: PropTypes.number,
      item0: PropTypes.number,
      item1: PropTypes.number,
      item2: PropTypes.number,
      item3: PropTypes.number,
      item4: PropTypes.number,
      item5: PropTypes.number,
      item6: PropTypes.number,
      timePlayed: PropTypes.number,
      largestMultiKill: PropTypes.number,
      wardPlaced: PropTypes.number,
    }),
  }),
};

export default GameRecent;
