import React, { PureComponent, PropTypes } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import SelectorItem from './SelectorItem';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
});

class SelectorList extends PureComponent {
  render() {
    if (this.props.items.length === 0) {
      return <View style={styles.container}><Text>{this.props.noResultsText}</Text></View>;
    }

    return (<ScrollView
      style={styles.root}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {this.props.items.map((item, index) => <SelectorItem
        key={index}
        item={item}
        onPress={this.props.onPressItem}
      />)}
    </ScrollView>);
  }
}

SelectorList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  noResultsText: PropTypes.string.isRequired,
  onPressItem: PropTypes.func.isRequired,
};

export default SelectorList;
