import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';
import BackgroundTimer from 'react-native-background-timer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconButton from '../../components/IconButton';
import colors from '../../utils/colors';
import mapName from '../../utils/mapName';
import queueIdParser from '../../utils/queueIdParser';

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

function getParsedTime(gameLength) {
  return moment(moment.duration({ seconds: gameLength }).asMilliseconds()).format('mm:ss');
}

class Toolbar extends Component {
  componentWillMount() {
    const gameLength = this.props.gameLength;

    if (gameLength >= 0) {
      this.setState({
        gameLength: gameLength + 180,
      });
    } else {
      this.setState({
        gameLength: 0,
      });
    }
  }

  componentDidMount() {
    this.timer = BackgroundTimer.setInterval(() => {
      this.setState({
        gameLength: this.state.gameLength + 1,
      });
    }, 1000);
  }

  componentWillUnmount() {
    BackgroundTimer.clearInterval(this.timer);
  }

  render() {
    const { mapId, gameQueueConfigId } = this.props;

    return (<View style={styles.root}>
      <IconButton iconName="arrow-back" onPress={this.props.onPressBackButton} />
      <View style={styles.dataCol}>
        <Text style={styles.mapName}>{mapName(mapId)}</Text>
        <Text style={styles.queueName}>{queueIdParser(gameQueueConfigId)}</Text>
      </View>
      <View style={styles.gameTimeCol}>
        <Icon name="access-time" size={18} color="#FFF" />
        <Text style={styles.gameTime}>{getParsedTime(this.state.gameLength)}</Text>
      </View>
    </View>);
  }
}

Toolbar.propTypes = {
  mapId: PropTypes.number,
  gameQueueConfigId: PropTypes.number,
  gameLength: PropTypes.number,
  onPressBackButton: PropTypes.func,
};

export default Toolbar;
