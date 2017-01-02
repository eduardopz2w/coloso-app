import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, ListView } from 'react-native';
import ProBuildListRow from './ProBuildsListRow';

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
  }
  render() {
    return (<ListView
      style={styles.root}
      dataSource={this.dataSource.cloneWithRows(this.props.builds)}
      initialListSize={10}
      pageSize={7}
      renderRow={(build, sectionId, rowId) => <ProBuildListRow
        key={rowId}
        build={build}
        onPress={() => { this.props.onPressBuild(build.id); }}
      />}
      renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
    />);
  }
}

ProBuildsList.propTypes = {
  builds: PropTypes.arrayOf(PropTypes.shape({})),
  onPressBuild: PropTypes.func,
};

export default ProBuildsList;
