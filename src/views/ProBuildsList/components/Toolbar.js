import React, { PureComponent, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import ImmutablePropTypes from 'react-immutable-proptypes';
import I18n from 'i18n-js';
import colors from '../../../utils/colors';
import IconButton from '../../../components/IconButton';
import ChampionSelector from '../../../components/ChampionSelector';
import ProPlayersSelector from '../../../components/ProPlayersSelector';

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
        <View>
          <ChampionSelector
            titleStyle={{ width: 70 }}
            initialValue={this.props.championSelected}
            style={{ paddingHorizontal: 16, backgroundColor: 'rgba(0,0,0,0.1)' }}
            disabled={this.props.disabledFilters}
            onChangeSelected={this.props.onChangeChampionSelected}
          />
          <ProPlayersSelector
            titleStyle={{ width: 70 }}
            initialValue={this.props.proPlayerSelected}
            proPlayers={this.props.proPlayers.get('proPlayersList')}
            style={{ paddingHorizontal: 16, backgroundColor: 'rgba(0,0,0,0.1)' }}
            disabled={this.props.disabledFilters}
            onChangeSelected={this.props.onChangeProPlayerSelected}
          />
        </View>
      }
    </View>);
  }
}

Toolbar.propTypes = {
  style: View.propTypes.style,
  proPlayers: ImmutablePropTypes.mapContains({
    proPlayersList: ImmutablePropTypes.list.isRequired,
  }).isRequired,
  proPlayerSelected: PropTypes.string,
  championSelected: PropTypes.number,
  disabledFilters: PropTypes.bool.isRequired,
  onPressMenuButton: PropTypes.func.isRequired,
  onChangeChampionSelected: PropTypes.func.isRequired,
  onChangeProPlayerSelected: PropTypes.func.isRequired,
};

export default Toolbar;