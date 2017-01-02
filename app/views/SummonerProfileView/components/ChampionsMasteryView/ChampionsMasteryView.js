import React, { Component, PropTypes } from 'react';
import { ListView, Dimensions, Text, View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import Modal from 'react-native-modalbox';
import _ from 'lodash';
import ChampionMastery from './ChampionMastery';
import MasteryInfo from './MasteryInfo';
import LoadingScreen from '../../../../components/LoadingScreen';
import ErrorScreen from '../../../../components/ErrorScreen';
import { tracker } from '../../../../utils/analytics';
import Summary from './Summary';

const styles = MediaQueryStyleSheet.create(
  {
    roowScrollView: {
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
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
  }

  componentDidMount() {
    tracker.trackScreenView('ChampionsMasteryView');
  }
  getModalContent() {
    if (this.state.championSelected === 0) {
      return null;
    }

    const masteries = this.props.championsMastery.masteries;

    const mastery = _.find(masteries, { championId: this.state.championSelected });
    return <MasteryInfo mastery={mastery} />;
  }

  handleOnPressChampion(championId) {
    this.setState({ championSelected: championId }, () => {
      this.modal.open();
    });
  }


  render() {
    const { isFetching, masteries, fetched } = this.props.championsMastery;
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

    if (fetched) {
      if (masteries.length === 0) {
        return (<View style={{ flex: 1 }}>
          <Summary masteries={masteries} />
          <View style={styles.container}>
            <Text style={styles.messageText}>
              Este invocador no tiene puntos de maestria con ningún campeón.
            </Text>
          </View>
        </View>);
      }

      return (<View>
        <Summary masteries={masteries} />
        <ListView
          style={styles.rootScrollView}
          pageSize={pageSize}
          contentContainerStyle={styles.listViewContainer}
          dataSource={this.championsMasteryDataSource.cloneWithRows(masteries)}
          renderRow={(mastery, sectionId, rowId) => <ChampionMastery
            key={rowId}
            onPress={this.handleOnPressChampion}
            mastery={mastery}
            championImageSize={championImageSize}
            progressWidth={progressWidth}
          />}
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
    } else if (isFetching) {
      return <LoadingScreen />;
    }

    return (<ErrorScreen
      message={this.props.championsMastery.errorMessage}
      onPressRetryButton={this.props.onPressRetryButton}
      retryButton
    />);
  }
}

ChampionsMasteryView.propTypes = {
  championsMastery: PropTypes.shape({
    isFetching: PropTypes.bool.isRequied,
    fetched: PropTypes.bool.isRequied,
    fetchError: PropTypes.bool.isRequied,
    masteries: PropTypes.arrayOf(PropTypes.shape({
      championId: PropTypes.number.isRequied,
    })),
    errorMessage: PropTypes.string,
  }).isRequired,
  onPressRetryButton: PropTypes.func.isRequired,
};

export default ChampionsMasteryView;
