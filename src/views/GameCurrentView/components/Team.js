import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { MKColor } from 'react-native-material-kit';
import Immutable from 'immutable';

import { BannedChampions } from '../../../components';
import Participant from './Participant';

const styles = StyleSheet.create({
  root: {},
  hightlight: {
    backgroundColor: MKColor.Silver,
  },
});

class Team extends PureComponent {
  shouldComponentUpdate(nextProps) {
    return !Immutable.is(nextProps.participants, this.props.participants);
  }

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
