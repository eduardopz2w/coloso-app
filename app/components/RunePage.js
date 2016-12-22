import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  root: {},
  container: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  runeImage: {
    width: 50,
    height: 50,
    position: 'relative',
    marginRight: 18,
  },
  runeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: '#BBB',
    borderBottomWidth: 1,
  },
  countText: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    textAlign: 'center',
    fontSize: 11,
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 50,
  },
  dataCol: {
    flex: 1,
  },
  titleText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 12,
  },
});

function getRuneImageUri(runeImage) {
  return `rune_${runeImage}`.replace('.png', '');
}

class RunePage extends Component {
  render() {
    const { runes } = this.props.page;

    return (<ScrollView contentContainerStyle={styles.container}>
      {runes.map((rune, key) => <View style={styles.runeRow} key={key} >
        <Image style={styles.runeImage} source={{ uri: getRuneImageUri(rune.image.full) }} >
          <Text style={styles.countText}>x{rune.count}</Text>
        </Image>
        <View style={styles.dataCol}>
          <Text style={styles.titleText}>{rune.name}</Text>
          <Text style={styles.descriptionText}>{rune.description}</Text>
        </View>
      </View>)}
    </ScrollView>);
  }
}

RunePage.propTypes = {
  page: PropTypes.shape({
    name: PropTypes.string,
    runes: PropTypes.arrayOf(PropTypes.shape({
      runeId: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.shape({
        full: PropTypes.string.isRequired,
      }),
    })).isRequired,
  }),
};

export default RunePage;
