import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const styles = StyleSheet.create({
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
    marginRight: 16,
    marginLeft: 16,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
  },
  text: {
    fontSize: 15,
    flex: 1,
    fontWeight: 'bold',
  },
});

class BannedChampions extends Component {
  render() {
    const champions = this.props.champions;
    console.log(champions);
    return (<View style={styles.root}>
      <Text style={styles.text}>Baneos:</Text>
      {champions.map((champion, key) => <Image
        key={key}
        style={styles.championImage}
        source={{ uri: `champion_square_${champion.championId}` }}
      />)}
    </View>);
  }
}

BannedChampions.propTypes = {
  champions: PropTypes.arrayOf(PropTypes.shape({
    championId: PropTypes.number.isRequired,
  })),
};

export default BannedChampions;
