import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, ListView } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  ListView: {
    flex: -1,
  },
  historyRow: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  region: {
    width: 60,
    height: 30,
    backgroundColor: colors.primary,
    marginRight: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    borderRadius: 5,
  },
  summonerName: {
    fontSize: 16,
  },
});


class History extends Component {
  constructor(props) {
    super(props);

    this.handleOnPressHistoryEntry = this.handleOnPressHistoryEntry.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
  }

  handleOnPressHistoryEntry(summonerName, region) {
    this.props.onPressHistoryEntry(summonerName, region);
  }

  renderRow(historyEntry) {
    return (<MKButton
      rippleColor="rgba(0,0,0,0.1)"
      style={styles.historyRow}
      onPress={() => {
        this.handleOnPressHistoryEntry(historyEntry.summonerName, historyEntry.region);
      }}
    >
      <View style={styles.historyRow}>
        <Text style={styles.region}>{historyEntry.region.toUpperCase()}</Text>
        <Text style={styles.summonerName}>{historyEntry.summonerName}</Text>
      </View>
    </MKButton>);
  }

  render() {
    if (this.props.historyEntries.length <= 0) {
      return <Text>El historial está vacío</Text>;
    }

    return (<ListView
      style={[styles.listView, this.props.style]}
      dataSource={this.dataSource.cloneWithRows(this.props.historyEntries)}
      renderRow={this.renderRow}
      automaticallyAdjustContentInsets={false}
    />);
  }
}

History.defaultProps = {
  historyEntries: [],
};

History.propTypes = {
  historyEntries: PropTypes.arrayOf(PropTypes.shape({
    summonerName: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
  })),
  style: View.propTypes.style,
  onPressHistoryEntry: PropTypes.func.isRequired,
};

export default History;
