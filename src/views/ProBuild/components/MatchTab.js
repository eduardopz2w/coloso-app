import React, { PureComponent, PropTypes } from 'react';
import { ScrollView } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';

import LoaderLayout from '../../../components/LoaderLayout';
import BannedChampions from '../../../components/BannedChampions';
import TeamHeader from './TeamHeader';
import Participant from './Participant';

class Matchtab extends PureComponent {
  constructor(props) {
    super(props);

    this.renderContent = this.renderContent.bind(this);
  }

  getTeam(teamId) {
    const teamsDataList = this.props.match.getIn(['data', 'teams']);

    return teamsDataList.find(team => team.get('teamId') === teamId);
  }

  getParticipants(teamId) {
    const participantsList = this.props.match.getIn(['data', 'participants']);

    return participantsList.filter(participant => participant.get('teamId') === teamId);
  }

  renderContent() {
    const blueTeam = this.getTeam(100);
    const redTeam = this.getTeam(200);
    const blueParticipants = this.getParticipants(100);
    const redParticipants = this.getParticipants(200);

    return (<ScrollView>
      <TeamHeader team={blueTeam} participants={blueParticipants} />
      <BannedChampions champions={blueTeam.get('bans')} />
      {blueParticipants.map(participant => <Participant
        key={participant.get('participantId')}
        participant={participant}
        onPressParticipant={this.props.onPressParticipant}
      />)}
      <TeamHeader team={redTeam} participants={redParticipants} />
      <BannedChampions champions={redTeam.get('bans')} />
      {redParticipants.map(participant => <Participant
        key={participant.get('participantId')}
        participant={participant}
        onPressParticipant={this.props.onPressParticipant}
      />)}
    </ScrollView>);
  }

  render() {
    return (<LoaderLayout
      renderFunction={this.renderContent}
      fetched={this.props.match.get('fetched')}
      isFetching={this.props.match.get('isFetching')}
      errorMessage={this.props.match.get('errorMessage')}
      onPressRetryButton={this.props.onPressRetryButton}
    />);
  }
}

Matchtab.propTypes = {
  match: ImmutablePropTypes.mapContains({
    fetched: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    data: ImmutablePropTypes.mapContains({}),
  }).isRequired,
  onPressRetryButton: PropTypes.func.isRequired,
  onPressParticipant: PropTypes.func.isRequired,
};

export default Matchtab;
