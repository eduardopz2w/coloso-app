import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

class RankedMiniseries extends Component {
  constructor(props) {
    super(props);

    this.renderIcon = this.renderIcon.bind(this);
  }

  render() {
    const progressArray = this.props.progress.split('');
    return (<View style={[styles.root, this.props.style]}>
      {progressArray.map((progress, key) => this.renderIcon(progress, key))}
    </View>);
  }

  renderIcon(progress, key) {
    const iconSize = this.props.iconsSize || 20;

    if (progress === 'W') {
      return <Icon key={key} name="check" size={iconSize} color="#4CAF50" />;
    } else if (progress === 'L') {
      return <Icon key={key} name="close" size={iconSize} color="#D32F2F" />;
    }

    return <Icon key={key} name="remove" size={iconSize} color="#000" />;
  }
}

RankedMiniseries.propTypes = {
  progress: PropTypes.string.isRequired,
  style: PropTypes.object,
  iconsSize: PropTypes.number,
};

export default RankedMiniseries;
