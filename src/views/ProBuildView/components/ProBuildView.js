import React, { Component, PropTypes } from 'react';
import { View, Image, Text, BackHandler } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Modal from 'react-native-modalbox';
import numeral from 'numeral';
import I18n from 'i18n-js';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import Immutable from 'immutable';
import _ from 'lodash';

import { colors, tracker } from 'utils';
import { LoadingIndicator, ErrorScreen } from 'components';
import PlayerToolbar from './PlayerToolbar';
import BasicToolbar from './BasicToolbar';
import RuneTab from './RuneTab';
import MasteryTab from './MasteryTab';
import BuildTab from './BuildTab';
import GameTab from './GameTab';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      flex: 1,
    },

    basicContainer: {
      padding: 16,
      flex: 1,
    },

    item: {
      width: 40,
      height: 40,
      borderWidth: 3,
      borderColor: 'black',
      marginBottom: 16,
    },

    goldText: {
      color: colors.tiers.gold,
      fontWeight: 'bold',
      textShadowColor: '#000',
      textShadowOffset: {
        width: 0.2,
        height: 0.2,
      },
    },

    modal: {
      width: 300,
      height: null,
    },
  }, {
    '@media (min-device-width: 600)': {
      modal: {
        width: 450,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
      },
    },
  },
);

