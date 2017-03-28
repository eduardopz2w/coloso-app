import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
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

class ChampionSelector extends Component {
  constructor(props) {
    super(props);

    this.handleOnValueChange = this.handleOnValueChange.bind(this);
    this.state = {
      selectedValue: props.initialValue || 0,
    };
  }

  handleOnValueChange(newValue) {
    if (!this.props.disabled) {
      this.props.onChangeSelected(newValue);
      this.setState({ selectedValue: newValue });
    }
  }

  render() {
    let champions = [
      { name: 'Aatrox', value: 266 },
      { name: 'Ahri', value: 103 },
      { name: 'Akali', value: 84 },
      { name: 'Alistar', value: 12 },
      { name: 'Amumu', value: 32 },
      { name: 'Anivia', value: 34 },
      { name: 'Annie', value: 1 },
      { name: 'Ashe', value: 22 },
      { name: 'Aurelion Sol', value: 136 },
      { name: 'Azir', value: 268 },
      { name: 'Bard', value: 432 },
      { name: 'Blitzcrank', value: 53 },
      { name: 'Brand', value: 63 },
      { name: 'Braum', value: 201 },
      { name: 'Caitlyn', value: 51 },
      { name: 'Cassiopeia', value: 69 },
      { name: 'Camille', value: 164 },
      { name: 'Cho\'Gath', value: 31 },
      { name: 'Corki', value: 42 },
      { name: 'Darius', value: 122 },
      { name: 'Diana', value: 131 },
      { name: 'Draven', value: 119 },
      { name: 'Dr. Mundo', value: 36 },
      { name: 'Ekko', value: 245 },
      { name: 'Elise', value: 60 },
      { name: 'Evelynn', value: 28 },
      { name: 'Ezreal', value: 81 },
      { name: 'FiddleSticks', value: 9 },
      { name: 'Fiora', value: 114 },
      { name: 'Fizz', value: 105 },
      { name: 'Galio', value: 3 },
      { name: 'Gangplank', value: 41 },
      { name: 'Garen', value: 86 },
      { name: 'Gnar', value: 150 },
      { name: 'Gragas', value: 79 },
      { name: 'Graves', value: 104 },
      { name: 'Hecarim', value: 120 },
      { name: 'Heimerdinger', value: 74 },
      { name: 'Illaoi', value: 420 },
      { name: 'Irelia', value: 39 },
      { name: 'Ivern', value: 427 },
      { name: 'Janna', value: 40 },
      { name: 'Jarvan IV', value: 59 },
      { name: 'Jax', value: 24 },
      { name: 'Jayce', value: 126 },
      { name: 'Jhin', value: 202 },
      { name: 'Jinx', value: 222 },
      { name: 'Kalista', value: 429 },
      { name: 'Karma', value: 43 },
      { name: 'Karthus', value: 30 },
      { name: 'Kassadin', value: 38 },
      { name: 'Katarina', value: 55 },
      { name: 'Kayle', value: 10 },
      { name: 'Kennen', value: 85 },
      { name: 'Kha\'zix', value: 121 },
      { name: 'Kindred', value: 203 },
      { name: 'Kled', value: 240 },
      { name: 'KogMaw', value: 96 },
      { name: 'Leblanc', value: 7 },
      { name: 'LeeSin', value: 64 },
      { name: 'Leona', value: 89 },
      { name: 'Lissandra', value: 127 },
      { name: 'Lucian', value: 236 },
      { name: 'Lulu', value: 117 },
      { name: 'Lux', value: 99 },
      { name: 'Malphite', value: 54 },
      { name: 'Malzahar', value: 90 },
      { name: 'Maokai', value: 57 },
      { name: 'MasterYi', value: 11 },
      { name: 'Miss Fortune', value: 21 },
      { name: 'Wukong', value: 62 },
      { name: 'Mordekaiser', value: 82 },
      { name: 'Morgana', value: 25 },
      { name: 'Nami', value: 267 },
      { name: 'Nasus', value: 75 },
      { name: 'Nautilus', value: 111 },
      { name: 'Nidalee', value: 76 },
      { name: 'Nocturne', value: 56 },
      { name: 'Nunu', value: 20 },
      { name: 'Olaf', value: 2 },
      { name: 'Orianna', value: 61 },
      { name: 'Pantheon', value: 80 },
      { name: 'Poppy', value: 78 },
      { name: 'Quinn', value: 133 },
      { name: 'Rammus', value: 33 },
      { name: 'Rek\'Sai', value: 421 },
      { name: 'Renekton', value: 58 },
      { name: 'Rengar', value: 107 },
      { name: 'Riven', value: 92 },
      { name: 'Rumble', value: 68 },
      { name: 'Ryze', value: 13 },
      { name: 'Sejuani', value: 113 },
      { name: 'Shaco', value: 35 },
      { name: 'Shen', value: 98 },
      { name: 'Shyvana', value: 102 },
      { name: 'Singed', value: 27 },
      { name: 'Sion', value: 14 },
      { name: 'Sivir', value: 15 },
      { name: 'Skarner', value: 72 },
      { name: 'Sona', value: 37 },
      { name: 'Soraka', value: 16 },
      { name: 'Swain', value: 50 },
      { name: 'Syndra', value: 134 },
      { name: 'TahmKench', value: 223 },
      { name: 'Taliyah', value: 163 },
      { name: 'Talon', value: 91 },
      { name: 'Taric', value: 44 },
      { name: 'Teemo', value: 17 },
      { name: 'Thresh', value: 412 },
      { name: 'Tristana', value: 18 },
      { name: 'Trundle', value: 48 },
      { name: 'Tryndamere', value: 23 },
      { name: 'TwistedFate', value: 4 },
      { name: 'Twitch', value: 29 },
      { name: 'Udyr', value: 77 },
      { name: 'Urgot', value: 6 },
      { name: 'Varus', value: 110 },
      { name: 'Vayne', value: 67 },
      { name: 'Veigar', value: 45 },
      { name: 'Velkoz', value: 161 },
      { name: 'Vi', value: 254 },
      { name: 'Viktor', value: 112 },
      { name: 'Vladimir', value: 8 },
      { name: 'Volibear', value: 106 },
      { name: 'Warwick', value: 19 },
      { name: 'Xerath', value: 101 },
      { name: 'XinZhao', value: 5 },
      { name: 'Yasuo', value: 157 },
      { name: 'Yorick', value: 83 },
      { name: 'Zac', value: 154 },
      { name: 'Zed', value: 238 },
      { name: 'Ziggs', value: 115 },
      { name: 'Zilean', value: 26 },
      { name: 'Zyra', value: 143 },
    ];

    champions = champions.map(champion => Object.assign(champion, { imageUrl: `champion_square_${champion.value}` }));

    return (<View style={[styles.root, this.props.style]}>
      <Text style={[styles.titleText, this.props.titleStyle]}>{I18n.t('champion')}: </Text>
      <View style={{ flex: 1 }}>
        <Selector
          items={champions}
          placeholder={I18n.t('select_champion')}
          onChangeSelected={this.handleOnValueChange}
          disabled={this.props.disabled}
        />
      </View>
    </View>);
  }
}

ChampionSelector.propTypes = {
  initialValue: PropTypes.number,
  onChangeSelected: PropTypes.func,
  disabled: PropTypes.bool,
  style: View.propTypes.style,
  titleStyle: Text.propTypes.style,
};

ChampionSelector.defaultProps = {
  initialValue: 0,
  disabled: false,
};

export default ChampionSelector;
