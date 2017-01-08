import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Dimensions, BackAndroid, Text, ScrollView } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import colors from '../../utils/colors';
import Team from './Team';
import { fetchBuilds } from '../../redux/actions/GameCurrentViewActions';
import RunePage from '../../components/RunePage';
import MasteryPage from '../../components/MasteryPage';
import ProBuildsList from '../../components/ProBuildsList';
import ErrorScreen from '../../components/ErrorScreen';
import { tracker } from '../../utils/analytics';
import Toolbar from './Toolbar';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container: {
    padding: 16,
    flex: 1,
  },
});

const PAGESIZE = 25;

function getModalStyle() {
  const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');
  const modalStyle = {
    height: null,
    maxHeight: deviceHeight * 0.8,
    padding: 16,
  };

  // Mobil
  if (deviceWidth < 600) {
    modalStyle.width = 300;
  } else {
    modalStyle.width = 550;
  }

  return modalStyle;
}

class GameCurrentView extends Component {
  constructor(props) {
    super(props);

    this.getTeamData = this.getTeamData.bind(this);
    this.getSummonerRunes = this.getSummonerRunes.bind(this);
    this.getSummonerMasteries = this.getSummonerMasteries.bind(this);
    this.handleOnPressRunesButton = this.handleOnPressRunesButton.bind(this);
    this.handleOnPressMasteriesButton = this.handleOnPressMasteriesButton.bind(this);
    this.handleOnPressProfileButton = this.handleOnPressProfileButton.bind(this);
    this.handleOnChangeTab = this.handleOnChangeTab.bind(this);
    this.handleOnLoadMoreBuilds = this.handleOnLoadMoreBuilds.bind(this);
    this.fetchBuilds = this.fetchBuilds.bind(this);
    this.state = {
      summonerSelectedId: null,
      modalType: null,
      modalIsOpen: false,
    };
  }

  componentWillMount() {
    this.backAndroidListener = BackAndroid.addEventListener('hardwareBackPress', this.handleOnBackAndroid.bind(this));
  }

  componentDidMount() {
    tracker.trackScreenView('GameCurrentView');
  }

  componentWillUnmount() {
    this.backAndroidListener.remove();
  }

  getTeamData(teamId) {
    const participants = this.props.gameData.get('participants').filter(participant => participant.get('teamId') === teamId);
    const bannedChampions = this.props.gameData.get('bannedChampions').filter(bannedChamp => bannedChamp.get('teamId') === teamId);

    return {
      participants,
      bannedChampions,
    };
  }

  getSummonerRunes(summonerId) {
    return this.props.gameData.get('participants').find(participant => participant.get('summonerId') === summonerId).get('runes');
  }

  getSummonerMasteries(summonerId) {
    return this.props.gameData.get('participants').find(participant => participant.get('summonerId') === summonerId).get('masteries');
  }

  handleOnPressRunesButton(summonerId) {
    this.setState({ summonerSelectedId: summonerId, modalType: 'RUNES' });
    this.modal.open();
  }

  handleOnPressMasteriesButton(summonerId) {
    this.setState({ summonerSelectedId: summonerId, modalType: 'MASTERIES' });
    this.modal.open();
  }

  handleOnPressProfileButton(summonerId) {
    Actions.summoner_profile_view({ summonerId, region: this.props.gameData.get('region') });
  }

  handleOnBackAndroid() {
    if (this.state.modalIsOpen) {
      this.modal.close();
      return true;
    }

    return false;
  }

  handleOnChangeTab({ i: tabIndex }) {
    if (tabIndex === 1 && !this.props.builds.get('fetched')) {
      this.fetchBuilds(1);
    }
  }

  handleOnLoadMoreBuilds() {
    const pagData = this.props.builds.get('pagination');
    if (!this.props.builds.get('isFetching') && pagData.get('pageCount') > pagData.get('page')) {
      this.fetchBuilds(
        pagData.page + 1,
        PAGESIZE,
      );
    }
  }

  fetchBuilds(page) {
    const focusSummonerId = this.props.gameData.get('focusSummonerId');

    if (focusSummonerId > 0) {
      const participantFound = this.props.gameData.get('participants').find(participant => participant.get('summonerId') === focusSummonerId);

      if (participantFound) {
        const championId = participantFound.get('championId');

        this.props.fetchBuilds(championId, page);
      }
    }
  }

