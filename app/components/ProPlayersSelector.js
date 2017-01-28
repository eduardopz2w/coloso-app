import React, { Component, PropTypes } from 'react';
import { View, Text, Picker } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import I18n from 'i18n-js';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      flexDirection: 'row',
    },
    titleText: {
      alignSelf: 'center',
      fontWeight: 'bold',
    },
    picker: {
      flex: 1,
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
      selectedValue: null,
    };
  }

  componentWillMount() {
    this.setState({ selectedValue: this.props.initialValue });
  }

  handleOnValueChange(newValue) {
    if (!this.props.disabled) {
      this.props.onChangeSelected(newValue);
      this.setState({ selectedValue: newValue });
    }
  }

  render() {
    let pickerOptions = [
      Immutable.Map({ name: I18n.t('select_player'), value: 0 }),
    ];

    pickerOptions = pickerOptions.concat(this.props.proPlayers.toArray());

    return (<View style={[styles.root, this.props.style]}>
      <Text style={[styles.titleText, this.props.titleStyle]}>{I18n.t('player')}: </Text>
      <Picker
        style={[styles.picker]}
        selectedValue={this.state.selectedValue}
        onValueChange={this.handleOnValueChange}
        enabled={!this.props.disabled}
      >
        {pickerOptions.map((player, index) => <Picker.Item
          key={index}
          label={player.get('name')}
          value={player.get('id')}
        />)}
      </Picker>
    </View>);
  }
}

ProPlayersSelector.propTypes = {
  onChangeSelected: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
  disabled: PropTypes.bool,
  style: View.propTypes.style,
  titleStyle: Text.propTypes.style,
  proPlayers: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

ProPlayersSelector.defaultProps = {
  initialValue: null,
  disabled: false,
};

export default ProPlayersSelector;
