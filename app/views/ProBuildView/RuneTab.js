import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RunePage from '../../components/RunePage';

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
  },
});

class RuneTab extends Component {
  render() {
    return (<View style={styles.root}>
      <RunePage page={{ runes: this.props.runes }} />
    </View>);
  }
}

RuneTab.propTypes = {
  runes: PropTypes.arrayOf(PropTypes.shape({})),
};

export default RuneTab;
