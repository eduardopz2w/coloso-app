import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Dimensions, BackHandler, Text, ScrollView } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import I18n from 'i18n-js';
import _ from 'lodash';

import { RunePage, MasteryPage, ProBuildsList, ProPlayersSelector } from 'components';
import { tracker, colors } from 'utils';
import Team from './Team';
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
    this.handleOnChangeTab = this.handleOnChangeTab.bind(this);
    this.handleOnLoadMoreBuilds = this.handleOnLoadMoreBuilds.bind(this);
    this.handleOnChangeProPlayerSelected = this.handleOnChangeProPlayerSelected.bind(this);
    this.state = {
      summonerSelectedId: null,
      modalType: null,
      modalIsOpen: false,
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleOnBack.bind(this));

    if (!this.props.proPlayers.get('isFetched')) {
      this.props.fetchProPlayers();
    }
  }

  componentDidMount() {
    tracker.trackScreenView('GameCurrentView');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !Immutable.is(nextProps.proBuilds, this.props.proBuilds) ||
      !Immutable.is(nextProps.gameData, this.props.gameData) ||
      !Immutable.is(nextProps.proPlayers, this.props.proPlayers) ||
      !_.isEqual(nextState, this.state);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleOnBack);
  }

  getTeamData(teamId) {
    const participants = this.props.gameData.getIn(['data', 'participants']).filter(participant => participant.get('teamId') === teamId);
    const bannedChampions = this.props.gameData.getIn(['data', 'bannedChampions']).filter(bannedChamp => bannedChamp.get('teamId') === teamId);

    return {
      participants,
      bannedChampions,
    };
  }

  getSummonerRunes(summonerId) {
    return this.props.gameData.getIn(['data', 'participants']).find(participant => participant.get('summonerId') === summonerId).get('runes');
  }

  getSummonerMasteries(summonerId) {
    return this.props.gameData.getIn(['data', 'participants']).find(participant => participant.get('summonerId') === summonerId).get('masteries');
  }

  getFocusChampionId() {
    const focusSummonerId = this.props.gameData.get('summonerId');

    if (focusSummonerId) {
      const participantFound = this.props.gameData.getIn(['data', 'participants']).find(participant => participant.get('summonerId') === focusSummonerId);

      if (participantFound) {
        const championId = participantFound.get('championId');

        return championId;
      }
    }

    return 0;
  }

  handleOnPressRunesButton(summonerId) {
    this.setState({ summonerSelectedId: summonerId, modalType: 'RUNES' });
    this.modal.open();
  }

  handleOnPressMasteriesButton(summonerId) {
    this.setState({ summonerSelectedId: summonerId, modalType: 'MASTERIES' });
    this.modal.open();
  }

  handleOnBack() {
    if (this.state.modalIsOpen) {
      this.modal.close();
      return true;
    }

    return false;
  }

  handleOnChangeTab({ i: tabIndex }) {
    const proBuilds = this.props.proBuilds;
    const focusChampionId = this.getFocusChampionId();

    if (tabIndex === 1 &&
      !proBuilds.get('isFetching') &&
      proBuilds.getIn(['filters', 'championId']) !== focusChampionId
    ) {
      this.props.fetchProBuilds({
        championId: focusChampionId,
        proPlayerId: null,
        page: { number: 1 },
      });
    }
  }

  handleOnLoadMoreBuilds() {
    const pagData = this.props.proBuilds.get('pagination');
    if (!this.props.proBuilds.get('isFetching') && pagData.get('totalPages') > pagData.get('currentPage')) {
      this.props.fetchProBuilds({
        championId: this.getFocusChampionId(),
        proPlayerId: this.props.proBuilds.getIn(['filters', 'proPlayerId']),
        page: {
          number: pagData.get('currentPage') + 1,
        },
      });
    }
  }

  handleOnChangeProPlayerSelected(proPlayerId) {
    this.props.fetchProBuilds({
      championId: this.getFocusChampionId(),
      proPlayerId,
      page: { number: 1 },
    });
  }

  render() {
    const { proBuilds, gameData } = this.props;
    let modalContent;

    if (this.state.modalType === 'RUNES') {
      modalContent = (<View>
        <Text style={styles.modalTitle}>{I18n.t('runes')}</Text>
        <RunePage
          page={Immutable.Map({ runes: this.getSummonerRunes(this.state.summonerSelectedId) })}
        />
      </View>);
    } else if (this.state.modalType === 'MASTERIES') {
      modalContent = (<View>
        <Text style={styles.modalTitle}>{I18n.t('masteries')}</Text>
        <MasteryPage
          page={Immutable.Map({
            masteries: this.getSummonerMasteries(this.state.summonerSelectedId),
          })}
        />
      </View>);
    }

    return (<View style={styles.root}>
      <Toolbar
        mapId={gameData.getIn(['data', 'mapId'])}
        gameQueueConfigId={gameData.getIn(['data', 'gameQueueConfigId'])}
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
        <View style={{ flex: 1 }} tabLabel={I18n.t('players')}>
          <ScrollView>
            <Team
              {...this.getTeamData(100)}
              onPressRunesButton={this.handleOnPressRunesButton}
              onPressMasteriesButton={this.handleOnPressMasteriesButton}
              onPressProfileButton={(summonerId) => {
                Actions.summonerProfileView({ summonerId });
              }}
            />
            <Team
              {...this.getTeamData(200)}
              onPressRunesButton={this.handleOnPressRunesButton}
              onPressMasteriesButton={this.handleOnPressMasteriesButton}
              onPressProfileButton={(summonerId) => {
                Actions.summonerProfileView({ summonerId });
              }}
            />
          </ScrollView>
        </View>
        <View tabLabel={I18n.t('pro_builds')} style={{ flex: 1 }}>
          <ProPlayersSelector
            value={this.props.proBuilds.getIn(['filters', 'proPlayerId'])}
            proPlayers={this.props.proPlayers.get('data')}
            style={{ paddingHorizontal: 16, backgroundColor: 'rgba(0,0,0,0.1)' }}
            disabled={this.props.proBuilds.get('isFetching')}
            onChangeSelected={this.handleOnChangeProPlayerSelected}
          />
          <ProBuildsList
            builds={proBuilds.get('data')}
            isFetching={proBuilds.get('isFetching')}
            fetchError={proBuilds.get('fetchError')}
            errorMessage={proBuilds.get('errorMessage')}
            emptyListMessage={I18n.t('no_results_found')}
            onPressBuild={buildId => Actions.proBuildView({ buildId })}
            onLoadMore={this.handleOnLoadMoreBuilds}
            onPressRetry={() => {
              this.props.fetchProBuilds({
                championId: this.getFocusChampionId(),
                proPlayerId: proBuilds.getIn(['filters', 'proPlayerId']),
              }, this.props.proBuilds.getIn(['pagination', 'currentPage']) + 1);
            }}
            onAddFavorite={this.props.addFavoriteBuild}
            onRemoveFavorite={this.props.removeFavoriteBuild}
          />
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
    id: PropTypes.string.isRequired,
    summonerId: PropTypes.string.isRequired,
    data: ImmutablePropTypes.mapContains({
      participants: ImmutablePropTypes.list,
      mapId: PropTypes.number,
      gameQueueConfigId: PropTypes.number,
      gameLength: PropTypes.number,
      region: PropTypes.string,
      gameStartTime: PropTypes.number,
    }),
  }),
  proBuilds: ImmutablePropTypes.mapContains({
    builds: ImmutablePropTypes.list,
    isFetching: PropTypes.bool,
    fetched: PropTypes.bool,
    fetchError: PropTypes.bool,
    errorMessage: PropTypes.string,
    pagination: ImmutablePropTypes.mapContains({
      currentPage: PropTypes.number,
      totalPages: PropTypes.number,
    }),
  }),
  proPlayers: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool,
    data: ImmutablePropTypes.list,
  }),
  // Dispatchers
  fetchProBuilds: PropTypes.func.isRequired,
  fetchProPlayers: PropTypes.func.isRequired,
  addFavoriteBuild: PropTypes.func.isRequired,
  removeFavoriteBuild: PropTypes.func.isRequired,
};

export default GameCurrentView;