  render() {
    const { builds, gameData } = this.props;
    let modalContent;
    let proBuildsContent;

    if (builds.fetchError) {
      proBuildsContent = (<View style={styles.container}>
        <ErrorScreen
          message={builds.get('errorMessage')}
          onPressRetryButton={() => { this.fetchBuilds(); }}
          retryButton
        />
      </View>);
    } else if (builds.get('builds').size > 0 || builds.get('isFetching')) {
      proBuildsContent = (<ProBuildsList
        builds={builds.get('builds')}
        onPressBuild={buildId => Actions.probuild_view({ buildId })}
        isFetching={builds.get('isFetching')}
        onLoadMore={this.handleOnLoadMoreBuilds}
      />);
    } else {
      proBuildsContent = (<View style={styles.container}>
        <Text>
          Actualmente no hay builds disponibles para este campeon, pronto estaran disponibles!.
        </Text>
      </View>);
    }

    if (this.state.modalType === 'RUNES') {
      modalContent = (<View>
        <Text style={styles.modalTitle}>Runas</Text>
        <RunePage
          page={Immutable.Map({ runes: this.getSummonerRunes(this.state.summonerSelectedId) })}
        />
      </View>);
    } else if (this.state.modalType === 'MASTERIES') {
      modalContent = (<View>
        <Text style={styles.modalTitle}>Maestrias</Text>
        <MasteryPage
          page={Immutable.Map({
            masteries: this.getSummonerMasteries(this.state.summonerSelectedId),
          })}
        />
      </View>);
    }

    return (<View style={styles.root}>
      <Toolbar
        mapId={gameData.get('mapId')}
        gameQueueConfigId={gameData.get('gameQueueConfigId')}
        gameLength={gameData.get('gameLength')}
        onPressBackButton={() => Actions.pop()}
      />
      <ScrollableTabView
        tabBarBackgroundColor={colors.primary}
        tabBarActiveTextColor={colors.accent}
        tabBarInactiveTextColor="rgba(255,255,255,0.8)"
        tabBarUnderlineStyle={{ backgroundColor: colors.accent }}
        renderTabBar={() => <DefaultTabBar />}
        onChangeTab={this.handleOnChangeTab}
      >
        <View style={{ flex: 1 }} tabLabel="Jugadores">
          <ScrollView>
            <Team
              {...this.getTeamData(100)}
              onPressRunesButton={this.handleOnPressRunesButton}
              onPressMasteriesButton={this.handleOnPressMasteriesButton}
              onPressProfileButton={this.handleOnPressProfileButton}
            />
            <Team
              {...this.getTeamData(200)}
              onPressRunesButton={this.handleOnPressRunesButton}
              onPressMasteriesButton={this.handleOnPressMasteriesButton}
              onPressProfileButton={this.handleOnPressProfileButton}
            />
          </ScrollView>
        </View>
        <View tabLabel="Builds Profesionales" style={{ flex: 1 }}>
          {proBuildsContent}
        </View>
      </ScrollableTabView>
      <Modal
        position="center"
        style={getModalStyle()}
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
  gameData: ImmutablePropTypes.mapContains({
    participants: ImmutablePropTypes.list,
    mapId: PropTypes.number,
    gameQueueConfigId: PropTypes.number,
    gameLength: PropTypes.number,
    region: PropTypes.string,
    gameStartTime: PropTypes.number,
    focusSummonerId: PropTypes.number,
  }),
  builds: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool,
    fetched: PropTypes.bool,
    fetchError: PropTypes.bool,
    errorMessage: PropTypes.string,
    builds: ImmutablePropTypes.list,
    pagination: ImmutablePropTypes.mapContains({
      page: PropTypes.number,
      pageSize: PropTypes.number,
    }),
  }),
  fetchBuilds: PropTypes.func,
};

function mapStateToProps(state) {
  const gameData = state.gameCurrentView.get('gameData');
  const builds = state.gameCurrentView.get('builds');

  return { gameData, builds };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBuilds: (championId, page) => {
      dispatch(fetchBuilds(championId, page, PAGESIZE));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCurrentView);