class ProBuildView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalData: {
        itemName: '',
        itemPlainText: '',
        itemId: 0,
        itemGold: 0,
      },
    };

    this.handleOnPressItem = this.handleOnPressItem.bind(this);
    this.handleOnPressProfileButton = this.handleOnPressProfileButton.bind(this);
    this.handleOnChangeTab = this.handleOnChangeTab.bind(this);
    this.handleOnPressParticipant = this.handleOnPressParticipant.bind(this);
    this.handleOnPressAddToFavorites = this.handleOnPressAddToFavorites.bind(this);
    this.handleOnPressRemoveFromFavorites = this.handleOnPressRemoveFromFavorites.bind(this);
    this.handleHardwareBack = this.handleHardwareBack.bind(this);
    this.fetchGame = this.fetchGame.bind(this);
    this.fetchBuild = this.fetchBuild.bind(this);
  }

  componentWillMount() {
    const fetched = this.props.proBuild.get('fetched');
    const fetchedProBuildId = this.props.proBuild.getIn(['data', 'id']);

    if (!fetched || fetchedProBuildId !== this.props.buildId) {
      this.fetchBuild();
    }

    BackHandler.addEventListener('hardwareBackPress', this.handleHardwareBack);
  }

  componentDidMount() {
    tracker.trackScreenView('ProBuildView');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !Immutable.is(nextProps.proBuild, this.props.proBuild) ||
      !Immutable.is(nextProps.game, this.props.game) ||
      !_.isEqual(nextState, this.state);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleHardwareBack);
  }

  fetchGame() {
    const gameId = this.props.proBuild.getIn(['data', 'gameId']);

    this.props.fetchGame(gameId);
  }

  fetchBuild() {
    const buildId = this.props.navigation.state.params.buildId;

    this.props.fetchProBuild(buildId);
  }

  handleOnPressAddToFavorites() {
    const buildId = this.props.navigation.state.params.buildId;

    this.props.addToFavorites(buildId);
  }

  handleOnPressRemoveFromFavorites() {
    const buildId = this.props.navigation.state.params.buildId;

    this.props.removeFromFavorites(buildId);
  }

  handleHardwareBack() {
    this.props.goBack();

    return true;
  }

  handleOnPressItem(itemData) {
    this.setState({
      modalData: {
        itemName: itemData.name,
        itemPlainText: itemData.plaintext,
        itemId: itemData.itemId,
        itemGold: numeral(itemData.gold.total).format('0,0'),
      },
    }, () => {
      this.modal.open();
    });
  }

  handleOnPressParticipant(summonerId) {
    this.props.goToSummonerProfile(summonerId);
  }

  handleOnPressProfileButton() {
    const summonerId = this.props.proBuild.getIn(['data', 'proSummoner', 'summonerId']);

    this.handleOnPressParticipant(summonerId);
  }

  handleOnChangeTab({ i }) {
    if (i === 3) {
      const matchFetched = this.props.game.get('fetched');
      const matchFetchedUrid = this.props.game.get('id');
      const actualMatchUrid = this.props.proBuild.getIn(['data', 'gameId']);

      if (!matchFetched || matchFetchedUrid !== actualMatchUrid) {
        this.fetchGame();
      }
    }
  }

  render() {
    const proBuildData = this.props.proBuild.get('data');

    if (this.props.proBuild.get('fetched')) {
      return (<View style={styles.root}>
        <PlayerToolbar
          name={proBuildData.getIn(['proSummoner', 'proPlayer', 'name'])}
          imageUrl={proBuildData.getIn(['proSummoner', 'proPlayer', 'imageUrl'])}
          role={proBuildData.getIn(['proSummoner', 'proPlayer', 'role'])}
          realName={proBuildData.getIn(['proSummoner', 'proPlayer', 'realName'])}
          isFavorite={proBuildData.get('isFavorite')}
          onPressBackButton={this.props.goBack}
          onPressProfileButton={this.handleOnPressProfileButton}
          onPressAddFavorite={this.handleOnPressAddToFavorites}
          onPressRemoveFavorite={this.handleOnPressRemoveFromFavorites}
        />
        <ScrollableTabView
          initialPage={0}
          renderTabBar={() => <DefaultTabBar />}
          tabBarBackgroundColor={colors.primary}
          tabBarActiveTextColor="white"
          tabBarInactiveTextColor="rgba(255,255,255,0.8)"
          tabBarUnderlineStyle={{ backgroundColor: colors.accent }}
          onChangeTab={this.handleOnChangeTab}
          locked
        >
          <BuildTab
            tabLabel="Build"
            proBuild={this.props.proBuild}
            onPressItem={this.handleOnPressItem}
          />
          <RuneTab tabLabel={I18n.t('runes')} runes={proBuildData.get('runes')} />
          <MasteryTab tabLabel={I18n.t('masteries')} masteries={proBuildData.get('masteries')} />
          <GameTab
            tabLabel={I18n.t('game')}
            game={this.props.game}
            onPressRetryButton={this.fetchGame}
            onPressParticipant={this.handleOnPressParticipant}
          />
        </ScrollableTabView>

        <Modal
          position="bottom"
          style={styles.modal}
          backdrop={false}
          ref={(modal) => { this.modal = modal; }}
        >
          <View style={{ flexDirection: 'row', padding: 16 }}>
            <View style={{ marginRight: 8 }}>
              <Image
                style={styles.item}
                source={{ uri: `item_${this.state.modalData.itemId}` }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold' }}>{this.state.modalData.itemName}</Text>
              <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                <Image style={{ width: 20, height: 20, marginRight: 8 }} source={{ uri: 'ui_gold' }} />
                <Text style={styles.goldText}>{this.state.modalData.itemGold}</Text>
              </View>
              <Text>{this.state.modalData.itemPlainText}</Text>
            </View>
          </View>
        </Modal>
      </View>);
    } else if (this.props.proBuild.get('isFetching')) {
      return (<View style={styles.root}>
        <BasicToolbar
          onPressBackButton={this.props.goBack}
        />
        <View style={[styles.basicContainer, { alignItems: 'center' }]}>
          <LoadingIndicator />
        </View>
      </View>);
    }

    return (<View style={styles.root}>
      <BasicToolbar
        onPressBackButton={this.props.goBack}
      />
      <View style={styles.basicContainer}>
        <ErrorScreen
          message={this.props.proBuild.get('errorMessage')}
          onPressRetryButton={this.fetchBuild}
          retryButton
        />
      </View>
    </View>);
  }
}

ProBuildView.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        buildId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  buildId: PropTypes.string,
  proBuild: ImmutablePropTypes.mapContains({
    fetched: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    data: ImmutablePropTypes.mapContains({
      isFavorite: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  game: ImmutablePropTypes.mapContains({
    fetched: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    data: ImmutablePropTypes.mapContains({}),
  }).isRequired,
  // Dispatchers
  fetchProBuild: PropTypes.func.isRequired,
  fetchGame: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  goToSummonerProfile: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default ProBuildView;
