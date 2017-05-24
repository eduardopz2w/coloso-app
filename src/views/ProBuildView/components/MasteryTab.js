import React, { PureComponent } from 'react';
import { View } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';

import { MasteryPage } from '../../../components';

class MasteryTab extends PureComponent {
  shouldComponentUpdate(nextProps) {
    return !Immutable.is(nextProps.masteries, this.props.masteries);
  }

  render() {
    const page = Immutable.fromJS({
      masteries: this.props.masteries,
    });

    return (<View>
      <MasteryPage page={page} />
    </View>);
  }
}

MasteryTab.propTypes = {
  masteries: ImmutablePropTypes.list,
};

export default MasteryTab;
