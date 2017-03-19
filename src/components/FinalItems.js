import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

class FinalItems extends PureComponent {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(itemId) {
    const itemStyle = {
      width: this.props.itemsSie,
      height: this.props.itemsSie,
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: 'black',
    };

    if (itemId > 0) {
      return <Image style={itemStyle} source={{ uri: `item_${itemId}` }} />;
    }

    return <View style={itemStyle} />;
  }

  render() {
    return (<View style={[styles.root, this.props.style]}>
      {this.renderItem(this.props.item0)}
      {this.renderItem(this.props.item1)}
      {this.renderItem(this.props.item2)}
      {this.renderItem(this.props.item3)}
      {this.renderItem(this.props.item4)}
      {this.renderItem(this.props.item5)}
      {this.renderItem(this.props.item6)}
    </View>);
  }
}

FinalItems.propTypes = {
  item0: PropTypes.number,
  item1: PropTypes.number,
  item2: PropTypes.number,
  item3: PropTypes.number,
  item4: PropTypes.number,
  item5: PropTypes.number,
  item6: PropTypes.number,
  itemsSie: PropTypes.number,
  style: View.propTypes.style,
};

FinalItems.defaultProps = {
  itemsSie: 32,
};

export default FinalItems;
