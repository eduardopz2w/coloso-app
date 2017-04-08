import React, { Component, PropTypes } from 'react';
import { ListView, StyleSheet } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';

import SelectorItem from './SelectorItem';
import ErrorScreen from '../ErrorScreen';

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
      dataSource: dataSource.cloneWithRows(props.items.toArray()),
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.items.toArray()),
    });
  }

  render() {
    if (this.props.items.size === 0) {
      return <ErrorScreen message={this.props.noResultsText} retryButton={false} />;
    }

    return (<ListView
      style={styles.root}
      contentContainerStyle={styles.container}
      dataSource={this.state.dataSource}
      initialListSize={15}
      pageSize={12}
      renderRow={item => <SelectorItem
        item={item}
        renderRow={this.props.renderRow}
        onPress={this.props.onPressItem}
      />}
      keyboardShouldPersistTaps="handled"
    />);
  }
}

SelectorList.propTypes = {
  items: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  renderRow: PropTypes.func.isRequired,
  noResultsText: PropTypes.string.isRequired,
  onPressItem: PropTypes.func.isRequired,
};

export default SelectorList;
