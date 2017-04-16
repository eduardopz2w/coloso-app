import React, { Component, PropTypes } from 'react';
import { Picker, View } from 'react-native';
import regionHumanize from '../utils/regionHumanize';
import getDeviceRiotRegion from '../utils/getDeviceRiotRegion';


class RegionSelector extends Component {
  constructor(props) {
    super(props);
    this.regions = [
      { label: regionHumanize('na'), value: 'na' },
      { label: regionHumanize('lan'), value: 'lan' },
      { label: regionHumanize('las'), value: 'las' },
      { label: regionHumanize('br'), value: 'br' },
      { label: regionHumanize('euw'), value: 'euw' },
      { label: regionHumanize('eune'), value: 'eune' },
      { label: regionHumanize('oce'), value: 'oce' },
      { label: regionHumanize('jp'), value: 'jp' },
      { label: regionHumanize('kr'), value: 'kr' },
      { label: regionHumanize('ru'), value: 'ru' },
      { label: regionHumanize('tr'), value: 'tr' },
    ];

    this.state = {
      selectedValue: props.selectedValue,
    };

    this.handleOnValueChange = this.handleOnValueChange.bind(this);
    this.pristine = true;
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedValue !== this.state.selectedValue) {
      this.pristine = false;
      this.setState({
        selectedValue: nextProps.selectedValue,
      });
    }
  }

  geolocalize() {
    getDeviceRiotRegion()
    .then((region) => {
      if (this.pristine) {
        this.handleOnValueChange(region.toLowerCase());
      }
    });
  }

  handleOnValueChange(newRegion) {
    if (this.props.onChangeRegion) {
      this.props.onChangeRegion(newRegion);
      this.setState({ selectedValue: newRegion });
    }
  }

  render() {
    return (<Picker
      style={this.props.style}
      onValueChange={this.handleOnValueChange}
      selectedValue={this.state.selectedValue}
    >
      {this.regions.map((region, index) => <Picker.Item
        key={index}
        label={region.label}
        value={region.value}
      />)}
    </Picker>);
  }
}

RegionSelector.propTypes = {
  selectedValue: PropTypes.string,
  style: View.propTypes.style,
  onChangeRegion: PropTypes.func,
};

export default RegionSelector;
