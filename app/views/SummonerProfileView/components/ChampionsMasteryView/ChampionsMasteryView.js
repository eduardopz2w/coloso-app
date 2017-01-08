import React, { Component, PropTypes } from 'react';
import { ListView, Dimensions, Text, View, RefreshControl } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import Modal from 'react-native-modalbox';
import ChampionMastery from './ChampionMastery';
import MasteryInfo from './MasteryInfo';
import colors from '../../../../utils/colors';
import ErrorScreen from '../../../../components/ErrorScreen';
import { tracker } from '../../../../utils/analytics';
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
      modalIsOpen: false,
      championSelected: 0,
    };

    this.handleOnPressChampion = this.handleOnPressChampion.bind(this);
    this.getModalContent = this.getModalContent.bind(this);
    this.championsMasteryDataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !Immutable.is(r1, r2),
    });
  }

  componentDidMount() {
    tracker.trackScreenView('ChampionsMasteryView');
  }

  getModalContent() {
    if (this.state.championSelected === 0) {
      return null;
    }

    const masteries = this.props.championsMastery.get('masteries');
    const masteryFound = masteries.find(mastery => mastery.get('championId') === this.state.championSelected);

    return <MasteryInfo mastery={masteryFound} />;
  }

  handleOnPressChampion(championId) {
    this.setState({ championSelected: championId }, () => {
      this.modal.open();
    });
  }


  render() {
    const championsMastery = this.props.championsMastery;
    let championImageSize;
    let progressWidth;
    let pageSize;

    if (Dimensions.get('window').width <= 500) {
      championImageSize = 70;
      progressWidth = 5;
      pageSize = 9;
    } else {
      championImageSize = 100;
      progressWidth = 7;
      pageSize = 16;
    }

    if (championsMastery.get('fetchError')) {
      return (<View style={styles.container}>
        <ErrorScreen
          message={this.props.championsMastery.errorMessage}
          onPressRetryButton={this.props.onPressRetryButton}
          retryButton
        />
      </View>);
    } else if (championsMastery.get('masteries').size === 0 && championsMastery.get('fetched')) {
      return (<View style={{ flex: 1 }}>
        <Summary masteries={championsMastery.get('masteries')} />
        <View style={styles.container}>
          <Text style={styles.messageText}>
            Este invocador no tiene puntos de maestria con ningún campeón.
          </Text>
        </View>
      </View>);
    }

    return (<View style={{ flex: 1 }}>
      <Summary masteries={championsMastery.get('masteries')} />
      <ListView
        style={styles.rootListView}
        pageSize={pageSize}
        contentContainerStyle={styles.listViewContainer}
        dataSource={this.championsMasteryDataSource.cloneWithRows(championsMastery.get('masteries').toArray())}
        renderRow={(mastery, sectionId, rowId) => <ChampionMastery
          key={rowId}
          onPress={this.handleOnPressChampion}
          mastery={mastery}
          championImageSize={championImageSize}
          progressWidth={progressWidth}
        />}
        refreshControl={
          <RefreshControl
            refreshing={championsMastery.get('isFetching')}
            enabled={false}
            colors={[colors.spinnerColor]}
          />
        }
        enableEmptySections
      />
      <Modal
        style={styles.modal}
        position="center"
        ref={(modal) => { this.modal = modal; }}
        onOpened={() => this.setState({ modalIsOpen: true })}
        onClosed={() => this.setState({ modalIsOpen: false })}
      >
        {this.getModalContent()}
      </Modal>
    </View>);
  }
}

ChampionsMasteryView.propTypes = {
  championsMastery: ImmutablePropTypes.mapContains({
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
