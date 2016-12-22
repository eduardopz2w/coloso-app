import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Grid, Row } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import _ from 'lodash';
import colors from '../../../../utils/colors';
import styleUtils from '../../../../utils/styleUtils';
import riotConstantsParser from '../../../../utils/riotConstantsParser';

const styles = StyleSheet.create({
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
});

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
            {riotConstantsParser(gameMode)} ({this.getGameTitleLabel()})
          </Text>
          <Grid>
            <View style={styles.iconDataRow}>
              <View style={styles.iconDataCol}>
                <Image style={styles.iconImage} source={{ uri: 'ui_score' }} />
                <Text>{championsKilled || '0'}/{assists || '0'}/{numDeaths || '0'}</Text>
              </View>
              <View style={styles.iconDataCol}>
                <Image style={styles.iconImage} source={{ uri: 'ui_minion' }} />
                <Text>{minionsKilled}</Text>
              </View>
              <View style={styles.iconDataCol}>
                <Image style={styles.iconImage} source={{ uri: 'ui_gold' }} />
                <Text>{goldEarned}</Text>
              </View>
              <View style={styles.iconDataCol}>
                <Image style={styles.iconImage} source={{ uri: 'ui_ward' }} />
                <Text>{wardPlaced || 0}</Text>
              </View>
              <View style={styles.iconDataCol}>
                <Icon name="timer" size={15} />
                <Text>{moment(timePlayedMomentDuration.asMilliseconds()).format('mm:ss')}</Text>
              </View>
              <View style={styles.iconDataCol}>
                <Text>IP: </Text>
                <Text>+{ipEarned || 0}</Text>
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
              <Icon name="access-time" size={15} />
              <Text> {moment(createDate).fromNow()}</Text>
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
