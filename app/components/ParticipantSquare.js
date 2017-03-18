import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';

class ParticipantSquare extends Component {
  constructor(props) {
    super(props);

    this.getStyles = this.getStyles.bind(this);
    this.renderLevel = this.renderLevel.bind(this);
  }

  getStyles() {
    const size = this.props.size;

    return {
      container: {
        flexDirection: 'row',
      },
      championImageContainer: {
        width: size,
        height: size,
        position: 'relative',
      },
      championImage: {
        width: size,
        height: size,
        borderRadius: 50,
        zIndex: 1,
        borderWidth: 1,
        borderColor: 'black',
      },
      spellImage: {
        width: size / 2,
        height: size / 2,
        borderRadius: 50,
        marginLeft: size * -0.15,
        borderWidth: 1,
        borderColor: 'black',
      },
    };
  }

  renderLevel() {
    const level = this.props.level;
    const styles = {
      fontSize: this.props.size * 0.20,
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: 'black',
      borderRadius: 50,
      width: this.props.size * 0.35,
      height: this.props.size * 0.35,
      position: 'absolute',
      bottom: 0,
      left: 0,
      zIndex: 2,
      textAlign: 'center',
      textAlignVertical: 'center',
    };

    if (level > 0) {
      return <Text style={styles}>{level}</Text>;
    }

    return null;
  }

  render() {
    const styles = this.getStyles();

    return (<View style={[styles.root, this.props.style]}>
      <View style={styles.container}>
        <View style={styles.championImageContainer}>
          <Image style={styles.championImage} source={{ uri: `champion_square_${this.props.championId}` }} />
          {this.renderLevel()}
        </View>
        <View style={styles.spellsCol}>
          <Image style={styles.spellImage} source={{ uri: `summoner_spell_${this.props.spell1Id}` }} />
          <Image style={styles.spellImage} source={{ uri: `summoner_spell_${this.props.spell2Id}` }} />
        </View>
      </View>
    </View>);
  }
}

ParticipantSquare.propTypes = {
  championId: PropTypes.number.isRequired,
  spell1Id: PropTypes.number.isRequired,
  spell2Id: PropTypes.number.isRequired,
  level: PropTypes.number,
  size: PropTypes.number.isRequired,
  style: View.propTypes.style,
};

ParticipantSquare.defaultProps = {
  size: 60,
};

export default ParticipantSquare;
