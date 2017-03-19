import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MKSpinner } from 'react-native-material-kit';
import colors from '../utils/colors';

const styles = StyleSheet.create({
  root: {
    width: 42,
    height: 42,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.08)',
    backgroundColor: 'rgba(0,0,0,0.02)',
  },

  spinner: {
    width: 20,
    height: 20,
  },
});

function LoadingIndicator() {
  return (<View style={styles.root}>
    <MKSpinner style={styles.spinner} strokeWidth={2.40} strokeColor={colors.spinnerColor} />
  </View>);
}

export default LoadingIndicator;
