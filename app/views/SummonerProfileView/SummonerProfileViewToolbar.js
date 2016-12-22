import React, { Component, PropTypes } from 'react';
import { View, Image, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import IconButton from '../../components/IconButton';
import LoadingScreen from '../../components/LoadingScreen';
import regionHumanize from '../../utils/regionHumanize';
import colors from '../../utils/colors';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      backgroundColor: colors.primary,
    },

    summonerImage: {
      width: 80,
      height: 80,
      borderRadius: 50,
      borderWidth: 4,
      borderColor: colors.accent,
      marginBottom: 5,
    },

    summonerImageContainer: {
      width: 80,
      height: 80,
      position: 'relative',
      alignSelf: 'center',
    },

    summonerLevelContainer: {
      position: 'absolute',
      width: 25,
      height: 25,
      backgroundColor: colors.accent,
      bottom: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },

    summonerLevelText: {
      color: 'black',
      textAlign: 'center',
    },

    summonerNameText: {
      fontSize: 16,
      color: '#FFF',
      textShadowColor: '#000',
      textShadowOffset: {
        width: 2,
        height: 2,
      },
      textAlign: 'center',
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

    profileToolbar: {
      marginTop: -30,
      height: 125,
    },
  },
  {
    '@media (min-device-width: 600)': {
      profileToolbar: {
        marginTop: 0,
      },

      profileToolbarContainer: {
        flexDirection: 'row',
        marginLeft: 70,
        marginRight: 40,
      },

      summonerImageContainer: {
        width: 100,
        height: 100,
      },

      summonerImage: {
        width: 100,
        height: 100,
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
                source={{ uri: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${profileIconId}.png` }}
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
