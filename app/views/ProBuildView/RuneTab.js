import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import RunePage from '../../components/RunePage';

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
  },
});

class RuneTab extends PureComponent {
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
