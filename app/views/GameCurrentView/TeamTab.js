import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BannedChampions from './BannedChampions';

const styles = StyleSheet.create({
  root: {},
});

class TeamTab extends Component {
  render() {
    const { bannedChampions } = this.props;

    return (<View style={styles.root}>
      <BannedChampions champions={bannedChampions} />
    </View>);
  }
}

TeamTab.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.shape({
    championId: PropTypes.number.isRequired,
  })),
  bannedChampions: PropTypes.arrayOf(PropTypes.shape({
    championId: PropTypes.number.isRequired,
  })),
};

export default TeamTab;
