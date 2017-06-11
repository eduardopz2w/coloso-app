import React, { PureComponent, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { MediaQueryStyleSheet } from 'react-native-responsive';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      flexDirection: 'row',
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 8,
      backgroundColor: 'rgba(0,0,0,0.1)',
      alignItems: 'center',
    },
    championImage: {
      width: 35,
      height: 35,
      marginRight: 4,
      marginLeft: 4,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: 'black',
    },
    text: {
      fontSize: 15,
      flex: 1,
      fontWeight: 'bold',
    },
  },
  {
    '@media (min-device-width: 400)': {
      championImage: {
        marginLeft: 12,
        marginRight: 12,
      },
    },
  },
  {
    '@media (min-device-width: 600)': {
      root: {
        paddingLeft: 24,
        paddingRight: 24,
      },
      text: {
        fontSize: 18,
      },
      championImage: {
        width: 45,
        height: 45,
      },
    },
  },
);

class BannedChampions extends PureComponent {
  render() {
    const champions = this.props.champions;

    return (<View style={styles.root}>
      <Text style={styles.text}>Baneos:</Text>
      {champions.map((champion, key) => <Image
        key={key}
        style={styles.championImage}
        source={{ uri: `champion_square_${champion.get('championId')}` }}
      />)}
    </View>);
  }
}

BannedChampions.propTypes = {
  champions: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
    championId: PropTypes.number.isRequired,
  })),
};

export default BannedChampions;
