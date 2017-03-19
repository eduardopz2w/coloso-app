import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { StyleSheet, Text, Dimensions } from 'react-native';
import Modal from 'react-native-modalbox';
import I18n from 'i18n-js';
import History from './History';

const styles = StyleSheet.create({
  root: {
    height: null,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  containerStyle: {
    padding: 16,
  },
});

function getModalStyle(deviceDimensions) {
  // Tablet
  if (deviceDimensions.width >= 600) {
    return {
      width: 400,
      height: null,
      maxHeight: deviceDimensions.height * 0.50,
    };
  }

  // Mobil
  return {
    height: null,
    maxHeight: deviceDimensions.height * 0.50,
  };
}

class HistoryModal extends Component {
  constructor(props) {
    super(props);

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

  render() {
    const deviceDimensions = Dimensions.get('window');

    return (<Modal
      ref={(modal) => { this.modal = modal; }}
      style={[styles.root, this.props.style, getModalStyle(deviceDimensions)]}
      contentContainerStyle={styles.contentContainerStyle}
      onOpened={() => this.setState({ isOpen: true })}
      onClosed={() => this.setState({ isOpen: false })}
      position={deviceDimensions.width < 600 ? 'bottom' : 'center'}
      backdropOpacity={0.7}
    >
      <Text style={styles.title}>{I18n.t('fast_search')}</Text>
      <History
        historyEntries={this.props.historyEntries}
        onPressHistoryEntry={this.props.onPressHistoryEntry}
        onPressDelete={this.props.onPressDeleteEntry}
      />
    </Modal>);
  }
}

HistoryModal.defaultProps = {
  historyEntries: Immutable.List([]),
};

HistoryModal.propTypes = {
  style: PropTypes.shape({}),
  historyEntries: ImmutablePropTypes.list,
  onPressHistoryEntry: PropTypes.func.isRequired,
  onPressDeleteEntry: PropTypes.func.isRequired,
};

export default HistoryModal;
