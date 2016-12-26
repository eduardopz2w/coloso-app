import React, { Component, PropTypes } from 'react';
import { View, Text, Image, ListView } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';


const styles = MediaQueryStyleSheet.create(
  {
    root: {},
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
  },
  {
    '@media (min-device-width: 600)': {
      runeImage: {
        width: 80,
        height: 80,
      },
      countText: {
        fontSize: 16,
        width: 24,
        height: 24,
      },
      titleText: {
        fontSize: 20,
      },
      descriptionText: {
        fontSize: 18,
      },
      messageText: {
        fontSize: 18,
      },
    },
  },
);

function getRuneImageUri(runeImage) {
  return `rune_${runeImage}`.replace('.png', '');
}

function renderRow(rune) {
  return (<View style={styles.runeRow}>
    <Image style={styles.runeImage} source={{ uri: getRuneImageUri(rune.image.full) }} >
      <Text style={styles.countText}>x{rune.count}</Text>
    </Image>
    <View style={styles.dataCol}>
      <Text style={styles.titleText}>{rune.name}</Text>
      <Text style={styles.descriptionText}>{rune.description}</Text>
    </View>
  </View>);
}

class RunePage extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
  }

  render() {
    const { runes } = this.props.page;

    if (runes.length === 0) {
      return <Text style={styles.messageText}>Esta página de runas está vacía.</Text>;
    }

    return (<ListView
      contentContainerStyle={styles.container}
      dataSource={this.ds.cloneWithRows(runes)}
      renderRow={renderRow}
    />);
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
