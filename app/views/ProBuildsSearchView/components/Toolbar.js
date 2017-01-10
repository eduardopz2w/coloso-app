import React, { PureComponent, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import ImmutablePropTypes from 'react-immutable-proptypes';
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
        <Text numberOfLines={1} style={styles.title}>Builds Profesionales</Text>
        <IconButton iconName="filter-list" onPress={this.toggleFilters} />
      </View>
      { this.state.filters &&
        <View>
          <ChampionSelector
            titleStyle={{ width: 70 }}
            style={{ paddingHorizontal: 16, backgroundColor: 'rgba(0,0,0,0.1)' }}
            disabled={this.props.disabledFilters}
            onChangeSelected={this.props.onChangeChampionSelected}
          />
          <ProPlayersSelector
            titleStyle={{ width: 70 }}
            proPlayers={this.props.proPlayers.get('proPlayers')}
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
    proPlayers: ImmutablePropTypes.List,
  }),
  onPressMenuButton: PropTypes.func,
  disabledFilters: PropTypes.bool,
  onChangeChampionSelected: PropTypes.func.isRequired,
  onChangeProPlayerSelected: PropTypes.func.isRequired,
};

export default Toolbar;
