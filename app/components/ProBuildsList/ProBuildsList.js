import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, ListView, RefreshControl } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import ProBuildListRow from './ProBuildsListRow';
import colors from '../../utils/colors';
import LoadingIndicator from '../../components/LoadingIndicator';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

class ProBuildsList extends Component {
  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !Immutable.is(r1, r2),
    });
    this.handleOnLoadMore = this.handleOnLoadMore.bind(this);
    this.handleOnRefresh = this.handleOnRefresh.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  handleOnLoadMore() {
    if (this.props.onLoadMore) {
      this.props.onLoadMore();
    }
  }

  handleOnRefresh() {
    if (this.props.onRefresh) {
      this.props.onRefresh();
    }
  }

  renderFooter() {
    if (this.props.isFetching && !this.props.isRefreshing && this.props.builds.size > 0) {
      return (<View style={{ alignItems: 'center', paddingVertical: 8 }}>
        <LoadingIndicator />
      </View>);
    }

    return null;
  }

  render() {
    return (<ListView
      style={styles.root}
      dataSource={this.dataSource.cloneWithRows(this.props.builds.toArray())}
      initialListSize={25}
      pageSize={25}
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
  builds: ImmutablePropTypes.list,
  isFetching: PropTypes.bool,
  isRefreshing: PropTypes.bool,
  onPressBuild: PropTypes.func,
  onLoadMore: PropTypes.func,
  onRefresh: PropTypes.func,
  refreshControl: PropTypes.bool,
};

ProBuildsList.defaultProps = {
  refreshControl: false,
  isRefreshing: false,
};

export default ProBuildsList;
