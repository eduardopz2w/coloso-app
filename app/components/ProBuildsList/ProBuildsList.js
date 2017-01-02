import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, ListView } from 'react-native';
import { MKSpinner } from 'react-native-material-kit';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import ProBuildListRow from './ProBuildsListRow';
import colors from '../../utils/colors';

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
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.handleOnLoadMore = this.handleOnLoadMore.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  handleOnLoadMore() {
    if (this.props.onLoadMore) {
      this.props.onLoadMore();
    }
  }

  renderFooter() {
    if (this.props.isFetching) {
      return (<View style={{ alignItems: 'center', paddingVertical: 8 }}>
        <MKSpinner strokeColor={colors.spinnerColor} />
      </View>);
    }

    return null;
  }

  render() {
    return (<ListView
      style={styles.root}
      dataSource={this.dataSource.cloneWithRows(this.props.builds)}
      initialListSize={25}
      pageSize={25}
      renderScrollComponent={props => <InfiniteScrollView {...props} />}
      renderRow={(build, sectionId, rowId) => <ProBuildListRow
        key={rowId}
        build={build}
        onPress={() => { this.props.onPressBuild(build.id); }}
      />}
      renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      renderFooter={this.renderFooter}
      onLoadMoreAsync={this.handleOnLoadMore}
      canLoadMore
    />);
  }
}

ProBuildsList.propTypes = {
  builds: PropTypes.arrayOf(PropTypes.shape({})),
  isFetching: PropTypes.bool,
  onPressBuild: PropTypes.func,
  onLoadMore: PropTypes.func,
};

export default ProBuildsList;
