import React, { Component, PropTypes } from 'react';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

const styles = StyleSheet.create({
  root: {},
});

class Item extends Component {
  render() {
    const { itemData } = this.props;

    return (<TouchableWithoutFeedback
      onPress={() => this.props.onPress(itemData)}
    >
      <Image
        style={[styles.item, this.getItemStyle()]}
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
};

export default Item;
