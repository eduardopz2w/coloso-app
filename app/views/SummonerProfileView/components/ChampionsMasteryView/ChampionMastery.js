import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';

const CHAMPION_IMAGE_SIZE = 70;
const PROGRESS_WIDTH = 5;
const MASTERY_SIZE = 50;

const styles = StyleSheet.create({
  root: {
    margin: 2,
    height: 100,
  },
  championImage: {
    width: CHAMPION_IMAGE_SIZE,
    height: CHAMPION_IMAGE_SIZE,
    borderRadius: 50,
    position: 'absolute',
    top: PROGRESS_WIDTH,
    left: PROGRESS_WIDTH,
  },
  imageAndProgressContainer: {
    position: 'relative',
  },
  masteryImage: {
    position: 'absolute',
    bottom: (MASTERY_SIZE / 2.3) * -1,
    width: MASTERY_SIZE,
    height: MASTERY_SIZE,
    left: ((CHAMPION_IMAGE_SIZE + (PROGRESS_WIDTH * 2)) / 2) - (MASTERY_SIZE / 2),
  },
  chestImage: {
    width: 25,
    height: 25,
    top: 2,
    right: 2,
    position: 'absolute',
  },
});

class ChampionsMastery extends Component {
  constructor(props) {
    super(props);

    this.renderMastery = this.renderMastery.bind(this);
    this.renderProgress = this.renderProgress.bind(this);
    this.renderChestStatus = this.renderChestStatus.bind(this);
  }

  renderMastery() {
    const { championLevel } = this.props.mastery;
    if (championLevel === 0) {
      return null;
    }

    const masteryUri = `tier_${championLevel}`;

    return <Image style={styles.masteryImage} source={{ uri: masteryUri }} />;
  }

  renderProgress() {
    let fill;
    let tintColor = '#2196F3'; // Default color
    const { championPointsUntilNextLevel, championPoints } = this.props.mastery;
    const nextLevelPoints = championPoints + championPointsUntilNextLevel;

    if (championPointsUntilNextLevel === 0) {
      fill = 100;
    }

    fill = (championPoints * 100) / nextLevelPoints;

    if (fill >= 99) {
      tintColor = '#d0aa49';
    }

    return (<CircularProgress
      size={CHAMPION_IMAGE_SIZE + (PROGRESS_WIDTH * 2)}
      width={PROGRESS_WIDTH}
      fill={fill}
      tintColor={tintColor}
      rotation={180}
      backgroundColor="#BBB"
    />);
  }

  renderChestStatus() {
    const { chestGranted } = this.props.mastery;
    let chestUri = 'chest_available';

    if (chestGranted) {
      chestUri = 'chest_unavailable';
    }

    return <Image style={styles.chestImage} source={{ uri: chestUri }} />;
  }

  render() {
    const { championId } = this.props.mastery;

    return (<View style={styles.root}>
      <View style={styles.imageAndProgressContainer}>
        {this.renderProgress()}
        <Image style={styles.championImage} source={{ uri: `champion_square_${championId}` }} />
        {this.renderMastery()}
        {this.renderChestStatus()}
      </View>

    </View>);
  }

}

ChampionsMastery.propTypes = {
  mastery: PropTypes.shape({
    championId: PropTypes.number.isRequired,
    championLevel: PropTypes.number,
    championPoints: PropTypes.number,
    championPointsSinceLastLevel: PropTypes.number,
    championPointsUntilNextLevel: PropTypes.number,
    chestGranted: PropTypes.bool,
  }),
};

export default ChampionsMastery;
