import React, { PureComponent, PropTypes } from 'react';
import { ListView, View, StyleSheet, RefreshControl } from 'react-native';
import colors from '../../../../utils/colors';
import GameRecent from './GameRecent';
import ErrorScreen from '../../../../components/ErrorScreen';
import { tracker } from '../../../../utils/analytics';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

class GamesRecentView extends PureComponent {
  constructor(props) {
    super(props);

    this.gamesRecentDataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
  }

  componentDidMount() {
    tracker.trackScreenView('GamesRecentView');
  }

  render() {
    const { isFetching, games, fetchError } = this.props.gamesRecent;

    if (fetchError) {
      return (<View style={styles.container}>
        <ErrorScreen
          message={this.props.gamesRecent.errorMessage}
          onPressRetryButton={this.props.onPressRetryButton}
          retryButton
        />
      </View>);
    }

    return (<ListView
      dataSource={this.gamesRecentDataSource.cloneWithRows(games)}
      renderRow={(game, sectionId, rowId) => <GameRecent key={rowId} game={game} />}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          enabled={false}
          colors={[colors.spinnerColor]}
        />
      }
    />);
  }
}

GamesRecentView.propTypes = {
  gamesRecent: PropTypes.shape({
    isFetching: PropTypes.bool,
    fetchError: PropTypes.bool,
    fetched: PropTypes.bool,
    errorMessage: PropTypes.string,
    games: PropTypes.array,
  }),
  onPressRetryButton: PropTypes.func.isRequired,
};

export default GamesRecentView;
