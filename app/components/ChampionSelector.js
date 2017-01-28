import React, { Component, PropTypes } from 'react';
import { View, Text, Picker } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
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

class ChampionSelector extends Component {
  constructor(props) {
    super(props);

    this.handleOnValueChange = this.handleOnValueChange.bind(this);
    this.state = {
      selectedValue: 'SEASON3',
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
    const champions = [
      { label: I18n.t('select_champion'), value: 0 },
      { label: 'Aatrox', value: 266 },
      { label: 'Ahri', value: 103 },
      { label: 'Akali', value: 84 },
      { label: 'Alistar', value: 12 },
      { label: 'Amumu', value: 32 },
      { label: 'Anivia', value: 34 },
      { label: 'Annie', value: 1 },
      { label: 'Ashe', value: 22 },
      { label: 'AurelionSol', value: 136 },
      { label: 'Azir', value: 268 },
      { label: 'Bard', value: 432 },
      { label: 'Blitzcrank', value: 53 },
      { label: 'Brand', value: 63 },
      { label: 'Braum', value: 201 },
      { label: 'Caitlyn', value: 51 },
      { label: 'Cassiopeia', value: 69 },
      { label: 'Chogath', value: 31 },
      { label: 'Corki', value: 42 },
      { label: 'Darius', value: 122 },
      { label: 'Diana', value: 131 },
      { label: 'Draven', value: 119 },
      { label: 'DrMundo', value: 36 },
      { label: 'Ekko', value: 245 },
      { label: 'Elise', value: 60 },
      { label: 'Evelynn', value: 28 },
      { label: 'Ezreal', value: 81 },
      { label: 'FiddleSticks', value: 9 },
      { label: 'Fiora', value: 114 },
      { label: 'Fizz', value: 105 },
      { label: 'Galio', value: 3 },
      { label: 'Gangplank', value: 41 },
      { label: 'Garen', value: 86 },
      { label: 'Gnar', value: 150 },
      { label: 'Gragas', value: 79 },
      { label: 'Graves', value: 104 },
      { label: 'Hecarim', value: 120 },
      { label: 'Heimerdinger', value: 74 },
      { label: 'Illaoi', value: 420 },
      { label: 'Irelia', value: 39 },
      { label: 'Ivern', value: 427 },
      { label: 'Janna', value: 40 },
      { label: 'JarvanIV', value: 59 },
      { label: 'Jax', value: 24 },
      { label: 'Jayce', value: 126 },
      { label: 'Jhin', value: 202 },
      { label: 'Jinx', value: 222 },
      { label: 'Kalista', value: 429 },
      { label: 'Karma', value: 43 },
      { label: 'Karthus', value: 30 },
      { label: 'Kassadin', value: 38 },
      { label: 'Katarina', value: 55 },
      { label: 'Kayle', value: 10 },
      { label: 'Kennen', value: 85 },
      { label: 'Khazix', value: 121 },
      { label: 'Kindred', value: 203 },
      { label: 'Kled', value: 240 },
      { label: 'KogMaw', value: 96 },
      { label: 'Leblanc', value: 7 },
      { label: 'LeeSin', value: 64 },
      { label: 'Leona', value: 89 },
      { label: 'Lissandra', value: 127 },
      { label: 'Lucian', value: 236 },
      { label: 'Lulu', value: 117 },
      { label: 'Lux', value: 99 },
      { label: 'Malphite', value: 54 },
      { label: 'Malzahar', value: 90 },
      { label: 'Maokai', value: 57 },
      { label: 'MasterYi', value: 11 },
      { label: 'MissFortune', value: 21 },
      { label: 'Wukong', value: 62 },
      { label: 'Mordekaiser', value: 82 },
      { label: 'Morgana', value: 25 },
      { label: 'Nami', value: 267 },
      { label: 'Nasus', value: 75 },
      { label: 'Nautilus', value: 111 },
      { label: 'Nidalee', value: 76 },
      { label: 'Nocturne', value: 56 },
      { label: 'Nunu', value: 20 },
      { label: 'Olaf', value: 2 },
      { label: 'Orianna', value: 61 },
      { label: 'Pantheon', value: 80 },
      { label: 'Poppy', value: 78 },
      { label: 'Quinn', value: 133 },
      { label: 'Rammus', value: 33 },
      { label: 'RekSai', value: 421 },
      { label: 'Renekton', value: 58 },
      { label: 'Rengar', value: 107 },
      { label: 'Riven', value: 92 },
      { label: 'Rumble', value: 68 },
      { label: 'Ryze', value: 13 },
      { label: 'Sejuani', value: 113 },
      { label: 'Shaco', value: 35 },
      { label: 'Shen', value: 98 },
      { label: 'Shyvana', value: 102 },
      { label: 'Singed', value: 27 },
      { label: 'Sion', value: 14 },
      { label: 'Sivir', value: 15 },
      { label: 'Skarner', value: 72 },
      { label: 'Sona', value: 37 },
      { label: 'Soraka', value: 16 },
      { label: 'Swain', value: 50 },
      { label: 'Syndra', value: 134 },
      { label: 'TahmKench', value: 223 },
      { label: 'Taliyah', value: 163 },
      { label: 'Talon', value: 91 },
      { label: 'Taric', value: 44 },
      { label: 'Teemo', value: 17 },
      { label: 'Thresh', value: 412 },
      { label: 'Tristana', value: 18 },
      { label: 'Trundle', value: 48 },
      { label: 'Tryndamere', value: 23 },
      { label: 'TwistedFate', value: 4 },
      { label: 'Twitch', value: 29 },
      { label: 'Udyr', value: 77 },
      { label: 'Urgot', value: 6 },
      { label: 'Varus', value: 110 },
      { label: 'Vayne', value: 67 },
      { label: 'Veigar', value: 45 },
      { label: 'Velkoz', value: 161 },
      { label: 'Vi', value: 254 },
      { label: 'Viktor', value: 112 },
      { label: 'Vladimir', value: 8 },
      { label: 'Volibear', value: 106 },
      { label: 'Warwick', value: 19 },
      { label: 'Xerath', value: 101 },
      { label: 'XinZhao', value: 5 },
      { label: 'Yasuo', value: 157 },
      { label: 'Yorick', value: 83 },
      { label: 'Zac', value: 154 },
      { label: 'Zed', value: 238 },
      { label: 'Ziggs', value: 115 },
      { label: 'Zilean', value: 26 },
      { label: 'Zyra', value: 143 },
    ];

    return (<View style={[styles.root, this.props.style]}>
      <Text style={[styles.titleText, this.props.titleStyle]}>{I18n.t('champion')}: </Text>
      <Picker
        style={styles.picker}
        selectedValue={this.state.selectedValue}
        onValueChange={this.handleOnValueChange}
        enabled={!this.props.disabled}
      >
        {champions.map((season, index) => <Picker.Item
          key={index}
          label={season.label}
          value={season.value}
        />)}
      </Picker>
    </View>);
  }
}

ChampionSelector.propTypes = {
  onChangeSelected: PropTypes.func,
  initialValue: PropTypes.number,
  disabled: PropTypes.bool,
  style: View.propTypes.style,
  titleStyle: Text.propTypes.style,
};

ChampionSelector.defaultProps = {
  initialValue: 0,
  disabled: false,
};

export default ChampionSelector;
