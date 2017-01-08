import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import { View, StyleSheet } from 'react-native';
import RunePage from '../../components/RunePage';

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
  },
});

class RuneTab extends PureComponent {
  render() {
    const page = Immutable.fromJS({
      runes: this.props.runes,
    });

    return (<View style={styles.root}>
      <RunePage page={page} />
    </View>);
  }
}

RuneTab.propTypes = {
  runes: ImmutablePropTypes.list,
};

export default RuneTab;
