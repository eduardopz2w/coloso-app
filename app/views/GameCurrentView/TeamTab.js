import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import BannedChampions from './BannedChampions';
import Participant from './Participant';

const styles = StyleSheet.create({
  root: {},
});

class TeamTab extends Component {
  render() {
    const { bannedChampions, participants } = this.props;

    return (<View style={styles.root}>
      <ScrollView>
        <BannedChampions champions={bannedChampions} />
        {participants.map((participant, key) => <Participant
          key={key}
          participant={participant}
          onPressRunesButton={this.props.onPressRunesButton}
          onPressMasteriesButton={this.props.onPressMasteriesButton}
        />)}
      </ScrollView>
    </View>);
  }
}

TeamTab.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.shape({})),
  bannedChampions: PropTypes.arrayOf(PropTypes.shape({})),
  onPressRunesButton: PropTypes.func.isRequired,
  onPressMasteriesButton: PropTypes.func.isRequired,
};

export default TeamTab;
