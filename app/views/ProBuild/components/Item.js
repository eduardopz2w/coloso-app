import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { MKButton } from 'react-native-material-kit';

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    marginBottom: 16,
  },
  item: {
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: 'black',
  },
  count: {
    backgroundColor: 'black',
    padding: 3,
    position: 'absolute',
    color: 'white',
    bottom: 0,
    right: 0,
    fontSize: 12,
  },
  final: {
    borderColor: '#FF5722',
  },
});

class Item extends PureComponent {
  render() {
    const { itemData } = this.props;

    return (<MKButton
      style={styles.root}
      onPress={() => this.props.onPress(itemData)}
      rippleColor="rgba(0,0,0,0.2)"
    >
      <Image
        style={[styles.item, itemData.final && styles.final, this.props.style]}
        source={{ uri: `item_${itemData.itemId}` }}
      />
      {itemData.count > 1 && <Text style={styles.count}>x{itemData.count}</Text>}
    </MKButton>);
  }
}

Item.propTypes = {
  itemData: PropTypes.shape({
    itemId: PropTypes.number,
    count: PropTypes.number,
    final: PropTypes.bool,
  }),
  onPress: PropTypes.func,
  style: View.propTypes.style,
};

export default Item;
