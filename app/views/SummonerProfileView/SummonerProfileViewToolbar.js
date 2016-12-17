import React, {Component, PropTypes} from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import {MKSpinner} from 'react-native-material-kit'
import IconButton from '../../components/IconButton'

class SummonerProfileViewToolbar extends Component {
  // TODO: Imagenes desde el servidor

  render () {
    let { isFetching, profileIconId, name } = this.props.summonerData
    let handleOnPressBackButton = this.handleOnPressBackButton.bind(this)

    return <Image
      style={styles.backgroundImage}
      source={require('../../assets/world_background.jpg')} >
      <View style={styles.toolbar}>
        <IconButton iconName="arrow-back" onPress={handleOnPressBackButton} />
      </View>

      <View style={styles.profileToolbar}>
        {isFetching ? (
          <MKSpinner />
        ) : (
          <View>
            <Image
              style={styles.summonerImage}
              source={{uri: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${profileIconId}.png`}}
            />

            <Text style={styles.summonerNameText}>{name}</Text>
          </View>
        )}
      </View>
    </Image>
  }

  handleOnPressBackButton () {
    if (this.props.onPressBackButton) {
      this.props.onPressBackButton()
    }
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: null,
    height: null,
    paddingBottom: 16
  },

  summonerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#000',
    marginBottom: 5,
    alignSelf: 'center'
  },

  summonerNameText: {
    fontSize: 20,
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: {
      width: 1.5,
      height: 1.5
    },
    textAlign: 'center'
  },

  profileToolbar: {
    marginTop: -20
  }
})

SummonerProfileViewToolbar.propTypes = {
  summonerData: PropTypes.shape({
    profileIconId: PropTypes.number,
    name: PropTypes.string,
    summonerLevel: PropTypes.number,
    isFetching: PropTypes.bool,
    region: PropTypes.string
  }),
  onPressBackButton: PropTypes.func
}

export default SummonerProfileViewToolbar
