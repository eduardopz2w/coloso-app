import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import ImmutablePropTypes from 'react-immutable-proptypes';
import I18n from 'i18n-js';

import Selector from './Selector';
import { colors } from '../utils';

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
    renderRoot: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 50,
      marginRight: 24,
      borderWidth: 1,
      borderColor: 'black',
    },
    name: {
      fontSize: 17,
      color: colors.text.primary,
    },
    realName: {
      fontSize: 14,
      color: colors.text.secondary,
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

function renderRow(item) {
  return (<View style={styles.renderRoot}>
    <Image source={{ uri: item.get('imageUrl') }} style={styles.image} />
    <View style={{ flex: 1 }}>
      <Text style={styles.name}>{item.get('name')}</Text>
      <Text style={styles.realName}>{item.get('realName')}</Text>
    </View>
  </View>);
}

class ProPlayersSelector extends Component {
  constructor(props) {
    super(props);

    this.handleOnValueChange = this.handleOnValueChange.bind(this);
    this.state = {
      selectedValue: props.value || '0',
    };
  }

  getProPlayersList() {
    return this.props.proPlayers
      .map(proPlayer => proPlayer.set('value', proPlayer.get('id')));
  }

  handleOnValueChange(newValue) {
    if (!this.props.disabled) {
      this.props.onChangeSelected(newValue);
      this.setState({ selectedValue: newValue });
    }
  }

  render() {
    const proPlayers = this.getProPlayersList();

    return (<View style={[styles.root, this.props.style]}>
      <Text style={[styles.titleText, this.props.titleStyle]}>{I18n.t('player')}: </Text>
      <View style={{ flex: 1 }}>
        <Selector
          items={proPlayers}
          value={this.props.value}
          placeholder={I18n.t('select_player')}
          noResultsText={I18n.t('no_results_found')}
          renderRow={renderRow}
          disabled={this.props.disabled}
          onChangeSelected={this.handleOnValueChange}
        />
      </View>
    </View>);
  }
}

ProPlayersSelector.propTypes = {
  value: PropTypes.string,
  onChangeSelected: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: View.propTypes.style,
  titleStyle: Text.propTypes.style,
  proPlayers: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    realName: PropTypes.string.isRequired,
  })).isRequired,
};

ProPlayersSelector.defaultProps = {
  value: null,
  disabled: false,
};

export default ProPlayersSelector;
