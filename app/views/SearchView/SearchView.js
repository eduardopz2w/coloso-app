import React, {Component} from 'react'
import {StyleSheet, View, Image, Picker, Text, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {MKTextField, MKButton, MKColor, MKSpinner} from 'react-native-material-kit'
import SearchViewToolbar from './SearchViewToolbar'
import SearchViewActions from '../../redux/actions/SearchViewActions'

class SearchView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      summonerName: 'armaghyons',
      region: 'lan'
    }
  }

  render () {
    let handlePressSearchButton = this._handlePressSearchButton.bind(this)
    let handleTextChangeSummonerName = this._handleTextChangeSummonerName.bind(this)
    let handleChangeRegion = this._handleChangeRegion.bind(this)

    let {summonerName, region} = this.state
    let {isSearching} = this.props

    return <View style={styles.root}>
      <SearchViewToolbar />
      <ScrollView style={styles.mainScrollView} contentContainerStyle={styles.container}>
        <Image
          style={styles.homeImage}
          source={require('../../assets/poro_wallpaper.jpg')}
        />

        <View style={styles.inputsRow}>
          <MKTextField
            style={styles.inputName}
            value={summonerName}
            onTextChange={handleTextChangeSummonerName}
            placeholder="Nombre de invocador"
          />

          <Picker
            style={styles.inputRegion}
            onValueChange={handleChangeRegion}
            selectedValue={region}>
            <Picker.Item label="LAN" value="lan" />
            <Picker.Item label="LAS" value="las" />
            <Picker.Item label="NA" value="na" />
          </Picker>
        </View>

        {isSearching ? (
          <View style={styles.spinnerContainer}>
            <MKSpinner />
          </View>
        ) : (
          <MKButton
            style={styles.searchButton}
            onPress={handlePressSearchButton}>
            <Text style={styles.searchButtonText}>BUSCAR INVOCADOR</Text>
          </MKButton>
        )}
      </ScrollView>
    </View>
  }

  _handlePressSearchButton (event) {
    this.props.searchSummonerProfile(this.state.summonerName, this.state.region)
  }

  _handleTextChangeSummonerName (newSummonerName) {
    this.setState({summonerName: newSummonerName})
  }

  _handleChangeRegion (newRegion) {
    this.setState({region: newRegion})
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },

  mainScrollView: {
    margin: 16
  },

  container: {
    flex: 1,
    minHeight: 350,
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
  },

  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

let mapStateToProps = (state, props) => {
  let searchViewState = state.searchView

  return {
    isSearching: searchViewState.get('isSearching')
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    searchSummonerProfile: (summonerName, region) => {
      dispatch(SearchViewActions.searchSummonerProfile(summonerName, region))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchView)
