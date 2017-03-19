import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MKTextField, MKColor } from 'react-native-material-kit';
import _ from 'lodash';

const styles = StyleSheet.create({
  root: {},
  textError: {
    fontSize: 12,
    marginVertical: 4,
    color: MKColor.Red,
  },
});

class TextField extends Component {
  constructor(props) {
    super(props);

    this.renderError = this.renderError.bind(this);
  }

  renderError() {
    if (!_.isEmpty(this.props.errorText)) {
      return <Text style={styles.textError}>{this.props.errorText}</Text>;
    }

    return null;
  }

  render() {
    const textFieldProperties = {};

    if (!_.isEmpty(this.props.errorText)) {
      textFieldProperties.tintColor = MKColor.Red;
      textFieldProperties.highlightColor = MKColor.Red;
    }

    return (<View style={[styles.root, this.props.style]}>
      <MKTextField
        value={this.props.value}
        onTextChange={this.props.onTextChange}
        placeholder={this.props.placeholder}
        {...textFieldProperties}
      />
      {this.renderError()}
    </View>);
  }
}

TextField.defaultProperties = {
  value: null,
};

TextField.propTypes = {
  style: View.propTypes.style,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  errorText: PropTypes.string,
  onTextChange: PropTypes.func.isRequired,
};

export default TextField;
