import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';

class ChampionsMastery extends Component {
  constructor(props) {
    super(props);

    this.renderMastery = this.renderMastery.bind(this);
    this.renderProgress = this.renderProgress.bind(this);
    this.renderChestStatus = this.renderChestStatus.bind(this);
    this.handleOnPress = this.handleOnPress.bind(this);
    this.getStyles = this.getStyles.bind(this);
  }

  getStyles() {
    const { progressWidth, championImageSize } = this.props;
    const masterySize = championImageSize - 20;

    return {
      root: {
        margin: 2,
        height: championImageSize + (masterySize / 2) + progressWidth,
      },
      championImage: {
        width: championImageSize,
        height: championImageSize,
        borderRadius: 50,
        position: 'absolute',
        top: progressWidth,
        left: progressWidth,
      },
      imageAndProgressContainer: {
        position: 'relative',
      },
      masteryImage: {
        position: 'absolute',
        bottom: (masterySize / 2.3) * -1,
        width: masterySize,
        height: masterySize,
        left: ((championImageSize + (progressWidth * 2)) / 2) - (masterySize / 2),
      },
      chestImage: {
        width: masterySize * 0.5,
        height: masterySize * 0.5,
        top: 2,
        right: 2,
        position: 'absolute',
      },
    };
  }

  handleOnPress() {
    return this.props.onPress(this.props.mastery.championId);
  }

  renderMastery(styles) {
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

    if (fill >= 99.99) {
      tintColor = '#d0aa49';
    }

    return (<CircularProgress
      size={this.props.championImageSize + (this.props.progressWidth * 2)}
      width={this.props.progressWidth}
      fill={fill}
      tintColor={tintColor}
      rotation={180}
      backgroundColor="#BBB"
    />);
  }

  renderChestStatus(styles) {
    const { chestGranted } = this.props.mastery;
    let chestUri = 'chest_available';

    if (chestGranted) {
      chestUri = 'chest_unavailable';
    }

    return <Image style={styles.chestImage} source={{ uri: chestUri }} />;
  }

  render() {
    const { championId } = this.props.mastery;
    const styles = this.getStyles();

    return (<TouchableWithoutFeedback onPress={this.handleOnPress}>
      <View style={styles.root}>
        <View style={styles.imageAndProgressContainer}>
          {this.renderProgress()}
          <Image style={styles.championImage} source={{ uri: `champion_square_${championId}` }} />
          {this.renderMastery(styles)}
          {this.renderChestStatus(styles)}
        </View>
      </View>
    </TouchableWithoutFeedback>);
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
  championImageSize: PropTypes.number.isRequired,
  progressWidth: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ChampionsMastery;
