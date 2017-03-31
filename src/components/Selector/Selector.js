import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Image } from 'react-native';

import SelectorModal from './SelectorModal';
import IconButton from '../IconButton';

const styles = StyleSheet.create({
  root: {
    height: 50,
    justifyContent: 'center',
  },
  selectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 16,
  },
  noImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  selectedName: {
    flex: 1,
    flexBasis: 100,
    color: 'black',
  },
  placeholder: {
    flex: 1,
    flexBasis: 100,
    color: 'rgba(0,0,0,0.80)',
  },
});

class Selector extends Component {
  constructor(props) {
    super(props);

    this.getItemSelected = this.getItemSelected.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
    this.changeSelectedValue = this.changeSelectedValue.bind(this);
    this.handleOnPressSelector = this.handleOnPressSelector.bind(this);

    this.state = {
      open: false,
      selectedValue: props.value,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value !== this.state.selectedValue) {
      this.setState({ selectedValue: newProps.value });
    }
  }

  getItemSelected() {
    const itemSelected = this.props.items.find(item => item.value === this.state.selectedValue);

    return itemSelected;
  }

  changeSelectedValue(value) {
    if (this.props.onChangeSelected) {
      this.props.onChangeSelected(value);
    }
  }

  clearSelection() {
    this.changeSelectedValue(null);
  }

  handleOnPressSelector() {
    if (!this.state.open && !this.props.disabled) {
      this.setState({ open: true });
    }
  }

  renderSelected(itemSelected) {
    if (itemSelected == null) {
      return (<View style={styles.selectedContainer}>
        <View style={styles.noImage} />
        <Text style={styles.placeholder}>{this.props.placeholder}</Text>
      </View>);
    }

    return (<View style={styles.selectedContainer}>
      <Image style={styles.image} source={{ uri: itemSelected.imageUrl }} />
      <Text style={styles.selectedName} numberOfLines={1}>{itemSelected.name}</Text>
      <IconButton
        iconSize={24}
        onPress={this.clearSelection}
        iconName="close"
        iconColor="rgba(0,0,0,0.4)"
      />
    </View>);
  }

  render() {
    const itemSelected = this.getItemSelected();

    if (this.state.open) {
      return (<SelectorModal
        items={this.props.items}
        placeholder={this.props.placeholder}
        noResultsText={this.props.noResultsText}
        onClose={() => { this.setState({ open: false }); }}
        onPressItem={this.changeSelectedValue}
      />);
    }

    return (<View style={[styles.root, this.props.disabled && { opacity: 0.3 }]}>
      <TouchableWithoutFeedback
        onPress={this.handleOnPressSelector}
      >
        {this.renderSelected(itemSelected)}
      </TouchableWithoutFeedback>
    </View>);
  }
}

Selector.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  placeholder: PropTypes.string.isRequired,
  noResultsText: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  onChangeSelected: PropTypes.func,
};

Selector.defaultProps = {
  value: null,
  disabled: false,
  noResultsText: 'No results found',
};

export default Selector;
