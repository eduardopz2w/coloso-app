import React, { PureComponent, PropTypes } from 'react';
import { Picker, ViewPropTypes } from 'react-native';
import { regionHumanize, getDeviceRiotRegion } from 'utils';

class RegionSelector extends PureComponent {
  constructor(props) {
    super(props);
    this.regions = [
      { label: regionHumanize('na'), value: 'NA' },
      { label: regionHumanize('lan'), value: 'LAN' },
      { label: regionHumanize('las'), value: 'LAS' },
      { label: regionHumanize('br'), value: 'BR' },
      { label: regionHumanize('euw'), value: 'EUW' },
      { label: regionHumanize('eune'), value: 'EUNE' },
      { label: regionHumanize('oce'), value: 'OCE' },
      { label: regionHumanize('jp'), value: 'JP' },
      { label: regionHumanize('kr'), value: 'KR' },
      { label: regionHumanize('ru'), value: 'RU' },
      { label: regionHumanize('tr'), value: 'TR' },
    ];

    this.handleOnValueChange = this.handleOnValueChange.bind(this);
    this.pristine = true;
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedValue !== this.props.selectedValue) {
      this.pristine = false;
    }
  }

  geolocalize() {
    getDeviceRiotRegion()
      .then((region) => {
        if (this.pristine) {
          this.handleOnValueChange(region);
        }
      });
  }

  handleOnValueChange(newRegion) {
    if (this.props.onChangeRegion) {
      this.props.onChangeRegion(newRegion);
    }
  }

  render() {
    return (<Picker
      style={this.props.style}
      onValueChange={this.handleOnValueChange}
      selectedValue={this.props.selectedValue}
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
  style: ViewPropTypes.style,
  onChangeRegion: PropTypes.func,
};

RegionSelector.defaultProps = {
  selectedValue: 'NA',
};

export default RegionSelector;
