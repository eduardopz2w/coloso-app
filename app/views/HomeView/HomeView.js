import React, {Component} from 'react'
import {StyleSheet, View, Image, Picker, Text} from 'react-native'
import {MKTextField, MKButton, MKColor} from 'react-native-material-kit'
import HomeViewToolbar from './HomeViewToolbar'

class HomeView extends Component {
  render () {
    return <View style={styles.root}>
      <HomeViewToolbar />
      <View style={styles.container}>
        <Image
          style={styles.homeImage}
          source={require('../../assets/poro_wallpaper.jpg')}
        />

        <View style={styles.inputsRow}>
          <MKTextField
            style={styles.inputName}
            placeholder="Nombre de invocador"
          />

          <Picker
            style={styles.inputRegion}
            selectedValue="Java">
            <Picker.Item label="LAN" value="lan" />
            <Picker.Item label="LAS" value="las" />
            <Picker.Item label="NA" value="na" />
          </Picker>
        </View>

        <MKButton
          style={styles.searchButton}>
          <Text style={styles.searchButtonText}>BUSCAR INVOCADOR</Text>
        </MKButton>
      </View>

    </View>
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },

  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },

  homeImage: {
    width: null,
    height: 180,
    borderRadius: 16
  },

  inputsRow: {
    flexDirection: 'row'
  },

  inputName: {
    flex: 1,
    height: 47
  },

  inputRegion: {
    width: 80,
    height: 50
  },

  searchButton: {
    backgroundColor: MKColor.Indigo,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },

  searchButtonText: {
    color: '#FFFFFF'
  }
})

export default HomeView
