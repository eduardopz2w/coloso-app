import React, { PureComponent, PropTypes } from 'react';
import { ListView, View, StyleSheet, RefreshControl } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
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
      rowHasChanged: (r1, r2) => !Immutable.is(r1, r2),
    });
  }

  componentDidMount() {
    tracker.trackScreenView('GamesRecentView');
  }

  render() {
    const { gamesRecent } = this.props;

    if (gamesRecent.get('fetchError')) {
      return (<View style={styles.container}>
        <ErrorScreen
          message={gamesRecent.get('errorMessage')}
          onPressRetryButton={this.props.onPressRetryButton}
          retryButton
        />
      </View>);
    }

    return (<ListView
      dataSource={this.gamesRecentDataSource.cloneWithRows(gamesRecent.get('games').toArray())}
      renderRow={(game, sectionId, rowId) => <GameRecent key={rowId} game={game} />}
      refreshControl={
        <RefreshControl
          refreshing={gamesRecent.get('isFetching')}
          enabled={false}
          colors={[colors.spinnerColor]}
        />
      }
      enableEmptySections
    />);
  }
}

GamesRecentView.propTypes = {
  gamesRecent: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool,
    fetchError: PropTypes.bool,
    fetched: PropTypes.bool,
    errorMessage: PropTypes.string,
    games: ImmutablePropTypes.list,
  }),
  onPressRetryButton: PropTypes.func.isRequired,
};

export default GamesRecentView;
