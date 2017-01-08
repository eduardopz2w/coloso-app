import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import ImmutablePropTypes from 'react-immutable-proptypes';


const styles = MediaQueryStyleSheet.create(
  {
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: 'rgba(0,0,0,0.1)',
    },

    tierImage: {
      width: 40,
      height: 40,
      zIndex: 1,
    },

    summaryText: {
      fontWeight: 'bold',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: 'white',
      width: 50,
      textAlign: 'center',
      marginLeft: -12,
      paddingLeft: 12,
      borderRadius: 5,
    },

    tierDataContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  }, {
    '@media (min-device-width: 600)': {
      tierImage: {
        width: 60,
        height: 60,
      },
      summaryText: {
        fontSize: 18,
        width: 65,
      },
    },
  },
);

class Summary extends Component {
  constructor(props) {
    super(props);

    this.getSummary = this.getSummary.bind(this);
  }

  getSummary() {
    const summary = {
      level5: 0,
      level6: 0,
      level7: 0,
    };

    this.props.masteries.forEach((mastery) => {
      const championLevel = mastery.get('championLevel');

      if (championLevel === 5) {
        summary.level5 += 1;
      } else if (championLevel === 6) {
        summary.level6 += 1;
      } else if (championLevel === 7) {
        summary.level7 += 1;
      }
    });

    return summary;
  }
  render() {
    const summary = this.getSummary();

    return (<View style={styles.root}>
      <View style={styles.tierDataContainer} >
        <Image style={styles.tierImage} source={{ uri: 'tier_7' }} />
        <Text style={styles.summaryText} >{summary.level7}</Text>
      </View>
      <View style={styles.tierDataContainer} >
        <Image style={styles.tierImage} source={{ uri: 'tier_6' }} />
        <Text style={styles.summaryText} >{summary.level6}</Text>
      </View>
      <View style={styles.tierDataContainer} >
        <Image style={styles.tierImage} source={{ uri: 'tier_5' }} />
        <Text style={styles.summaryText} >{summary.level5}</Text>
      </View>
    </View>);
  }
}

Summary.propTypes = {
  masteries: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
    championLevel: PropTypes.number,
  })),
};

export default Summary;
