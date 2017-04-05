import React, { PureComponent, PropTypes } from 'react';
import { View, Dimensions, Image, Text } from 'react-native';
import { Grid, Row } from 'react-native-easy-grid';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import numeral from 'numeral';
import _ from 'lodash';
import { MediaQueryStyleSheet, MediaQuery } from 'react-native-responsive';
import I18n from 'i18n-js';

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
    scoreText: {
      fontWeight: 'bold',
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
      marginRight: 4,
    },
    itemImage: {
      width: 25,
      height: 25,
      borderColor: '#d0aa49',
      borderWidth: 1.5,
    },
    noItem: {
      width: 24,
      height: 24,
      backgroundColor: 'black',
    },
    iconDataRow: {
      flexDirection: 'row',
    },
    iconDataCol: {
      flex: 1,
      flexDirection: 'row',
    },
    firstIconDataCol: {
      flex: 1.25,
    },
    itemsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 6,
      marginBottom: 6,
    },
    multikillContainer: {
      backgroundColor: '#d0aa49',
      borderRadius: 5,
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
    gold: {
      color: colors.tiers.gold,
      textShadowColor: '#000',
      textShadowOffset: {
        width: 0.2,
        height: 0.2,
      },
    },
  },
  {
    '@media (min-device-width: 400)': {
      noItem: {
        width: 32,
        height: 32,
      },
      itemImage: {
        width: 32,
        height: 32,
      },
    },
  },
  {
    '@media (min-device-width: 600)': {
      championImage: {
        width: 80,
        height: 80,
        borderWidth: 3,
      },
      championImageContainer: {
        width: 80,
        height: 80,
      },
      championLevelContainer: {
        width: 25,
        height: 25,
      },
      championLevelText: {
        fontSize: 16,
      },
      spellImage: {
        width: 40,
        height: 40,
      },
      multikillText: {
        fontSize: 18,
      },
      dataCol: {
        paddingLeft: 16,
        paddingRight: 16,
      },
      firstIconDataCol: {
        flex: 1,
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
        fontSize: 16,
      },
      noItem: {
        width: 40,
        height: 40,
      },
      itemImage: {
        width: 40,
        height: 40,
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

class GameRecent extends PureComponent {
  constructor(props) {
    super(props);

    this.getBorderLeftStyle = this.getBorderLeftStyle.bind(this);
    this.getGameTitleLabel = this.getGameTitleLabel.bind(this);
    this.renderMultiKillBadge = this.renderMultiKillBadge.bind(this);
    this.getTimePlayed = this.getTimePlayed.bind(this);
  }

  getBorderLeftStyle() {
    const win = this.props.game.getIn(['stats', 'win']);
    const invalid = this.props.game.get('invalid');
    let borderColor;

    if (invalid) {
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
    const subType = this.props.game.get('subType');

    if (subType.includes('RANKED') && !subType.includes('UNRANKED')) {
      return I18n.t('ranked');
    }

    return 'Normal';
  }

  getTimePlayed() {
    const seconds = this.props.game.getIn(['stats', 'timePlayed']);
    const duration = moment.duration({ seconds });
    const minutes = (duration.hours() * 60) + duration.minutes();

    return `${numeral(minutes).format('00')}:${numeral(duration.seconds()).format('00')}`;
  }

  renderMultiKillBadge() {
    const largestMultiKill = this.props.game.getIn(['stats', 'largestMultiKill']);
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
    const { game } = this.props;

    return (<View style={styles.root}>
      <View style={[styles.container, this.getBorderLeftStyle()]}>
        <View>
          <View style={styleUtils.flexRow}>
            <View style={styles.championImageContainer}>
              <Image style={styles.championImage} source={{ uri: `champion_square_${game.get('championId')}` }} />
              <View style={styles.championLevelContainer}>
                <Text style={styles.championLevelText}>{game.getIn(['stats', 'level'])}</Text>
              </View>
            </View>
            <View style={styles.spellsConainer}>
              <Image style={styles.spellImage} source={{ uri: `summoner_spell_${game.get('spell1')}` }} />
              <Image style={styles.spellImage} source={{ uri: `summoner_spell_${game.get('spell2')}` }} />
            </View>
          </View>
          {this.renderMultiKillBadge()}
        </View>
        <View style={styles.dataCol}>
          <Text style={styles.gameTitle}>
            {gameModeParser(game.get('gameMode'))} ({this.getGameTitleLabel()})
          </Text>
          <Grid>
            <View style={styles.iconDataRow}>
              <View style={[styles.iconDataCol, styles.firstIconDataCol]}>
                <Image style={styles.iconImage} source={{ uri: 'ui_score' }} />
                <Text style={[styles.dataText, styles.scoreText]}>
                  <Text style={{ color: colors.victory }}>{game.getIn(['stats', 'championsKilled']) || '0'}</Text>/
                  <Text style={{ color: colors.defeat }}>{game.getIn(['stats', 'numDeaths']) || '0'}</Text>/
                  {game.getIn(['stats', 'assists']) || '0'}
                </Text>
              </View>
              <View style={styles.iconDataCol}>
                <Image style={styles.iconImage} source={{ uri: 'ui_minion' }} />
                <Text style={styles.dataText}>{game.getIn(['stats', 'minionsKilled']) || 0}</Text>
              </View>
              <View style={styles.iconDataCol}>
                <Image style={styles.iconImage} source={{ uri: 'ui_gold' }} />
                <MediaQuery maxDeviceWidth={400}>
                  <Text style={[styles.dataText, styles.gold]}>{numeral(game.getIn(['stats', 'goldEarned'])).format('0.0 a')}</Text>
                </MediaQuery>
                <MediaQuery minDeviceWidth={401}>
                  <Text style={[styles.dataText, styles.gold]}>{numeral(game.getIn(['stats', 'goldEarned'])).format('0,0')}</Text>
                </MediaQuery>
              </View>
            </View>
            <View style={styles.iconDataRow}>
              <View style={[styles.iconDataCol, styles.firstIconDataCol]}>
                <Image style={styles.iconImage} source={{ uri: 'ui_ward' }} />
                <Text style={styles.dataText}>{game.getIn(['stats', 'wardPlaced']) || 0}</Text>
              </View>
              <View style={styles.iconDataCol}>
                <Icon style={styles.iconImage} name="timer" size={15} />
                <Text style={styles.dataText}>{this.getTimePlayed()}</Text>
              </View>
              <View style={styles.iconDataCol}>
                <Text style={styles.dataText}>IP: </Text>
                <Text style={styles.dataText}>+{game.get('ipEarned') || 0}</Text>
              </View>
            </View>
            <Row style={styles.itemsRow}>
              {renderItemImage(game.getIn(['stats', 'item0']))}
              {renderItemImage(game.getIn(['stats', 'item1']))}
              {renderItemImage(game.getIn(['stats', 'item2']))}
              {renderItemImage(game.getIn(['stats', 'item3']))}
              {renderItemImage(game.getIn(['stats', 'item4']))}
              {renderItemImage(game.getIn(['stats', 'item5']))}
              {renderItemImage(game.getIn(['stats', 'item6']))}
            </Row>
            <Row style={[styleUtils.flexRow, styles.timeAgoRow]}>
              <Icon style={styles.iconImage} name="access-time" size={15} />
              <Text style={styles.dataText}> {moment(game.get('createDate')).fromNow()}</Text>
            </Row>
          </Grid>
        </View>
      </View>
    </View>);
  }
}

GameRecent.propTypes = {
  game: ImmutablePropTypes.mapContains({
    championId: PropTypes.number,
    spell1: PropTypes.number,
    spell2: PropTypes.number,
    subType: PropTypes.string,
    gameType: PropTypes.string,
    gameMode: PropTypes.string,
    invalid: PropTypes.bool,
    createDate: PropTypes.number,
    ipEarned: PropTypes.number,
    stats: ImmutablePropTypes.mapContains({
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
