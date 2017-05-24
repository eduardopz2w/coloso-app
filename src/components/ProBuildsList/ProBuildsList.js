import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, ListView, RefreshControl, Text, TouchableNativeFeedback } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import I18n from 'i18n-js';

import { colors } from 'utils';
import ProBuildListRow from './ProBuildsListRow';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorScreen from '../../components/ErrorScreen';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  retryButton: {
    minWidth: 64,
    height: 36,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  retryText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

class ProBuildsList extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !Immutable.is(r1, r2),
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(props.builds.toArray()),
    };

    this.handleOnLoadMore = this.handleOnLoadMore.bind(this);
    this.handleOnRefresh = this.handleOnRefresh.bind(this);
    this.handleOnAddFavorite = this.handleOnAddFavorite.bind(this);
    this.handleOnRemoveFavorite = this.handleOnRemoveFavorite.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.builds.size === 0 && this.listView) {
      this.listView.scrollTo({ x: 0, y: 0, animated: false });
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.builds.toArray()),
    });
  }

  handleOnLoadMore() {
    if (this.props.onLoadMore && !this.props.fetchError) {
      this.props.onLoadMore();
    }
  }

  handleOnRefresh() {
    if (this.props.onRefresh) {
      this.props.onRefresh();
    }
  }

  handleOnAddFavorite(buildId) {
    if (this.props.onAddFavorite) {
      this.props.onAddFavorite(buildId);
    }
  }

  handleOnRemoveFavorite(buildId) {
    if (this.props.onRemoveFavorite) {
      this.props.onRemoveFavorite(buildId);
    }
  }

  renderFooter() {
    if (this.props.fetchError) {
      return (<View style={{ alignItems: 'center', paddingVertical: 8, paddingHorizontal: 16 }}>
        <Text>{this.props.errorMessage}</Text>
        <TouchableNativeFeedback
          onPress={this.props.onPressRetry}
          style={styles.retryButton}
        >
          <View style={styles.retryButton}>
            <Text style={styles.retryText}>REINTENTAR</Text>
          </View>
        </TouchableNativeFeedback>
      </View>);
    }
    if (this.props.isFetching && !this.props.isRefreshing && this.props.builds.size > 0) {
      return (<View style={{ alignItems: 'center', paddingVertical: 8 }}>
        <LoadingIndicator />
      </View>);
    }

    return null;
  }

  render() {
    if (this.props.fetchError && this.props.builds.size === 0) {
      return (<ErrorScreen
        message={this.props.errorMessage}
        onPressRetryButton={this.props.onPressRetry}
      />);
    } else if (!this.props.isFetching && this.props.builds.size === 0) {
      return (<ErrorScreen
        message={this.props.emptyListMessage}
        retryButton={false}
      />);
    }

    return (<ListView
      style={styles.root}
      dataSource={this.state.dataSource}
      initialListSize={25}
      pageSize={25}
      ref={(listView) => { this.listView = listView; }}
      refreshControl={
        <RefreshControl
          refreshing={(this.props.isFetching && this.props.builds.size === 0) ||
            this.props.isRefreshing
          }
          enabled={this.props.refreshControl}
          onRefresh={this.handleOnRefresh}
          colors={[colors.primary]}
        />
      }
      renderScrollComponent={props => <InfiniteScrollView {...props} />}
      renderRow={(build, sectionId, rowId) => <ProBuildListRow
        key={rowId}
        build={build}
        onPress={() => { this.props.onPressBuild(build.get('id')); }}
        onAddFavorite={this.handleOnAddFavorite}
        onRemoveFavorite={this.handleOnRemoveFavorite}
      />}
      renderFooter={this.renderFooter}
      renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      onLoadMoreAsync={this.handleOnLoadMore}
      canLoadMore
      enableEmptySections
    />);
  }
}

ProBuildsList.propTypes = {
  builds: ImmutablePropTypes.list.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  refreshControl: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool,
  errorMessage: PropTypes.string,
  emptyListMessage: PropTypes.string.isRequired,
  onPressRetry: PropTypes.func.isRequired,
  onPressBuild: PropTypes.func,
  onLoadMore: PropTypes.func,
  onRefresh: PropTypes.func,
  onAddFavorite: PropTypes.func,
  onRemoveFavorite: PropTypes.func,
};

ProBuildsList.defaultProps = {
  builds: Immutable.List([]),
  refreshControl: false,
  isRefreshing: false,
  emptyListMessage: I18n.t('no_results_found'),
};

export default ProBuildsList;
