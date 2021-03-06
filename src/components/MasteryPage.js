import React, { Component, PropTypes } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import Immutable from 'immutable';

const styles = MediaQueryStyleSheet.create(
  {
    rootScrollView: {
      paddingTop: 10,
    },
    root: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      paddingBottom: 16,
    },
    masteryRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
    masteryImage: {
      width: 42,
      height: 42,
      borderRadius: 5,
      borderColor: 'black',
      borderWidth: 2,
    },
    masteryActive: {
      borderColor: '#d0aa49',
    },
    masteryImageContainer: {
      width: 42,
      height: 42,
      position: 'relative',
    },
    circular: {
      borderRadius: 50,
    },
    rankText: {
      position: 'absolute',
      bottom: 2,
      right: 2,
      width: 20,
      color: 'white',
      fontSize: 10,
      backgroundColor: 'black',
      textAlign: 'center',
      borderRadius: 5,
      fontWeight: 'bold',
    },
    masteryPageContainer: {
      minWidth: 190,
      padding: 8,
      borderRadius: 10,
      alignSelf: 'center',
      marginBottom: 16,
      marginRight: 16,
    },
    ferocitypage: {
      backgroundColor: 'rgba(255,0,0,0.2)',
      borderColor: 'red',
      borderWidth: 5,
    },
    cunningpage: {
      backgroundColor: 'rgba(0,0,255,0.2)',
      borderColor: 'blue',
      borderWidth: 5,
    },
    resolvePage: {
      backgroundColor: 'rgba(0,255,0,0.2)',
      borderColor: 'green',
      borderWidth: 5,
    },
  }, {
    '@media (min-device-width: 600)': {
      masteryPageContainer: {
        minWidth: 260,
      },
      masteryImage: {
        width: 55,
        height: 55,
      },
      masteryImageContainer: {
        width: 55,
        height: 55,
      },
      masteryRow: {
        marginBottom: 16,
      },
      rankText: {
        fontSize: 14,
      },
    },
  },
);

const FEROCITY_ROWS = [
  [6111, 6114],
  [6121, 6122, 6123],
  [6131, 6134],
  [6141, 6142, 6143],
  [6151, 6154],
  [6161, 6162, 6164],
];

const RESOLVE_ROWS = [
  [6211, 6212],
  [6221, 6222, 6223],
  [6231, 6232],
  [6241, 6242, 6243],
  [6251, 6252],
  [6261, 6262, 6263],
];

const CUNNING_ROWS = [
  [6311, 6312],
  [6321, 6322, 6323],
  [6331, 6332],
  [6341, 6342, 6343],
  [6351, 6352],
  [6361, 6362, 6363],
];

class MasteryPage extends Component {
  constructor(props) {
    super(props);

    this.renderPage = this.renderPage.bind(this);
    this.renderMasteryImage = this.renderMasteryImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!Immutable.is(nextProps.page, this.props.page)) {
      this.mainScroll.scrollTo({ x: 0, y: 0, animated: false });
    }
  }

  renderMasteryImage(masteryId, rowIndex) {
    let isCircular = false;
    const masteries = this.props.page.get('masteries');

    if (rowIndex % 2 !== 0) {
      isCircular = true;
    }

    if (masteries) {
      const indexFound = masteries.findIndex((mastery) => {
        if (mastery.get('id') === masteryId) {
          return true;
        } else if (mastery.get('masteryId') === masteryId) {
          return true;
        }

        return false;
      });

      if (indexFound >= 0) {
        const rank = masteries.getIn([indexFound, 'rank']);

        return (<View style={styles.masteryImageContainer}>
          <Image style={[styles.masteryImage, styles.masteryActive, isCircular && styles.circular]} source={{ uri: `mastery_${masteryId}` }} />
          { !isCircular && <Text style={styles.rankText}>{rank}</Text> }
        </View>);
      }
    }

    return (<View style={styles.masteryImageContainer}>
      <Image style={[styles.masteryImage, isCircular && styles.circular]} source={{ uri: `mastery_gray_${masteryId}` }} />
    </View>);
  }

  renderPage(rows, pageStyle) {
    return (<View style={[styles.masteryPageContainer, pageStyle]}>
      {rows.map((row, rowIndex) => <View key={rowIndex} style={styles.masteryRow}>
        {row.map((masteryId, masteryIndex) => <View key={masteryIndex}>
          <View>{this.renderMasteryImage(masteryId, rowIndex)}</View>
        </View>)}
      </View>)}
    </View>);
  }

  render() {
    return (<ScrollView
      style={styles.rootScrollView}
      contentContainerStyle={styles.root}
      ref={(mainScroll) => { this.mainScroll = mainScroll; }}
    >
      {this.renderPage(FEROCITY_ROWS, styles.ferocitypage)}
      {this.renderPage(CUNNING_ROWS, styles.cunningpage)}
      {this.renderPage(RESOLVE_ROWS, styles.resolvePage)}
    </ScrollView>);
  }
}

MasteryPage.propTypes = {
  page: ImmutablePropTypes.mapContains({
    name: PropTypes.string,
    masteries: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
      id: PropTypes.number,
      masteryId: PropTypes.number,
      rank: PropTypes.number.isRequired,
    })),
  }).isRequired,
};

export default MasteryPage;
