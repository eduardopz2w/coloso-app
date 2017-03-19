import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import I18n from 'i18n-js';

import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  root: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1.5,
  },
  teamNameAndStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    flex: 1,
  },
  winStatus: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreImage: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  totalScore: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  kills: {
    color: colors.victory,
  },
  deaths: {
    color: colors.defeat,
  },
});

class TeamHeader extends PureComponent {
  getRootStyles() {
    const winner = this.props.team.get('winner');

    if (winner) {
      return { backgroundColor: '#C5CAE9', borderColor: colors.primary };
    }

    return { backgroundColor: '#FFCDD2', borderColor: colors.defeat };
  }

  getTotalScore() {
    const score = {
      kills: 0,
      deaths: 0,
      assists: 0,
    };

    this.props.participants.forEach((participant) => {
      const kills = participant.getIn(['stats', 'kills']) || 0;
      const deaths = participant.getIn(['stats', 'deaths']) || 0;
      const assists = participant.getIn(['stats', 'assists']) || 0;

      score.kills += kills;
      score.deaths += deaths;
      score.assists += assists;
    });

    return score;
  }

  getTeamName() {
    if (this.props.team.get('teamId') === 100) {
      return I18n.t('blue_team');
    }

    return I18n.t('red_team');
  }

  renderWinStatus() {
    const winner = this.props.team.get('winner');
    const winStatusText = winner ? I18n.t('victory') : I18n.t('defeat');

    return (<Text
      style={[
        styles.winStatus,
        winner ? { color: colors.victory } : { color: colors.defeat },
      ]}
    >
      {winStatusText}
    </Text>);
  }

  render() {
    const totalScore = this.getTotalScore();

    return (<View style={[styles.root, this.getRootStyles()]}>
      <Text style={styles.teamNameAndStatus}>{this.getTeamName()} - {this.renderWinStatus()}</Text>
      <Image style={styles.scoreImage} source={{ uri: 'ui_score' }} />
      <Text style={styles.totalScore}>
        <Text style={styles.kills}>{totalScore.kills}</Text>/
        <Text style={styles.deaths}>{totalScore.deaths}</Text>/
        <Text>{totalScore.assists}</Text>
      </Text>
    </View>);
  }
}

TeamHeader.propTypes = {
  team: ImmutablePropTypes.mapContains({
    teamId: PropTypes.number.isRequired,
    winner: PropTypes.bool.isRequired,
  }).isRequired,
  participants: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
    stats: ImmutablePropTypes.mapContains({
      kills: PropTypes.number,
      deaths: PropTypes.number,
      assists: PropTypes.number,
    }).isRequired,
  })).isRequired,
};

export default TeamHeader;
