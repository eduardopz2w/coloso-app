import React, { PureComponent, PropTypes } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';

class SelectorItem extends PureComponent {
  render() {
    return (<TouchableNativeFeedback
      onPress={() => {
        this.props.onPress(this.props.item.get('value'));
      }}
    >
      {this.props.renderRow(this.props.item)}
    </TouchableNativeFeedback>);
  }
}

SelectorItem.propTypes = {
  item: ImmutablePropTypes.mapContains({
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  renderRow: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default SelectorItem;
