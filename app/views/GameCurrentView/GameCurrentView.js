import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  root: {},
});

class GameCurrentView extends Component {
  render() {
    return (<View style={styles.root}>
      <Text>GameCurrentView</Text>
    </View>);
  }
}

GameCurrentView.propTypes = {};

export default GameCurrentView;
