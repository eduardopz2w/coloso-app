import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import { View, StyleSheet } from 'react-native';
import MasteryPage from '../../../components/MasteryPage';

const styles = StyleSheet.create({
  root: {},
});

class MasteryTab extends PureComponent {
  render() {
    const page = Immutable.fromJS({
      masteries: this.props.masteries,
    });

    return (<View style={styles.root}>
      <MasteryPage page={page} />
    </View>);
  }
}

MasteryTab.propTypes = {
  masteries: ImmutablePropTypes.list,
};

export default MasteryTab;
