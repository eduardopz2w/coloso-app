import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { MKSpinner } from 'react-native-material-kit';
import IconButton from '../../components/IconButton';
import regionHumanize from '../../utils/regionHumanize';

const styles = StyleSheet.create({
  backgroundImage: {
    width: null,
    height: null,
    paddingBottom: 16,
  },

  summonerImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#000',
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
    backgroundColor: 'black',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  summonerLevelText: {
    color: 'white',
    textAlign: 'center',
  },

  summonerNameText: {
    fontSize: 16,
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: {
      width: 1.5,
      height: 1.5,
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
  },
});

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

    return (<Image
      style={styles.backgroundImage}
      source={require('../../assets/world_background.jpg')}
    >
      <View style={styles.toolbar}>
        <IconButton iconName="arrow-back" onPress={this.handleOnPressBackButton} />
      </View>

      <View style={styles.profileToolbar}>
        {isFetching ? (
          <MKSpinner />
        ) : (
          <View>
            <View style={styles.summonerImageContainer}>
              <Image
                style={styles.summonerImage}
                source={{ uri: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${profileIconId}.png` }}
              />
              <View style={styles.summonerLevelContainer}>
                <Text style={styles.summonerLevelText}>{summonerLevel}</Text>
              </View>
            </View>

            <Text style={styles.summonerNameText}>{name}</Text>
            <Text style={styles.regionText}>{regionHumanize(region)}</Text>
          </View>
        )}
      </View>
    </Image>);
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
