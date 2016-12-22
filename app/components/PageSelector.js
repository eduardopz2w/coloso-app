import React, { Component, PropTypes } from 'react';
import { View, Text, Picker } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';


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

class PageSelector extends Component {
  constructor(props) {
    super(props);

    this.handleOnValueChange = this.handleOnValueChange.bind(this);
    this.state = {
      selectedValue: 0,
    };
  }

  handleOnValueChange(newValue) {
    if (this.props.onChangeSelected) {
      this.props.onChangeSelected(newValue);
    }

    return this.setState({ selectedValue: newValue });
  }

  render() {
    const { pages } = this.props;

    return (<View style={styles.root}>
      <Text style={styles.titleText}>Pagina: </Text>
      <Picker
        style={styles.picker}
        selectedValue={this.state.selectedValue}
        onValueChange={this.handleOnValueChange}
      >
        {pages.map((page, index) => <Picker.Item
          key={index}
          label={page.name}
          value={index}
        />)}
      </Picker>
    </View>);
  }
}

PageSelector.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })),
  onChangeSelected: PropTypes.func,
};

export default PageSelector;
