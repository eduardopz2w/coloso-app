import React, { PureComponent, PropTypes } from 'react';
import { ListView } from 'react-native';
import LoadingScreen from '../../../../components/LoadingScreen';
import GameRecent from './GameRecent';
import ErrorScreen from '../../../../components/ErrorScreen';
import { tracker } from '../../../../utils/analytics';

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
    const { isFetching, games, fetched } = this.props.gamesRecent;

    if (fetched) {
      return (<ListView
        dataSource={this.gamesRecentDataSource.cloneWithRows(games)}
        renderRow={(game, sectionId, rowId) => <GameRecent key={rowId} game={game} />}
      />);
    } else if (isFetching) {
      return (<LoadingScreen />);
    }

    return (<ErrorScreen
      message={this.props.gamesRecent.errorMessage}
      onPressRetryButton={this.props.onPressRetryButton}
      retryButton
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
