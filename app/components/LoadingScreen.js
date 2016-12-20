import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MKSpinner } from 'react-native-material-kit';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 50,
    height: 50,
  },
});

const LoadingScreen = function LoadingScreen() {
  return (<View style={styles.root}>
    <MKSpinner style={styles.spinner} />
  </View>);
};

export default LoadingScreen;
