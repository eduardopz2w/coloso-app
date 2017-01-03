import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

const styles = StyleSheet.create({
  root: {},
  item: {
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: 'black',
    marginBottom: 16,
  },
});

class Item extends PureComponent {
  render() {
    const { itemData } = this.props;

    return (<TouchableWithoutFeedback
      onPress={() => this.props.onPress(itemData)}
    >
      <Image
        style={[styles.item, this.props.style]}
        source={{ uri: `item_${itemData.itemId}` }}
      />
    </TouchableWithoutFeedback>);
  }
}

Item.propTypes = {
  itemData: PropTypes.shape({
    itemId: PropTypes.number,
  }),
  onPress: PropTypes.func,
  style: View.propTypes.style,
};

export default Item;
