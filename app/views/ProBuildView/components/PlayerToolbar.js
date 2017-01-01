import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import IconButton from '../../../components/IconButton';
import colors from '../../../utils/colors';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      backgroundColor: colors.primary,
    },
    toolbar: {
      height: 56,
    },

    profileToolbar: {
      marginTop: -56,
      paddingTop: 18,
      alignItems: 'center',
    },

    playerImage: {
      width: 80,
      height: 80,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: 'white',
      marginBottom: 4,
    },

    playerName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
  },
);

class SummonerProfileViewToolbar extends Component {
  // TODO: Imagenes desde el servidor
  constructor(props) {
    super(props);

    this.handleOnPressBackButton = this.handleOnPressBackButton.bind(this);
  }

  handleOnPressBackButton() {
    if (this.props.onPressBackButton) {
      return this.props.onPressBackButton();
    }

    return null;
  }

  render() {
    const { playerName, playerImageUrl } = this.props;

    return (<View style={styles.root}>
      <View style={styles.toolbar}>
        <IconButton iconName="arrow-back" onPress={this.handleOnPressBackButton} />
      </View>

      <View style={styles.profileToolbar}>
        <View style={styles.profileToolbarContainer}>
          <Image
            style={styles.playerImage}
            source={{ uri: playerImageUrl }}
          />

          <Text style={styles.playerName}>{playerName}</Text>
        </View>
      </View>
    </View>);
  }

}

SummonerProfileViewToolbar.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerImageUrl: PropTypes.string.isRequired,
  onPressBackButton: PropTypes.func,
};

export default SummonerProfileViewToolbar;
