import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Dimensions, Modal } from 'react-native';

import SelectorHeader from './SelectorHeader';
import SelectorList from './SelectorList';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});

class SelectorModal extends Component {
  constructor(props) {
    super(props);

    this.windowDimensions = Dimensions.get('window');
    this.handleOnRequestClose = this.handleOnRequestClose.bind(this);
    this.handleOnTextChange = this.handleOnTextChange.bind(this);
    this.handleOnPressItem = this.handleOnPressItem.bind(this);
    this.getFilteredItems = this.getFilteredItems.bind(this);

    this.state = {
      open: true,
      filterText: '',
    };
  }


  getFilteredItems() {
    if (this.state.filterText !== '') {
      return this.props.items
        .filter(item => item.name.toLowerCase().includes(this.state.filterText.toLowerCase()));
    }

    return this.props.items;
  }

  handleOnTextChange(newText) {
    this.setState({ filterText: newText });
  }

  handleOnPressItem(value) {
    this.handleOnRequestClose();
    this.props.onPressItem(value);
  }

  handleOnRequestClose() {
    this.setState({ open: false, filterText: '' });
    this.props.onClose();
  }

  render() {
    return (<View>
      <Modal
        onRequestClose={this.handleOnRequestClose}
        visible={this.state.open}
      >
        <View style={styles.contentContainer}>
          <SelectorHeader
            placeholder={this.props.placeholder}
            onTextChange={this.handleOnTextChange}
            onPressCloseButton={this.handleOnRequestClose}
          />
          <SelectorList
            items={this.getFilteredItems()}
            onPressItem={this.handleOnPressItem}
          />
        </View>
      </Modal>
    </View>);
  }
}

SelectorModal.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  })).isRequired,
  placeholder: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onPressItem: PropTypes.func.isRequired,
};

export default SelectorModal;
