import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Modal from 'react-native-modalbox';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  root: {
    padding: 18,
    height: null,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
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

function getModalStyle(deviceDimensions) {
  if (deviceDimensions.width < 600) {
    return {
      height: null,
      maxHeight: deviceDimensions.height * 0.50,
    };
  } else {
    return {
      width: 350,
      height: null,
      maxHeight: 400,
    };
  }
}

class HistoryModal extends Component {
  constructor(props) {
    super(props);

    this.handleOnPressHistoryEntry = this.handleOnPressHistoryEntry.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  isOpen() {
    return this.state.isOpen;
  }

  handleOnPressHistoryEntry(summonerName, region) {
    this.props.onPressHistoryEntry(summonerName, region);
  }

  render() {
    let content;
    const deviceDimensions = Dimensions.get('window');

    if (this.props.historyEntries.length <= 0) {
      content = <Text>El historial está vacío</Text>;
    } else {
      content = (<ScrollView>
        {this.props.historyEntries.length <= 0 &&
          <Text>El historial está vacío</Text>
        }
        {this.props.historyEntries.map((historyEntry, index) => <TouchableWithoutFeedback
          onPress={() => {
            this.handleOnPressHistoryEntry(historyEntry.summonerName, historyEntry.region);
          }}
          key={index}
        >
          <View style={styles.historyRow}>
            <Text style={styles.region}>{historyEntry.region.toUpperCase()}</Text>
            <Text style={styles.summonerName}>{historyEntry.summonerName}</Text>
          </View>
        </TouchableWithoutFeedback>)}
      </ScrollView>);
    }

    return (<Modal
      ref={(modal) => { this.modal = modal; }}
      style={[styles.root, this.props.style, getModalStyle(deviceDimensions)]}
      onOpened={() => this.setState({ isOpen: true })}
      onClosed={() => this.setState({ isOpen: false })}
      position={deviceDimensions.width < 600 ? 'bottom' : 'center'}
      backdropOpacity={0.7}
    >
      <Text style={styles.title}>Busqueda rapida</Text>
      {content}
    </Modal>);
  }
}

HistoryModal.defaultProps = {
  historyEntries: [],
};

HistoryModal.propTypes = {
  style: PropTypes.shape({}),
  historyEntries: PropTypes.arrayOf(PropTypes.shape({
    summonerName: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
  })),
  onPressHistoryEntry: PropTypes.func.isRequired,
};

export default HistoryModal;
