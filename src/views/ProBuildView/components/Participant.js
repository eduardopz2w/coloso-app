import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableNativeFeedback } from 'react-native';
import numeral from 'numeral';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { MediaQuery, MediaQueryStyleSheet } from 'react-native-responsive';

import ParticipantSquare from '../../../components/ParticipantSquare';
import FinalItems from '../../../components/FinalItems';
import colors from '../../../utils/colors';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      padding: 16,
      flexDirection: 'row',
      borderTopWidth: 1,
      borderColor: 'rgba(0,0,0,0.3)',
    },
    summonerName: {
      color: colors.text.primary,
      fontWeight: 'bold',
      fontSize: 17,
      marginBottom: 4,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dataCol: {
      flex: 1,
    },
    uiImage: {
      width: 18,
      height: 18,
      marginRight: 2,
    },
    totalScore: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    kills: {
      color: colors.victory,
    },
    deaths: {
      color: colors.defeat,
    },
    minionsKilled: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    goldText: {
      color: colors.tiers.gold,
      fontWeight: 'bold',
      textShadowColor: '#000',
      textShadowOffset: {
        width: 0.2,
        height: 0.2,
      },
      fontSize: 16,
    },
  }, {
    '@media (min-device-width: 750)': {
      dataCol: {
        marginHorizontal: 16,
      },
    },
  },
);

class Participant extends PureComponent {
  constructor(props) {
    super(props);

    this.deviceWidth = Dimensions.get('window').width;
    this.getGoldText = this.getGoldText.bind(this);
    this.getParticipantSquareSize = this.getParticipantSquareSize.bind(this);
    this.getItemSize = this.getItemSize.bind(this);
  }

  getGoldText() {
    const gold = this.props.participant.getIn(['stats', 'goldEarned']) || 0;

    if (this.deviceWidth <= 400) {
      return numeral(gold).format('0a');
    }

    return numeral(gold).format('0,0');
  }

  getParticipantSquareSize() {
    let size = 40;

    if (this.deviceWidth <= 399) {
      size = 45;
    } else if (this.deviceWidth <= 599) {
      size = 60;
    } else if (this.deviceWidth >= 600) {
      size = 70;
    }

    return size;
  }

  getItemSize() {
    let size;

    if (this.deviceWidth <= 399) {
      size = 24;
    } else if (this.deviceWidth <= 599) {
      size = 32;
    } else if (this.deviceWidth >= 600) {
      size = 42;
    }

    return size;
  }

  render() {
    const participantData = this.props.participant;

    return (<TouchableNativeFeedback
      onPress={() => {
        this.props.onPressParticipant(this.props.participant.getIn(['summoner', 'summonerId']));
      }}
    >
      <View style={styles.root}>
        <ParticipantSquare
          style={{ marginRight: 16 }}
          championId={participantData.get('championId')}
          spell1Id={participantData.get('spell1Id')}
          spell2Id={participantData.get('spell2Id')}
          level={participantData.getIn(['stats', 'champLevel'])}
          size={this.getParticipantSquareSize()}
        />
        <View style={styles.dataCol}>
          <View style={styles.row}>
            <Text style={styles.summonerName}>{participantData.getIn(['summoner', 'summonerName'])}</Text>
          </View>
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <View style={styles.row}>
              <Image style={styles.uiImage} source={{ uri: 'ui_score' }} />
              <Text style={styles.totalScore}>
                <Text style={styles.kills}>{participantData.getIn(['stats', 'kills']) || 0}</Text>/
                <Text style={styles.deaths}>{participantData.getIn(['stats', 'deaths']) || 0}</Text>/
                <Text>{participantData.getIn(['stats', 'assists']) || 0}</Text>
              </Text>
            </View>

            <View style={styles.row}>
              <Image style={styles.uiImage} source={{ uri: 'ui_minion' }} />
              <Text style={styles.minionsKilled}>
                {participantData.getIn(['stats', 'totalMinionsKilled']) || 0}
              </Text>
            </View>

            <View style={styles.row}>
              <Image style={styles.uiImage} source={{ uri: 'ui_gold' }} />
              <Text style={styles.goldText}>
                {this.getGoldText()}
              </Text>
            </View>

            <MediaQuery minDeviceWidth={600}>
              <View style={styles.row}>
                <Image style={styles.uiImage} source={{ uri: 'ui_ward' }} />
                <Text style={styles.minionsKilled}>
                  {participantData.getIn(['stats', 'wardsPlaced']) || 0}
                </Text>
              </View>
            </MediaQuery>
          </View>

          <View style={styles.row}>
            <FinalItems
              style={{ flex: 1, marginTop: 8 }}
              item0={participantData.getIn(['stats', 'item0'])}
              item1={participantData.getIn(['stats', 'item1'])}
              item2={participantData.getIn(['stats', 'item2'])}
              item3={participantData.getIn(['stats', 'item3'])}
              item4={participantData.getIn(['stats', 'item4'])}
              item5={participantData.getIn(['stats', 'item5'])}
              item6={participantData.getIn(['stats', 'item6'])}
              size={this.getItemSize()}
            />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>);
  }
}

Participant.propTypes = {
  participant: ImmutablePropTypes.mapContains({
    spell1Id: PropTypes.number.isRequired,
    spell2Id: PropTypes.number.isRequired,
    championId: PropTypes.number.isRequired,
    summoner: ImmutablePropTypes.mapContains({
      summonerId: PropTypes.string.isRequired,
      summonerName: PropTypes.string.isRequired,
    }).isRequired,
    champion: ImmutablePropTypes.mapContains({
      name: PropTypes.string.isRequired,
    }).isRequired,
    stats: ImmutablePropTypes.mapContains({
      item0: PropTypes.number,
      item1: PropTypes.number,
      item2: PropTypes.number,
      item3: PropTypes.number,
      item4: PropTypes.number,
      item5: PropTypes.number,
      item6: PropTypes.number,
      kills: PropTypes.number,
      deaths: PropTypes.number,
      assists: PropTypes.number,
      goldEarned: PropTypes.number.isRequired,
      totalMinionsKilled: PropTypes.number.isRequired,
      champLevel: PropTypes.number.isRequired,
      wardsPlaced: PropTypes.number,
    }).isRequired,
  }).isRequired,
  onPressParticipant: PropTypes.func.isRequired,
};

export default Participant;
