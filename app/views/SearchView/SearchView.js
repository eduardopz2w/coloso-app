import React, {Component} from 'react'
import {StyleSheet, View, Image, Picker, Text, Keyboard} from 'react-native'
import {connect} from 'react-redux'
import {MKTextField, MKButton, MKColor, MKSpinner} from 'react-native-material-kit'
import {Actions} from 'react-native-router-flux'
import SearchViewToolbar from './SearchViewToolbar'
import SearchViewActions from '../../redux/actions/SearchViewActions'
import Snackbar from 'react-native-android-snackbar'

class SearchView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      summonerName: 'armaghyon',
      region: 'lan',
      keyboardOpen: false
    }
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide.bind(this))
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.searchError) {
      Snackbar.show(nextProps.errorMessage, {duration: Snackbar.UNTIL_CLICK})
      this.props.clearSearchError()
    }

    if (nextProps.summonerFound !== null) {
      Actions.summoner_profile_view({summonerId: nextProps.summonerFound})
      this.props.clearSummonerFound()
    }
  }

  render () {
    let handlePressSearchButton = this._handlePressSearchButton.bind(this)
    let handleTextChangeSummonerName = this._handleTextChangeSummonerName.bind(this)
    let handleChangeRegion = this._handleChangeRegion.bind(this)
    let renderImage = this._renderImage.bind(this)

    let {summonerName, region} = this.state
    let {isSearching} = this.props

    return <View style={styles.root}>
      <SearchViewToolbar />
      <View style={styles.container}>
        {renderImage()}

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

      </View>
    </View>
  }

  _handlePressSearchButton (event) {
    Snackbar.dismiss()
    this.props.searchSummonerProfile(this.state.summonerName, this.state.region)
  }

  _handleTextChangeSummonerName (newSummonerName) {
    this.setState({summonerName: newSummonerName})
  }

  _handleChangeRegion (newRegion) {
    this.setState({region: newRegion})
  }

  handleKeyboardDidShow (e) {
    this.setState({ keyboardOpen: true })
  }

  handleKeyboardDidHide (e) {
    this.setState({ keyboardOpen: false })
  }

  _renderImage () {
    if (!this.state.keyboardOpen) {
      return <Image
        style={styles.homeImage}
        source={require('../../assets/poro_wallpaper.jpg')}
      />
    } else {
      return null
    }
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },

  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-around'
  },

  homeImage: {
    width: null,
    height: 200,
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
    isSearching: searchViewState.get('isSearching'),
    searchError: searchViewState.get('searchError'),
    errorMessage: searchViewState.get('errorMessage'),
    summonerFound: searchViewState.get('summonerFound')
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    searchSummonerProfile: (summonerName, region) => {
      dispatch(SearchViewActions.searchSummonerProfile(summonerName, region))
    },

    clearSearchError: () => {
      dispatch(SearchViewActions.clearSearchError())
    },

    clearSummonerFound: () => {
      dispatch(SearchViewActions.clearSummonerFound())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchView)
