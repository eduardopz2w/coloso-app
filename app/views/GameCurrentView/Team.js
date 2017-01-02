import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import BannedChampions from './BannedChampions';
import Participant from './Participant';

const styles = StyleSheet.create({
  root: {},
});

class Team extends Component {
  render() {
    const { bannedChampions, participants } = this.props;

    return (<View style={styles.root}>
        {bannedChampions.length > 0 &&
          <BannedChampions champions={bannedChampions} />
        }
        {participants.map((participant, key) => <Participant
          key={key}
          participant={participant}
          onPressRunesButton={this.props.onPressRunesButton}
          onPressMasteriesButton={this.props.onPressMasteriesButton}
          onPressProfileButton={this.props.onPressProfileButton}
        />)}
    </View>);
  }
}

Team.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.shape({})),
  bannedChampions: PropTypes.arrayOf(PropTypes.shape({})),
  onPressRunesButton: PropTypes.func.isRequired,
  onPressMasteriesButton: PropTypes.func.isRequired,
  onPressProfileButton: PropTypes.func.isRequired,
};

export default Team;
