import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Dimensions, BackAndroid } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import _ from 'lodash';
import colors from '../../utils/colors';
import TeamTab from './TeamTab';
import RunePage from '../../components/RunePage';
import MasteryPage from '../../components/MasteryPage';
import Toolbar from './Toolbar';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

class GameCurrentView extends Component {
  constructor(props) {
    super(props);

    this.getTeamData = this.getTeamData.bind(this);
    this.getSummonerRunes = this.getSummonerRunes.bind(this);
    this.getSummonerMasteries = this.getSummonerMasteries.bind(this);
    this.handleOnPressRunesButton = this.handleOnPressRunesButton.bind(this);
    this.handleOnPressMasteriesButton = this.handleOnPressMasteriesButton.bind(this);
    this.getModalStyle = this.getModalStyle.bind(this);
    this.state = {
      summonerSelectedId: null,
      modalType: null,
      modalIsOpen: false,
    };
  }

  componentWillMount() {
    this.backAndroidListener = BackAndroid.addEventListener('hardwareBackPress', this.handleOnBackAndroid.bind(this));
  }

  componentWillUnmount() {
    this.backAndroidListener.remove();
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

  getSummonerRunes(summonerId) {
    return _.find(this.props.gameData.participants, { summonerId }).runes;
  }

  getSummonerMasteries(summonerId) {
    return _.find(this.props.gameData.participants, { summonerId }).masteries;
  }


  getModalStyle() {
    const modalStyle = {
      width: 300,
      height: 280,
    };

    if (this.state.modalType === 'MASTERIES') {
      modalStyle.height = Dimensions.get('window').height * 0.8;
    }

    return modalStyle;
  }

  handleOnPressRunesButton(summonerId) {
    this.setState({ summonerSelectedId: summonerId, modalType: 'RUNES' });
    this.modal.open();
  }

  handleOnPressMasteriesButton(summonerId) {
    this.setState({ summonerSelectedId: summonerId, modalType: 'MASTERIES' });
    this.modal.open();
  }

  handleOnBackAndroid() {
    if (this.state.modalIsOpen) {
      this.modal.close();
      return true;
    }

    return false;
  }

  render() {
    let modalContent;

    if (this.state.modalType === 'RUNES') {
      modalContent = (<RunePage
        page={{ runes: this.getSummonerRunes(this.state.summonerSelectedId) }}
      />);
    } else if (this.state.modalType === 'MASTERIES') {
      modalContent = (<MasteryPage
        page={{ masteries: this.getSummonerMasteries(this.state.summonerSelectedId) }}
      />);
    }

    return (<View style={styles.root}>
      <Toolbar
        mapId={this.props.gameData.mapId}
        gameQueueConfigId={this.props.gameData.gameQueueConfigId}
        onPressBackButton={() => Actions.pop()}
      />
      <ScrollableTabView
        initialPage={0}
        prerenderingSiblingsNumber={2}
        tabBarBackgroundColor={colors.primary}
        tabBarActiveTextColor={colors.accent}
        tabBarInactiveTextColor="rgba(255,255,255,0.8)"
        tabBarUnderlineStyle={{ backgroundColor: colors.accent }}
        renderTabBar={() => <DefaultTabBar />}
      >
        <TeamTab
          tabLabel="Equipo Azul"
          {...this.getTeamData(100)}
          onPressRunesButton={this.handleOnPressRunesButton}
          onPressMasteriesButton={this.handleOnPressMasteriesButton}
        />

        <TeamTab
          tabLabel="Equipo Rojo"
          {...this.getTeamData(200)}
          onPressRunesButton={this.handleOnPressRunesButton}
          onPressMasteriesButton={this.handleOnPressMasteriesButton}
        />
      </ScrollableTabView>
      <Modal
        position="center"
        style={this.getModalStyle()}
        swipeToClose={false}
        ref={(modal) => { this.modal = modal; }}
        onOpened={() => this.setState({ modalIsOpen: true })}
        onClosed={() => this.setState({ modalIsOpen: false })}
      >
        {modalContent}
      </Modal>
    </View>);
  }
}

GameCurrentView.propTypes = {
  gameData: PropTypes.shape({
    participants: PropTypes.array.isRequired,
    mapId: PropTypes.number.isRequired,
    gameQueueConfigId: PropTypes.number.isRequired,
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
