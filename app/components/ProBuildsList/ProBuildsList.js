import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, ListView } from 'react-native';
import ProBuildListRow from './ProBuildsListRow';

const styles = StyleSheet.create({
  root: {},
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
    return (<View style={styles.root}>
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.props.builds)}
        renderRow={(build, sectionId, rowId) => <ProBuildListRow
          key={rowId}
          build={build}
          onPress={() => { this.props.onPressBuild(build.id); }}
        />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    </View>);
  }
}

ProBuildsList.propTypes = {
  builds: PropTypes.arrayOf(PropTypes.shape({})),
  onPressBuild: PropTypes.func,
};

export default ProBuildsList;
