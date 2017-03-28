import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback, Image } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 24,
  },
  name: {
    fontSize: 17,
    justifyContent: 'center',
  },
});

class SelectorItem extends PureComponent {
  render() {
    return (<TouchableNativeFeedback
      onPress={() => {
        this.props.onPress(this.props.item.value);
      }}
    >
      <View style={styles.root}>
        <Image source={{ uri: this.props.item.imageUrl }} style={styles.image} />
        <Text style={styles.name}>{this.props.item.name}</Text>
      </View>
    </TouchableNativeFeedback>);
  }
}

SelectorItem.propTypes = {
  item: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default SelectorItem;
