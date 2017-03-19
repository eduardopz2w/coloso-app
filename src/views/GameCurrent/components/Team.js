import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { MKColor } from 'react-native-material-kit';

import BannedChampions from '../../../components/BannedChampions';
import Participant from './Participant';

const styles = StyleSheet.create({
  root: {},
  hightlight: {
    backgroundColor: MKColor.Silver,
  },
});

class Team extends PureComponent {
  render() {
    const { bannedChampions, participants, focusSummonerUrid } = this.props;

    return (<View style={styles.root}>
      {bannedChampions.size > 0 &&
        <BannedChampions champions={bannedChampions} />
      }
      {participants.map((participant, key) => <Participant
        style={(participant.get('summonerUrid') === focusSummonerUrid) && styles.hightlight}
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
  focusSummonerUrid: PropTypes.string,
  bannedChampions: ImmutablePropTypes.list,
  onPressRunesButton: PropTypes.func.isRequired,
  onPressMasteriesButton: PropTypes.func.isRequired,
  onPressProfileButton: PropTypes.func.isRequired,
};

export default Team;
