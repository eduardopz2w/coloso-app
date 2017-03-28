import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import ImmutablePropTypes from 'react-immutable-proptypes';
import I18n from 'i18n-js';

import Selector from './Selector';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      flexDirection: 'row',
    },
    titleText: {
      alignSelf: 'center',
      fontWeight: 'bold',
      marginRight: 8,
    },
  },
  {
    '@media (min-device-width: 600)': {
      picker: {
        height: 50,
      },
    },
  },
);

class ProPlayersSelector extends Component {
  constructor(props) {
    super(props);

    this.handleOnValueChange = this.handleOnValueChange.bind(this);
    this.state = {
      selectedValue: props.initialValue || '0',
    };
  }

  getProPlayersArray() {
    return this.props.proPlayers
      .toJS()
      .map(proPlayer => ({
        value: proPlayer.id,
        name: proPlayer.name,
        imageUrl: proPlayer.imageUrl,
      }));
  }

  handleOnValueChange(newValue) {
    if (!this.props.disabled) {
      this.props.onChangeSelected(newValue);
      this.setState({ selectedValue: newValue });
    }
  }

  render() {
    const proPlayers = this.getProPlayersArray();

    return (<View style={[styles.root, this.props.style]}>
      <Text style={[styles.titleText, this.props.titleStyle]}>{I18n.t('player')}: </Text>
      <View style={{ flex: 1 }}>
        <Selector
          items={proPlayers}
          placeholder={I18n.t('select_player')}
          onChangeSelected={this.handleOnValueChange}
          disabled={this.props.disabled}
        />
      </View>
    </View>);
  }
}

ProPlayersSelector.propTypes = {
  initialValue: PropTypes.string,
  onChangeSelected: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: View.propTypes.style,
  titleStyle: Text.propTypes.style,
  proPlayers: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  })).isRequired,
};

ProPlayersSelector.defaultProps = {
  initialValue: null,
  disabled: false,
};

export default ProPlayersSelector;
