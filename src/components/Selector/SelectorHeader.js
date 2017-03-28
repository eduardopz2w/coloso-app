import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import IconButton from '../IconButton';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  root: {
    height: 56,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    paddingRight: 56,
  },
});

class SelectorHeader extends Component {
  constructor(props) {
    super(props);

    this.handleOnTextChange = this.handleOnTextChange.bind(this);

    this.state = {
      value: '',
    };
  }

  handleOnTextChange(newText) {
    this.setState({ value: newText });
    this.props.onTextChange(newText);
  }

  render() {
    return (<View style={styles.root}>
      <View style={{ marginRight: 8 }}>
        <IconButton
          iconName="arrow-back"
          onPress={this.props.onPressCloseButton}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TextInput
          style={{ color: 'white', fontSize: 16 }}
          value={this.state.value}
          onChangeText={this.handleOnTextChange}
          placeholder={this.props.placeholder}
          placeholderTextColor="rgba(255,255,255,0.6)"
          autoFocus
        />
      </View>
    </View>);
  }
}

SelectorHeader.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onPressCloseButton: PropTypes.func.isRequired,
};

export default SelectorHeader;
