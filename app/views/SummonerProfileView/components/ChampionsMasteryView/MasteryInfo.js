import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Col } from 'react-native-easy-grid';
import { MKProgress } from 'react-native-material-kit';
import moment from 'moment';
import styleUtils from '../../../../utils/styleUtils';

const styles = StyleSheet.create({
  root: {},
  championImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
  championName: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  championTitle: {
    fontSize: 14,
    marginBottom: 16,
  },

  tier: {
    width: 50,
    height: 50,
  },

  progress: {
    flex: 1,
    height: 5,
    borderRadius: 7,
  },
});

class MasteryInfo extends Component {
  constructor(props) {
    super(props);

    this.renderTier = this.renderTier.bind(this);
    this.renderProgress = this.renderProgress.bind(this);
  }

  renderProgress() {
    const { mastery } = this.props;
    let nextLevelPoints;
    let progressNumber;
    let tintColor = '#2196F3';

    if (mastery.championLevel === 7) {
      nextLevelPoints = null;
      progressNumber = 1;
    } else {
      nextLevelPoints = mastery.championPoints + mastery.championPointsUntilNextLevel;
      progressNumber = mastery.championPoints / nextLevelPoints;
    }

    if (progressNumber === 1) {
      tintColor = '#d0aa49';
    }

    return (<View style={{ marginBottom: 16 }}>
      <Text style={styleUtils.boldText}>Progreso:</Text>
      <View style={{ flexDirection: 'row' }}>
        <Col><Text>{mastery.championPoints}</Text></Col>
        <Col><Text style={{ textAlign: 'right' }}>{nextLevelPoints}</Text></Col>
      </View>
      <View>
        <MKProgress progress={progressNumber} style={styles.progress} progressColor={tintColor} />
      </View>
    </View>);
  }

  renderTier() {
    if (this.props.mastery.championLevel <= 0) {
      return null;
    }

    return <Image style={styles.tier} source={{ uri: `tier_${this.props.mastery.championLevel}` }} />;
  }

  render() {
    const { mastery } = this.props;
    const { championData } = mastery;

    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginRight: 16, alignItems: 'center' }}>
          <Image style={styles.championImage} source={{ uri: `champion_square_${mastery.championId}` }} />
          {this.renderTier()}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.championName}>{championData.name}</Text>
          <Text style={styles.championTitle}>{championData.title}</Text>
          {this.renderProgress()}
          <View style={{ flexDirection: 'row' }}>
            <Text style={styleUtils.boldText}>Cofre Disponible: </Text>
            <Text>{mastery.chestGranted ? 'No' : 'Si'}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styleUtils.boldText}>Piezas de Maestria: </Text>
            <Text>{mastery.tokensEarned}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styleUtils.boldText}>Jugado: </Text>
            <Text>{moment(mastery.lastPlayTime).fromNow()}</Text>
          </View>
        </View>
      </View>
    );
  }
}

MasteryInfo.propTypes = {
  mastery: PropTypes.shape({
    championId: PropTypes.number.isRequired,
    championLevel: PropTypes.number,
    championPoints: PropTypes.number,
    championPointsSinceLastLevel: PropTypes.number,
    championPointsUntilNextLevel: PropTypes.number,
    chestGranted: PropTypes.bool,
    lastPlayTime: PropTypes.number,
    championData: PropTypes.shape({
      name: PropTypes.string.isRequied,
      title: PropTypes.string.isRequied,
    }),
  }),
};

export default MasteryInfo;
