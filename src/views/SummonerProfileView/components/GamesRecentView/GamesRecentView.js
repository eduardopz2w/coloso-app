import React, { PureComponent, PropTypes } from 'react';
import { ListView, View } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';

import { ErrorScreen, LoadingIndicator } from '../../../../components';
import { tracker } from '../../../../utils';
import GameRecent from './GameRecent';

class GamesRecentView extends PureComponent {
  constructor(props) {
    super(props);

    this.gamesRecentDataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !Immutable.is(r1, r2),
    });
    this.getGamesList = this.getGamesList.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    tracker.trackScreenView('GamesRecentView');
  }

  shouldComponentUpdate(nextProps) {
    return !Immutable.is(nextProps.gamesRecent, this.props.gamesRecent);
  }

  getGamesList() {
    const gamesList = this.props.gamesRecent.getIn(['data', 'games']);

    if (gamesList) {
      return gamesList;
    }

    return Immutable.List();
  }

  renderContent() {
    return (<ListView
      dataSource={this.gamesRecentDataSource.cloneWithRows(this.getGamesList().toArray())}
      renderRow={(game, sectionId, rowId) => <GameRecent key={rowId} game={game} />}
      enableEmptySections
    />);
  }

  render() {
    const gamesRecent = this.props.gamesRecent;

    if (gamesRecent.get('isFetching')) {
      return (<View style={{ padding: 16, alignItems: 'center' }}>
        <LoadingIndicator />
      </View>);
    } else if (gamesRecent.get('fetchError')) {
      return (<ErrorScreen
        message={gamesRecent.get('errorMessage')}
        onPressRetryButton={this.props.onPressRetryButton}
      />);
    } else if (gamesRecent.get('fetched')) {
      return this.renderContent();
    }

    return null;
  }
}

GamesRecentView.propTypes = {
  gamesRecent: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool,
    fetchError: PropTypes.bool,
    fetched: PropTypes.bool,
    errorMessage: PropTypes.string,
    data: ImmutablePropTypes.map,
  }),
  onPressRetryButton: PropTypes.func.isRequired,
};

export default GamesRecentView;
