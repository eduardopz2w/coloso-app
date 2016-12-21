import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  root: {},
});

class RunePage extends Component {
  render() {
    return (<View style={styles.root}>
      <Text>RunePage</Text>
    </View>);
  }
}

RunePage.propTypes = {
  page: PropTypes.shape({
    name: PropTypes.string.isRequired,
    runes: PropTypes.arrayOf(PropTypes.shape({
      runeId: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })).isRequired,
  }),
};

export default RunePage;
