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
      width: 200,
    },
  },
  {
    '@media (min-device-width: 600)': {
      titleText: {
        fontSize: 18,
        marginRight: 10,
      },
      picker: {
        width: 350,
        height: 50,
      },
    },
  },
);

class SeasonSelector extends Component {
  constructor(props) {
    super(props);

    this.handleOnValueChange = this.handleOnValueChange.bind(this);
    this.state = {
      selectedValue: 'SEASON2017',
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
    const seasons = [
      { label: 'Season 2013', value: 'SEASON3' },
      { label: 'Season 2014', value: 'SEASON2014' },
      { label: 'Season 2015', value: 'SEASON2015' },
      { label: 'Season 2016', value: 'SEASON2016' },
      { label: 'Season 2017', value: 'SEASON2017' },
    ];

    return (<View style={styles.root}>
      <Text style={styles.titleText}>{I18n.t('season')}: </Text>
      <Picker
        style={styles.picker}
        selectedValue={this.state.selectedValue}
        onValueChange={this.handleOnValueChange}
      >
        {seasons.map((season, index) => <Picker.Item
          key={index}
          label={season.label}
          value={season.value}
        />)}
      </Picker>
    </View>);
  }
}

SeasonSelector.propTypes = {
  onChangeSelected: PropTypes.func,
  initialValue: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SeasonSelector;
