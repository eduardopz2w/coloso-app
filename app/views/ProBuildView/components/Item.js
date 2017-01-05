import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Text } from 'react-native';

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
    borderColor: '#3F51B5',
  },
});

class Item extends PureComponent {
  render() {
    const { itemData } = this.props;

    return (<TouchableWithoutFeedback
      onPress={() => this.props.onPress(itemData)}
    >
      <View style={styles.root}>
        <Image
          style={[styles.item, itemData.final && styles.final, this.props.style]}
          source={{ uri: `item_${itemData.itemId}` }}
        />
        {itemData.count > 1 && <Text style={styles.count}>x{itemData.count}</Text>}
      </View>
    </TouchableWithoutFeedback>);
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
