import React, { Component, PropTypes } from 'react';
import { ListView, StyleSheet, View, Text } from 'react-native';

import SelectorItem from './SelectorItem';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
});

class SelectorList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(props.items),
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.items),
    });
  }

  render() {
    if (this.props.items.length === 0) {
      return <View style={styles.container}><Text>{this.props.noResultsText}</Text></View>;
    }

    return (<ListView
      style={styles.root}
      contentContainerStyle={styles.container}
      dataSource={this.state.dataSource}
      initialListSize={15}
      pageSize={12}
      renderRow={item => <SelectorItem
        key={item.value}
        item={item}
        onPress={this.props.onPressItem}
      />}
      keyboardShouldPersistTaps="handled"
    />);
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
