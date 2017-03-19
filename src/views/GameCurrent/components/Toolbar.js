import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import IconButton from '../../../components/IconButton';
import colors from '../../../utils/colors';
import mapName from '../../../utils/mapName';
import queueIdParser from '../../../utils/queueIdParser';

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  dataCol: {
    flex: 1,
    marginLeft: 16,
  },
  mapName: {
    color: 'white',
    fontWeight: 'bold',
  },
  queueName: {
    color: 'white',
    fontSize: 12,
  },
  gameTimeCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameTime: {
    fontSize: 16,
    color: 'white',
    marginLeft: 8,
  },
});

class Toolbar extends PureComponent {
  render() {
    const { mapId, gameQueueConfigId } = this.props;

    return (<View style={styles.root}>
      <IconButton iconName="arrow-back" onPress={this.props.onPressBackButton} />
      <View style={styles.dataCol}>
        <Text style={styles.mapName}>{mapName(mapId)}</Text>
        <Text style={styles.queueName}>{queueIdParser(gameQueueConfigId)}</Text>
      </View>
    </View>);
  }
}

Toolbar.propTypes = {
  mapId: PropTypes.number,
  gameQueueConfigId: PropTypes.number,
  onPressBackButton: PropTypes.func,
};

export default Toolbar;
