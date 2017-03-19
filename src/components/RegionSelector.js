import React, { Component, PropTypes } from 'react';
import { Picker, View } from 'react-native';
import regionHumanize from '../utils/regionHumanize';


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
      selectedValue: 'na',
    };

    this.handleOnValueChange = this.handleOnValueChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedValue) {
      this.setState({
        selectedValue: nextProps.selectedValue,
      });
    }
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
  style: View.propTypes.style,
  onChangeRegion: PropTypes.func,
};

export default RegionSelector;
