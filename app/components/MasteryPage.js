import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import _ from 'lodash';

const styles = StyleSheet.create({
  rootScrollView: {
    paddingTop: 10,
  },
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  masteryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  masteryImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 2,
  },
  masteryImageContainer: {
    width: 40,
    height: 40,
    position: 'relative',
  },
  rankText: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    color: 'white',
    fontSize: 10,
    backgroundColor: 'black',
    textAlign: 'center',
  },
  masteryPageContainer: {
    minWidth: 200,
    padding: 8,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 16,
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
});

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
  [6363, 6362, 6363],
];


class MasteryPage extends Component {
  constructor(props) {
    super(props);

    this.renderPage = this.renderPage.bind(this);
    this.renderMasteryImage = this.renderMasteryImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      this.mainScroll.scrollTo(0);
    }
  }

  renderMasteryImage(masteryId) {
    let indexFound = _.findIndex(this.props.page.masteries, { id: masteryId });

    if (indexFound === -1) {
      // Si el array usa "masteryId" en lugar de solo "id"
      indexFound = _.findIndex(this.props.page.masteries, { masteryId });
    }

    let masteryUri = `mastery_gray_${masteryId}`;
    let rank;

    if (indexFound >= 0) {
      masteryUri = `mastery_${masteryId}`;
      rank = this.props.page.masteries[indexFound].rank;
    }

    return (<View style={styles.masteryImageContainer}>
      <Image style={styles.masteryImage} source={{ uri: masteryUri }} />
      {rank > 1 && <Text style={styles.rankText}>{rank}</Text>}
    </View>);
  }

  renderPage(rows, pageStyle) {
    return (<View style={[styles.masteryPageContainer, pageStyle]}>
      {rows.map((row, rowIndex) => <View key={rowIndex} style={styles.masteryRow}>
        {row.map((masteryId, masteryIndex) => <View key={masteryIndex}>
          <View>{this.renderMasteryImage(masteryId)}</View>
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
  page: PropTypes.shape({
    name: PropTypes.string,
    masteries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      masteryId: PropTypes.number,
      rank: PropTypes.number.isRequired,
    })).isRequired,
  }),
};

export default MasteryPage;
