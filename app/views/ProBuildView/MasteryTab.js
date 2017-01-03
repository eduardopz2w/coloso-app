import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import MasteryPage from '../../components/MasteryPage';

const styles = StyleSheet.create({
  root: {},
});

class MasteryTab extends PureComponent {
  render() {
    return (<View style={styles.root}>
      <MasteryPage page={{ masteries: this.props.masteries }} />
    </View>);
  }
}

MasteryTab.propTypes = {
  masteries: PropTypes.arrayOf(PropTypes.shape({})),
};

export default MasteryTab;
