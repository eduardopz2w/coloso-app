import React, { PureComponent, PropTypes } from 'react';
import { View, Text, ViewPropTypes } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import ImmutablePropTypes from 'react-immutable-proptypes';
import I18n from 'i18n-js';

import { colors } from 'utils';
import { IconButton, ChampionSelector, ProPlayersSelector } from 'components';

const styles = MediaQueryStyleSheet.create(
  {
    appBar: {
      backgroundColor: colors.primary,
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
    },

    title: {
      flex: 1,
      marginLeft: 18,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    filters: {
      paddingHorizontal: 16,
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
  },
  {
    '@media (min-device-width: 600)': {
      filters: {
        flexDirection: 'row',
      },
      filter: {
        flex: 1,
      },
    },
  },
);

class Toolbar extends PureComponent {
  constructor(props) {
    super(props);

    this.toggleFilters = this.toggleFilters.bind(this);

    this.state = {
      filters: false,
    };
  }

  toggleFilters() {
    this.setState({
      filters: !this.state.filters,
    });
  }

  render() {
    return (<View>
      <View style={[styles.appBar, this.props.style]}>
        <IconButton iconName="menu" onPress={this.props.onPressMenuButton} />
        <Text numberOfLines={1} style={styles.title}>{I18n.t('pro_builds')}</Text>
        <IconButton iconName="filter-list" onPress={this.toggleFilters} />
      </View>
      { this.state.filters &&
        <View style={styles.filters}>
          <ChampionSelector
            titleStyle={{ width: 70 }}
            value={this.props.championSelected}
            style={styles.filter}
            disabled={this.props.disabledFilters}
            onChangeSelected={this.props.onChangeChampionSelected}
          />
          <ProPlayersSelector
            titleStyle={{ width: 70 }}
            value={this.props.proPlayerSelected}
            proPlayers={this.props.proPlayers.get('data')}
            style={styles.filter}
            disabled={this.props.disabledFilters}
            onChangeSelected={this.props.onChangeProPlayerSelected}
          />
        </View>
      }
    </View>);
  }
}

Toolbar.propTypes = {
  style: ViewPropTypes.style,
  proPlayers: ImmutablePropTypes.mapContains({
    data: ImmutablePropTypes.list.isRequired,
  }).isRequired,
  proPlayerSelected: PropTypes.string,
  championSelected: PropTypes.number,
  disabledFilters: PropTypes.bool.isRequired,
  onPressMenuButton: PropTypes.func.isRequired,
  onChangeChampionSelected: PropTypes.func.isRequired,
  onChangeProPlayerSelected: PropTypes.func.isRequired,
};

export default Toolbar;
