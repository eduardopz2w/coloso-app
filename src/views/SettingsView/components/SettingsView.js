import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import I18n from 'i18n-js';

import Toolbar from './Toolbar';
import SwitchSetting from './SwitchSetting';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
});

class SettingsView extends PureComponent {
  constructor(props) {
    super(props);

    this.handleOnKeepAwakeCheckedChange = this.handleOnKeepAwakeCheckedChange.bind(this);
    this.handleOnPressBackButton = this.handleOnPressBackButton.bind(this);
  }

  handleOnKeepAwakeCheckedChange({ checked }) {
    this.props.setSetting('keepAwake', checked);
  }

  handleOnPressBackButton() {
    this.props.navigation.goBack();
  }

  render() {
    const settings = this.props.settings;

    return (<View style={styles.root}>
      <Toolbar onPressBackButton={this.handleOnPressBackButton} />
      <View style={styles.container}>
        <SwitchSetting
          title={I18n.t('keep_awake')}
          description={I18n.t('keep_awake_description')}
          value={settings.get('keepAwake')}
          onCheckedChange={this.handleOnKeepAwakeCheckedChange}
        />
      </View>
    </View>);
  }
}

SettingsView.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }),
  settings: ImmutablePropTypes.mapContains({
    keepAwake: PropTypes.bool.isRequired,
  }).isRequired,
  setSetting: PropTypes.func.isRequired,
};

export default SettingsView;
