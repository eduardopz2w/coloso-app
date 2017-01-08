import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BannedChampions from './BannedChampions';
import Participant from './Participant';

const styles = StyleSheet.create({
  root: {},
});

class Team extends PureComponent {
  render() {
    const { bannedChampions, participants } = this.props;

    return (<View style={styles.root}>
      {bannedChampions.size > 0 &&
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
  participants: ImmutablePropTypes.list,
  bannedChampions: ImmutablePropTypes.list,
  onPressRunesButton: PropTypes.func.isRequired,
  onPressMasteriesButton: PropTypes.func.isRequired,
  onPressProfileButton: PropTypes.func.isRequired,
};

export default Team;
