import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MKSwitch } from 'react-native-material-kit';

import { colors } from '../../../utils';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  textCol: {
    flex: 1,
  },
  titleText: {
    color: colors.text.primary,
    fontSize: 19,
  },
  descriptionText: {
    color: colors.text.secondary,
    fontSize: 13,
  },
});

class SwitchSetting extends PureComponent {
  render() {
    return (<View style={styles.root}>
      <View style={styles.textCol}>
        <Text style={styles.titleText} numberOfLines={1}>{this.props.title}</Text>
        <Text style={styles.descriptionText}>{this.props.description || null}</Text>
      </View>
      <View>
        <MKSwitch
          checked={this.props.value}
          onCheckedChange={this.props.onCheckedChange}
        />
      </View>
    </View>);
  }
}

SwitchSetting.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onCheckedChange: PropTypes.func.isRequired,
};

export default SwitchSetting;
