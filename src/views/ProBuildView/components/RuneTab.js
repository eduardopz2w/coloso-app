import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import { View, StyleSheet } from 'react-native';

import { RunePage } from 'components';

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
  },
});

class RuneTab extends PureComponent {
  shouldComponentUpdate(nextProps) {
    return !Immutable.is(nextProps.runes, this.props.runes);
  }

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
