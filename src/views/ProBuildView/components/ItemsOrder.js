import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Icon from 'react-native-vector-icons/MaterialIcons';

import GroupedItems from './GroupedItems';

const styles = StyleSheet.create({
  root: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  groupAndArrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  arrowIcon: {
    marginTop: -21,
  },
});

class ItemsOrder extends Component {
  constructor(props) {
    super(props);

    this.getItemsTimelines = this.getItemsTimelines.bind(this);
  }

  getItemsTimelines() {
    const TIMESTAMP_DIFF = 30000;
    const items = this.props.itemsOrder.toJS();
    const itemsTimeline = [];

    for (let i = 0; i < items.length; i += 1) {
      const timestampEntry = {
        timestamp: null,
        items: [],
      };
      let timestampAc = items[i].timestamp;

      timestampEntry.items.push(items[i]);

      for (let j = i + 1; j < items.length; j += 1) {
        if ((items[j].timestamp - items[i].timestamp) < TIMESTAMP_DIFF) {
          timestampEntry.items.push(items[j]);
          timestampAc += items[j].timestamp;
          i = j;
        } else {
          break;
        }
      }

      timestampEntry.timestamp = timestampAc / timestampEntry.items.length;
      itemsTimeline.push(timestampEntry);
    }

    return itemsTimeline;
  }

  render() {
    return (<View style={styles.root}>
      {this.getItemsTimelines().map((timelineEntry, key) => <View
        style={styles.groupAndArrow}
        key={key}
      >
        <GroupedItems
          items={timelineEntry.items}
          timestamp={timelineEntry.timestamp}
          onPressItem={this.props.onPressItem}
        />

        <Icon style={styles.arrowIcon} name="keyboard-arrow-right" size={24} />
      </View>)}
    </View>);
  }
}

ItemsOrder.propTypes = {
  itemsOrder: ImmutablePropTypes.list,
  onPressItem: PropTypes.func,
};

export default ItemsOrder;
