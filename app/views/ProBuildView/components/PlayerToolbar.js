import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import IconButton from '../../../components/IconButton';
import ProPlayerImage from '../../../components/ProPlayerImage';
import colors from '../../../utils/colors';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      backgroundColor: colors.primary,
    },
    toolbar: {
      height: 56,
      flexDirection: 'row',
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

    profileToolbarContainer: {
      flexDirection: 'row',
    },

    dataContainer: {
      justifyContent: 'center',
    },

    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },

    realName: {
      fontSize: 14,
      color: 'white',
    },
  },
);

class SummonerProfileViewToolbar extends Component {
  // TODO: Imagenes desde el servidor
  constructor(props) {
    super(props);

    this.handleOnPressBackButton = this.handleOnPressBackButton.bind(this);
    this.handleOnPressProfileButton = this.handleOnPressProfileButton.bind(this);
  }

  handleOnPressBackButton() {
    if (this.props.onPressBackButton) {
      this.props.onPressBackButton();
    }
  }

  handleOnPressProfileButton() {
    if (this.props.onPressProfileButton) {
      this.props.onPressProfileButton();
    }
  }

  render() {
    return (<View style={styles.root}>
      <View style={styles.toolbar}>
        <IconButton iconName="arrow-back" onPress={this.handleOnPressBackButton} />
        <View style={{ flex: 1 }} />
        <IconButton iconName="account-circle" onPress={this.handleOnPressProfileButton} />
      </View>

      <View style={styles.profileToolbar}>
        <View style={styles.profileToolbarContainer}>
          <ProPlayerImage
            imageUrl={this.props.imageUrl}
            role={this.props.role}
            size={65}
          />
          <View style={styles.dataContainer}>
            <Text style={styles.name}>{this.props.name}</Text>
            <Text numberOfLines={1} style={styles.realName}>{this.props.realName}</Text>
          </View>
        </View>
      </View>
    </View>);
  }

}

SummonerProfileViewToolbar.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  realName: PropTypes.string,
  role: PropTypes.string,
  onPressBackButton: PropTypes.func,
  onPressProfileButton: PropTypes.func,
};

export default SummonerProfileViewToolbar;
