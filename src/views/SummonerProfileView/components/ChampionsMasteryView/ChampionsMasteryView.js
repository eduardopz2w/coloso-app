import React, { Component, PropTypes } from 'react';
import { ListView, Dimensions, Text, View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import Modal from 'react-native-modalbox';
import I18n from 'i18n-js';
import _ from 'lodash';

import LoadingIndicator from '../../../../components/LoadingIndicator';
import ErrorScreen from '../../../../components/ErrorScreen';
import { tracker } from '../../../../utils/analytics';
import ChampionMastery from './ChampionMastery';
import MasteryInfo from './MasteryInfo';
import Summary from './Summary';

const styles = MediaQueryStyleSheet.create(
  {
    rootListView: {
      flex: 1,
    },

    listViewContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      padding: 16,
    },

    container: {
      flex: 1,
      padding: 16,
    },

    modal: {
      maxWidth: 300,
      height: null,
      padding: 16,
    },
  },
  {
    '@media (min-device-width: 600)': {
      messageText: {
        fontSize: 18,
      },
      modal: {
        maxWidth: 500,
      },
    },
  },
);

class ChampionsMasteryView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      championSelectedIndex: 0,
    };

    this.windowDimensions = Dimensions.get('window');
    this.handleOnPressChampion = this.handleOnPressChampion.bind(this);
    this.getModalContent = this.getModalContent.bind(this);
    this.getMasteriesList = this.getMasteriesList.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.championsMasteryDataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !Immutable.is(r1, r2),
    });
  }

  componentDidMount() {
    tracker.trackScreenView('ChampionsMasteryView');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !Immutable.is(nextProps.championsMasteries, this.props.championsMasteries) ||
      !_.isEqual(nextState, this.state);
  }

  getModalContent() {
    if (this.state.championSelectedIndex === 0) {
      return null;
    }

    const masteries = this.getMasteriesList();
    const masteryFound = masteries.get(this.state.championSelectedIndex);

    return <MasteryInfo mastery={masteryFound} />;
  }

  getMasteriesList() {
    const masteriesList = this.props.championsMasteries.getIn(['data', 'masteries']);

    if (masteriesList) {
      return masteriesList;
    }

    return Immutable.List();
  }

  handleOnPressChampion(championId, championIndex) {
    this.setState({ championSelectedIndex: championIndex }, () => {
      this.modal.open();
    });
  }

  renderContent() {
    const masteriesList = this.getMasteriesList();
    let championImageSize;
    let progressWidth;
    let pageSize;

    if (this.windowDimensions.width <= 500) {
      championImageSize = 70;
      progressWidth = 5;
      pageSize = 9;
    } else {
      championImageSize = 100;
      progressWidth = 7;
      pageSize = 16;
    }

    if (masteriesList.size === 0) {
      return (<View style={{ flex: 1 }}>
        <Summary masteries={masteriesList} />
        <View style={styles.container}>
          <Text style={styles.messageText}>
            {I18n.t('summoner_does_not_have_champions_masteries')}
          </Text>
        </View>
      </View>);
    }

    return (<View style={{ flex: 1 }}>
      <Summary masteries={masteriesList} />
      <ListView
        style={styles.rootListView}
        pageSize={pageSize}
        contentContainerStyle={styles.listViewContainer}
        dataSource={this.championsMasteryDataSource.cloneWithRows(masteriesList.toArray())}
        renderRow={(mastery, sectionId, rowId) => <ChampionMastery
          key={rowId}
          onPress={(championId) => { this.handleOnPressChampion(championId, rowId); }}
          mastery={mastery}
          championImageSize={championImageSize}
          progressWidth={progressWidth}
        />}
        enableEmptySections
      />
      <Modal
        style={styles.modal}
        position="center"
        ref={(modal) => { this.modal = modal; }}
      >
        {this.getModalContent()}
      </Modal>
    </View>);
  }

  render() {
    const championsMasteries = this.props.championsMasteries;

    if (championsMasteries.get('isFetching')) {
      return (<View style={{ padding: 16, alignItems: 'center' }}>
        <LoadingIndicator />
      </View>);
    } else if (championsMasteries.get('fetchError')) {
      return (<ErrorScreen
        message={championsMasteries.get('errorMessage')}
        onPressRetryButton={this.props.onPressRetryButton}
      />);
    } else if (championsMasteries.get('fetched')) {
      return this.renderContent();
    }

    return null;
  }
}

ChampionsMasteryView.propTypes = {
  championsMasteries: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool.isRequied,
    fetched: PropTypes.bool.isRequied,
    fetchError: PropTypes.bool.isRequied,
    masteries: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
      championId: PropTypes.number.isRequied,
    })),
    errorMessage: PropTypes.string,
  }).isRequired,
  onPressRetryButton: PropTypes.func.isRequired,
};

export default ChampionsMasteryView;
