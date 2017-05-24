import React, { PureComponent, PropTypes } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import I18n from 'i18n-js';
import _ from 'lodash';

import { colors } from '../../../utils';
import { mediaBreakpointUp } from '../../../utils/mediaBreakpoints';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      marginBottom: 8,
    },

    itemsContainer: {
      flexDirection: 'row',
      backgroundColor: colors.primary,
      paddingVertical: 4,
      paddingLeft: 4,
      paddingRight: 2,
      borderRadius: 4,
    },

    itemContainer: {
      position: 'relative',
      width: 32,
      height: 32,
      marginRight: 2,
    },

    item: {
      width: 32,
      height: 32,
      borderRadius: 3,
    },

    countText: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.9)',
      color: 'white',
      fontSize: 10,
      width: 15,
      textAlign: 'center',
    },

    minutesText: {
      textAlign: 'center',
      fontSize: 12,
    },
  }, {
    [mediaBreakpointUp('phoneBig')]: {
      itemsContainer: {
        paddingVertical: 6,
        paddingLeft: 6,
        paddingRight: 2,
      },

      itemContainer: {
        width: 48,
        height: 48,
        marginRight: 4,
      },

      item: {
        width: 48,
        height: 48,
      },

      countText: {
        fontSize: 13,
      },

      minutesText: {
        fontSize: 14,
      },
    },
  },
);

class GroupedItems extends PureComponent {
  constructor(props) {
    super(props);

    this.getMinutesText = this.getMinutesText.bind(this);
  }

  getCountedItems() {
    const items = [];

    const grouped = _.groupBy(this.props.items, 'itemId');

    _.each(grouped, (groupedItems) => {
      items.push(_.assign(groupedItems[0], {
        count: groupedItems.length,
      }));
    });

    return items;
  }

  getMinutesText() {
    const minutes = moment.duration(this.props.timestamp).minutes();

    if (this.props.items.length === 1) {
      return `${minutes} m`;
    }

    return `${minutes} ${I18n.t('minutes')}`;
  }

  renderItem(item, index) {
    let countNode = null;

    if (item.count > 1) {
      countNode = <Text style={styles.countText}>{ item.count }</Text>;
    }

    return (<TouchableWithoutFeedback
      key={index}
      onPress={() => {
        this.props.onPressItem(item);
      }}
    >
      <View style={styles.itemContainer} >
        <Image style={styles.item} source={{ uri: `item_${item.itemId}` }} />
        { countNode }
      </View>
    </TouchableWithoutFeedback>);
  }

  render() {
    return (<View style={styles.root}>
      <View style={styles.itemsContainer}>
        {this.getCountedItems().map((item, index) => this.renderItem(item, index))}
      </View>
      <Text style={styles.minutesText}>{ this.getMinutesText() }</Text>
    </View>);
  }
}

GroupedItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  timestamp: PropTypes.number,
  onPressItem: PropTypes.func.isRequired,
};

export default GroupedItems;
