import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import _ from 'lodash';

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
    marginLeft: -10,
  },
  dataCol: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
  },
  gameTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  iconImage: {
    width: 15,
    height: 15,
  },
  flexRow: {
    flexDirection: 'row',
  },
  itemImage: {
    width: 24,
    height: 24,
  },
  noItem: {
    width: 24,
    height: 24,
    backgroundColor: 'black',
  },
  itemsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 6,
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
    let borderColor = '#D32F2F';

    if (win) {
      borderColor = '#4CAF50';
    }

    return {
      borderLeftWidth: 5,
      borderColor,
    };
  }

  getGameTitleLabel() {
    const { subType } = this.props.game;

    if (subType.includes('RANKED')) {
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
    const { championId, spell1, spell2, gameType, createDate } = this.props.game;
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
          <View style={styles.flexRow}>
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
          <Text style={styles.gameTitle}>{gameType} ({this.getGameTitleLabel()})</Text>
          <Grid>
            <Row>
              <Col style={styles.flexRow}>
                <Image style={styles.iconImage} source={{ uri: 'ui_score' }} />
                <Text>{championsKilled || 0}/{assists || 0}/{numDeaths || 0}</Text>
              </Col>
              <Col style={styles.flexRow}>
                <Image style={styles.iconImage} source={{ uri: 'ui_minion' }} />
                <Text>{minionsKilled}</Text>
              </Col>
              <Col style={styles.flexRow}>
                <Image style={styles.iconImage} source={{ uri: 'ui_gold' }} />
                <Text>{goldEarned}</Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.flexRow}>
                <Image style={styles.iconImage} source={{ uri: 'ui_ward' }} />
                <Text>{wardPlaced || 0}</Text>
              </Col>
              <Col style={styles.flexRow}>
                <Icon name="timer" size={15} />
                <Text>
                  {timePlayedMomentDuration.minutes()}:
                  {timePlayedMomentDuration.seconds()}
                </Text>
              </Col>
              <Col style={styles.flexRow}>
                <Icon name="access-time" size={15} />
                <Text>{moment(createDate).fromNow()}</Text>
              </Col>
            </Row>
            <Row style={styles.itemsRow}>
              {renderItemImage(item0)}
              {renderItemImage(item1)}
              {renderItemImage(item2)}
              {renderItemImage(item3)}
              {renderItemImage(item4)}
              {renderItemImage(item5)}
              {renderItemImage(item6)}
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
    createDate: PropTypes.number,
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
