import React, { PureComponent, PropTypes } from 'react';
import { View, Dimensions, Image, Text } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import numeral from 'numeral';
import _ from 'lodash';
import { MediaQueryStyleSheet, MediaQuery } from 'react-native-responsive';
import I18n from 'i18n-js';

import { colors, styleUtils, gameModeParser } from '../../../../utils';
import { ParticipantSquare, FinalItems } from '../../../../components';

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
    '@media (min-device-width: 600)': {
      multikillText: {
        fontSize: 15,
      },
      dataCol: {
        paddingLeft: 16,
        paddingRight: 16,
      },
      firstIconDataCol: {
        flex: 1,
      },
      gameTitle: {
        fontSize: 16,
      },
      iconImage: {
        width: 25,
        height: 25,
        marginRight: 8,
      },
      dataText: {
        fontSize: 16,
      },
    },
  },
);

class GameRecent extends PureComponent {
  constructor(props) {
    super(props);

    this.deviceDimensions = Dimensions.get('window');
    this.getBorderLeftStyle = this.getBorderLeftStyle.bind(this);
    this.getGameTitleLabel = this.getGameTitleLabel.bind(this);
    this.renderMultiKillBadge = this.renderMultiKillBadge.bind(this);
    this.getTimePlayed = this.getTimePlayed.bind(this);
    this.getParticipantSquareSize = this.getParticipantSquareSize.bind(this);
    this.getItemSize = this.getItemSize.bind(this);
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

  getParticipantSquareSize() {
    let size;

    if (this.deviceDimensions.width <= 599) {
      size = 50;
    } else if (this.deviceDimensions.width >= 600) {
      size = 70;
    }

    return size;
  }

  getItemSize() {
    let size;

    if (this.deviceDimensions.width <= 399) {
      size = 25;
    } else if (this.deviceDimensions.width <= 599) {
      size = 32;
    } else if (this.deviceDimensions.width <= 749) {
      size = 40;
    } else {
      size = 45;
    }

    return size;
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
          <ParticipantSquare
            championId={game.get('championId')}
            spell1Id={game.get('spell1')}
            spell2Id={game.get('spell2')}
            level={game.getIn(['stats', 'level'])}
            size={this.getParticipantSquareSize()}
          />
          {this.renderMultiKillBadge()}
        </View>
        <View style={styles.dataCol}>
          <Text style={styles.gameTitle}>
            {gameModeParser(game.get('gameMode'))} ({this.getGameTitleLabel()})
          </Text>
          <View>
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
                <Icon style={{ marginRight: 4 }} name="timer" size={15} />
                <Text style={styles.dataText}>{this.getTimePlayed()}</Text>
              </View>
              <View style={styles.iconDataCol}>
                <Text style={styles.dataText}>IP: </Text>
                <Text style={styles.dataText}>+{game.get('ipEarned') || 0}</Text>
              </View>
            </View>
            <View style={{ marginVertical: 8 }}>
              <FinalItems
                item0={game.getIn(['stats', 'item0'])}
                item1={game.getIn(['stats', 'item1'])}
                item2={game.getIn(['stats', 'item2'])}
                item3={game.getIn(['stats', 'item3'])}
                item4={game.getIn(['stats', 'item4'])}
                item5={game.getIn(['stats', 'item5'])}
                item6={game.getIn(['stats', 'item6'])}
                size={this.getItemSize()}
              />
            </View>
            <View style={[styleUtils.flexRow, styles.timeAgoRow]}>
              <Icon name="access-time" size={15} style={{ marginRight: 4 }} />
              <Text style={styles.dataText}> {moment(game.get('createDate')).fromNow()}</Text>
            </View>
          </View>
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
