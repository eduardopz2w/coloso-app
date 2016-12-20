import React, { PureComponent, PropTypes } from 'react';
import { ListView } from 'react-native';
import LoadingScreen from '../../../../components/LoadingScreen';
import GameRecent from './GameRecent';

class GamesRecentView extends PureComponent {
  constructor(props) {
    super(props);

    this.gamesRecentDataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
  }
  render() {
    const { isFetching, games } = this.props.gamesRecent;

    if (isFetching) {
      return (<LoadingScreen />);
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
    games: PropTypes.array,
  }),
};

export default GamesRecentView;
