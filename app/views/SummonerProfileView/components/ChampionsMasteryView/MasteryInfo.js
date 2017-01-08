import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import { Col } from 'react-native-easy-grid';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import { MKProgress } from 'react-native-material-kit';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import styleUtils from '../../../../utils/styleUtils';

const styles = MediaQueryStyleSheet.create(
  {
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
  },
  {
    '@media (min-device-width: 600)': {
      championImage: {
        width: 80,
        height: 80,
        borderWidth: 5,
      },

      tier: {
        width: 70,
        height: 70,
      },

      championName: {
        fontSize: 23,
      },

      championTitle: {
        fontSize: 19,
      },

      progress: {
        height: 10,
      },

      text: {
        fontSize: 18,
      },
    },
  },
);

class MasteryInfo extends Component {
  constructor(props) {
    super(props);

    this.renderTier = this.renderTier.bind(this);
    this.renderProgress = this.renderProgress.bind(this);
  }

  renderProgress() {
    const { mastery } = this.props;
    const championPoints = mastery.get('championPoints');
    let nextLevelPoints;
    let progressNumber;
    let tintColor = '#2196F3';

    if (mastery.championLevel === 7) {
      nextLevelPoints = null;
      progressNumber = 1;
    } else {
      nextLevelPoints = championPoints + mastery.get('championPointsUntilNextLevel');
      progressNumber = championPoints / nextLevelPoints;
    }

    if (progressNumber === 1) {
      tintColor = '#d0aa49';
    }

    return (<View style={{ marginBottom: 16 }}>
      <Text style={[styleUtils.boldText, styles.text]}>Progreso:</Text>
      <View style={{ flexDirection: 'row' }}>
        <Col><Text style={styles.text}>{championPoints}</Text></Col>
        <Col><Text style={[{ textAlign: 'right' }, styles.text]}>{nextLevelPoints}</Text></Col>
      </View>
      <View>
        <MKProgress progress={progressNumber} style={styles.progress} progressColor={tintColor} />
      </View>
    </View>);
  }

  renderTier() {
    const championLevel = this.props.mastery.get('championLevel');

    if (championLevel <= 0) {
      return null;
    }

    return <Image style={styles.tier} source={{ uri: `tier_${championLevel}` }} />;
  }

  render() {
    const { mastery } = this.props;

    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginRight: 16, alignItems: 'center' }}>
          <Image style={styles.championImage} source={{ uri: `champion_square_${mastery.get('championId')}` }} />
          {this.renderTier()}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.championName}>{mastery.getIn(['championData', 'name'])}</Text>
          <Text numberOfLines={1} style={styles.championTitle}>{mastery.getIn(['championData', 'title'])}</Text>
          {this.renderProgress()}
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styleUtils.boldText, styles.text]}>Cofre Disponible: </Text>
            <Text style={styles.text}>{mastery.get('chestGranted') ? 'No' : 'Si'}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styleUtils.boldText, styles.text]}>Piezas de Maestria: </Text>
            <Text style={styles.text}>{mastery.get('tokensEarned')}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styleUtils.boldText, styles.text]}>Jugado: </Text>
            <Text style={styles.text}>{moment(mastery.get('lastPlayTime')).fromNow()}</Text>
          </View>
        </View>
      </View>
    );
  }
}

MasteryInfo.propTypes = {
  mastery: ImmutablePropTypes.mapContains({
    championId: PropTypes.number.isRequired,
    championLevel: PropTypes.number,
    championPoints: PropTypes.number,
    championPointsSinceLastLevel: PropTypes.number,
    championPointsUntilNextLevel: PropTypes.number,
    chestGranted: PropTypes.bool,
    lastPlayTime: PropTypes.number,
    championData: ImmutablePropTypes.mapContains({
      name: PropTypes.string.isRequied,
      title: PropTypes.string.isRequied,
    }),
  }),
};

export default MasteryInfo;
