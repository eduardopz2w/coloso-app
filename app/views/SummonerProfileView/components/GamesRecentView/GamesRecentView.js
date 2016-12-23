import React, { PureComponent, PropTypes } from 'react';
import { ListView } from 'react-native';
import LoadingScreen from '../../../../components/LoadingScreen';
import GameRecent from './GameRecent';
import ErrorScreen from '../../../../components/ErrorScreen';


class GamesRecentView extends PureComponent {
  constructor(props) {
    super(props);

    this.gamesRecentDataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
  }
  render() {
    const { isFetching, games, fetched, fetchError } = this.props.gamesRecent;

    if (isFetching) {
      return (<LoadingScreen />);
    }

    if (fetchError || !fetched) {
      return (<ErrorScreen
        message="Error al cargar el historial"
        onPressRetryButton={this.props.onPressRetryButton}
        retryButton
      />);
    }

    return (<ListView
      dataSource={this.gamesRecentDataSource.cloneWithRows(games)}
      renderRow={game => <GameRecent game={game} />}
    />);
  }
}

GamesRecentView.propTypes = {
  gamesRecent: PropTypes.shape({
    isFetching: PropTypes.bool,
    fetchError: PropTypes.bool,
    fetched: PropTypes.bool,
    games: PropTypes.array,
  }),
  onPressRetryButton: PropTypes.func.isRequired,
};

export default GamesRecentView;
