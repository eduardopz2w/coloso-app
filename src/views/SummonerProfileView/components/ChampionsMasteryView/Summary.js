import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import { MediaQueryStyleSheet, MediaQuery } from 'react-native-responsive';
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
        width: 50,
        height: 50,
      },
      summaryText: {
        fontSize: 16,
        width: 50,
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
      level3: 0,
      level4: 0,
      level5: 0,
      level6: 0,
      level7: 0,
    };

    this.props.masteries.forEach((mastery) => {
      const championLevel = mastery.get('championLevel');
      if (championLevel === 3) {
        summary.level3 += 1;
      } else if (championLevel === 4) {
        summary.level4 += 1;
      } else if (championLevel === 5) {
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
      <MediaQuery minDeviceWidth={600}>
        <View style={styles.tierDataContainer} >
          <Image style={styles.tierImage} source={{ uri: 'tier_4' }} />
          <Text style={styles.summaryText} >{summary.level4}</Text>
        </View>
      </MediaQuery>
      <MediaQuery minDeviceWidth={750}>
        <View style={styles.tierDataContainer} >
          <Image style={styles.tierImage} source={{ uri: 'tier_3' }} />
          <Text style={styles.summaryText} >{summary.level3}</Text>
        </View>
      </MediaQuery>
    </View>);
  }
}

Summary.propTypes = {
  masteries: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
    championLevel: PropTypes.number,
  })),
};

export default Summary;
