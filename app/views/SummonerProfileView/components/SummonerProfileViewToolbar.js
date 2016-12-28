import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import IconButton from '../../../components/IconButton';
import LoadingScreen from '../../../components/LoadingScreen';
import regionHumanize from '../../../utils/regionHumanize';
import colors from '../../../utils/colors';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      backgroundColor: colors.primary,
    },

    profileToolbar: {
      marginTop: -56,
      paddingTop: 18,
      paddingBottom: 8,
      minHeight: 100,
    },

    profileToolbarContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },

    backgroundImage: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },

    summonerImageContainer: {
      width: 70,
      height: 70,
      position: 'relative',
      alignSelf: 'center',
      justifyContent: 'center',
      borderColor: colors.accent,
      borderRadius: 50,
      borderWidth: 4,
      alignItems: 'center',
    },

    summonerImage: {
      width: 64,
      height: 64,
      borderRadius: 50,
    },

    summonerLevelContainer: {
      position: 'absolute',
      width: 20,
      height: 20,
      backgroundColor: colors.accent,
      bottom: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },

    summonerDataContainer: {
      marginLeft: 18,
      justifyContent: 'center',
    },

    summonerLevelText: {
      color: 'black',
      textAlign: 'center',
      fontSize: 12,
    },

    summonerNameText: {
      fontSize: 16,
      color: '#FFF',
      textShadowColor: '#000',
      textShadowOffset: {
        width: 2,
        height: 2,
      },
    },

    regionText: {
      color: '#FFF',
      textAlign: 'center',
      textShadowColor: '#000',
      textShadowOffset: {
        width: 1.5,
        height: 1.5,
      },
    },

  },
  {
    '@media (min-device-width: 600)': {
      profileToolbar: {
        marginTop: 0,
        minHeight: 130,
      },

      profileToolbarContainer: {
        marginLeft: 70,
        marginRight: 40,
      },

      summonerImageContainer: {
        width: 100,
        height: 100,
      },

      summonerImage: {
        width: 90,
        height: 90,
      },

      summonerLevelContainer: {
        width: 30,
        height: 30,
      },

      summonerDataContainer: {
        flex: 1,
        marginLeft: 40,
        justifyContent: 'center',
      },
      summonerNameText: {
        fontSize: 30,
        textAlign: 'left',
      },
      regionText: {
        fontSize: 21,
        textAlign: 'left',
      },
    },
  },
);

function getImageUri(profileIconId) {
  return `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${profileIconId}.png`;
}

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
    const { isFetching, profileIconId, name, summonerLevel, region } = this.props.summonerData;

    return (<View style={styles.root}>
      <View style={styles.toolbar}>
        <IconButton iconName="arrow-back" onPress={this.handleOnPressBackButton} />
      </View>

      <View style={styles.profileToolbar}>
        {isFetching ? (
          <LoadingScreen />
        ) : (
          <View style={styles.profileToolbarContainer}>
            <View style={styles.summonerImageContainer}>
              <Image
                style={styles.summonerImage}
                source={{ uri: getImageUri(profileIconId) }}
              />
              <View style={styles.summonerLevelContainer}>
                <Text style={styles.summonerLevelText}>{summonerLevel}</Text>
              </View>
            </View>

            <View style={styles.summonerDataContainer}>
              <Text style={styles.summonerNameText}>{name}</Text>
              <Text style={styles.regionText}>{regionHumanize(region)}</Text>
            </View>
          </View>
        )}
      </View>
    </View>);
  }

}

SummonerProfileViewToolbar.propTypes = {
  summonerData: PropTypes.shape({
    profileIconId: PropTypes.number,
    name: PropTypes.string,
    summonerLevel: PropTypes.number,
    isFetching: PropTypes.bool,
    region: PropTypes.string,
  }),
  onPressBackButton: PropTypes.func,
};

export default SummonerProfileViewToolbar;
