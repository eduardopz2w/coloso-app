import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import _ from 'lodash';
import TeamTab from './TeamTab';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

class GameCurrentView extends Component {
  constructor(props) {
    super(props);

    this.getTeamData = this.getTeamData.bind(this);
  }

  getTeamData(teamId) {
    const { gameData } = this.props;
    const participants = _.filter(gameData.participants, { teamId });
    const bannedChampions = _.filter(gameData.bannedChampions, { teamId });

    return {
      participants,
      bannedChampions,
    };
  }

  render() {
    return (<View style={styles.root}>
      <ScrollableTabView
        initialPage={0}
        prerenderingSiblingsNumber={2}
        renderTabBar={() => <DefaultTabBar />}
      >
        <TeamTab tabLabel="Blue Team" {...this.getTeamData(100)} />
        <TeamTab tabLabel="Red Team" {...this.getTeamData(200)} />
      </ScrollableTabView>
    </View>);
  }
}

GameCurrentView.propTypes = {
  gameData: PropTypes.shape({
    participants: PropTypes.array.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  const gameData = state.gameCurrent.get('gameData').toJS();

  return { gameData };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCurrentView);
