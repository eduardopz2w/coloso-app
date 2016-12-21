import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Image, Picker, Text, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { MKTextField, MKButton, MKColor, MKSpinner, MKRadioButton } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import Snackbar from 'react-native-android-snackbar';
import _ from 'lodash';
import SearchViewToolbar from './SearchViewToolbar';
import SearchViewActions from '../../redux/actions/SearchViewActions';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
  },

  homeImage: {
    width: null,
    height: 200,
    borderRadius: 16,
  },

  inputsRow: {
    flexDirection: 'row',
  },

  inputName: {
    flex: 1,
    height: 47,
  },

  inputRegion: {
    width: 80,
    height: 50,
  },

  searchButton: {
    backgroundColor: MKColor.Indigo,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },

  searchButtonText: {
    color: '#FFFFFF',
  },

  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexRow: {
    flexDirection: 'row',
  },
});

class SearchView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      summonerName: 'mycotic',
      region: 'na',
      keyboardOpen: false,
      searchType: 'PROFILE',
    };

    this.handlePressSearchButton = this.handlePressSearchButton.bind(this);
    this.handleTextChangeSummonerName = this.handleTextChangeSummonerName.bind(this);
    this.handleChangeRegion = this.handleChangeRegion.bind(this);
    this.handleOnChekedChangeProfileButton = this.handleOnChekedChangeProfileButton.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.radioGroup = new MKRadioButton.Group();
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchError) {
      Snackbar.show(nextProps.errorMessage, { duration: Snackbar.UNTIL_CLICK });
      return this.props.clearSearchError();
    }

    if (this.state.searchType === 'PROFILE') {
      if (_.isNumber(nextProps.summonerFoundId)) {
        Actions.summoner_profile_view({
          summonerId: nextProps.summonerFoundId,
          region: this.state.region,
        });
        this.props.clearFoundData();
      }
    } else if (this.state.searchType === 'GAME') {
      if (_.isNumber(nextProps.summonerFoundId)) {
        if (!nextProps.isSearching && !nextProps.gameFound) {
          this.props.searchGame(nextProps.summonerFoundId, this.state.region);
        } else if (nextProps.gameFound) {
          this.props.clearFoundData();
          Actions.game_current();
        }
      }
    }

    return null;
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleKeyboardDidShow() {
    this.setState({ keyboardOpen: true });
  }

  handleChangeRegion(newRegion) {
    this.setState({ region: newRegion });
  }

  handleTextChangeSummonerName(newSummonerName) {
    this.setState({ summonerName: newSummonerName });
  }

  handlePressSearchButton() {
    Snackbar.dismiss();
    this.props.searchSummoner(this.state.summonerName, this.state.region);
  }

  handleKeyboardDidHide() {
    this.setState({ keyboardOpen: false });
  }

  handleOnChekedChangeProfileButton({ checked }) {
    if (checked) {
      this.setState({ searchType: 'PROFILE' });
    } else {
      this.setState({ searchType: 'GAME' });
    }
  }

  renderImage() {
    if (!this.state.keyboardOpen) {
      return (<Image
        style={styles.homeImage}
        source={require('../../assets/poro_wallpaper.jpg')}
      />);
    }

    return null;
  }

  render() {
    const { summonerName, region } = this.state;
    const { isSearching } = this.props;

    return (<View style={styles.root}>
      <SearchViewToolbar />
      <View style={styles.container}>
        {this.renderImage()}

        <View style={styles.inputsRow}>
          <MKTextField
            style={styles.inputName}
            value={summonerName}
            onTextChange={this.handleTextChangeSummonerName}
            placeholder="Nombre de invocador"
          />

          <Picker
            style={styles.inputRegion}
            onValueChange={this.handleChangeRegion}
            selectedValue={region}
          >
            <Picker.Item label="LAN" value="lan" />
            <Picker.Item label="LAS" value="las" />
            <Picker.Item label="NA" value="na" />
          </Picker>
        </View>

        <View style={styles.flexRow}>
          <View style={[styles.flexRow, { flex: 1, alignItems: 'center' }]}>
            <MKRadioButton
              group={this.radioGroup}
              onCheckedChange={this.handleOnChekedChangeProfileButton}
              checked
            />
            <Text>Perfil de Invocador</Text>
          </View>
          <View style={[styles.flexRow, { flex: 1, alignItems: 'center' }]}>
            <MKRadioButton group={this.radioGroup} />
            <Text>Juego Actual</Text>
          </View>
        </View>

        {isSearching ? (
          <View style={styles.spinnerContainer}>
            <MKSpinner />
          </View>
        ) : (
          <MKButton
            style={styles.searchButton}
            onPress={this.handlePressSearchButton}
          >
            <Text style={styles.searchButtonText}>BUSCAR INVOCADOR</Text>
          </MKButton>
        )}

      </View>
    </View>);
  }
}

SearchView.propTypes = {
  isSearching: PropTypes.bool,
  searchSummoner: PropTypes.func,
  clearSearchError: PropTypes.func,
  clearFoundData: PropTypes.func,
  summonerFoundId: PropTypes.any,
  gameFound: PropTypes.bool.isRequired,
  searchGame: PropTypes.func,
};

function mapStateToProps(state) {
  const searchViewState = state.searchView;

  return {
    isSearching: searchViewState.get('isSearching'),
    searchError: searchViewState.get('searchError'),
    errorMessage: searchViewState.get('errorMessage'),
    summonerFoundId: searchViewState.get('summonerFoundId'),
    gameFound: searchViewState.get('gameFound'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchSummoner: (summonerName, region) => {
      dispatch(SearchViewActions.searchSummoner(summonerName, region));
    },

    searchGame: (summonerId, region) => {
      dispatch(SearchViewActions.searchGame(summonerId, region));
    },

    clearSearchError: () => {
      dispatch(SearchViewActions.clearSearchError());
    },

    clearFoundData: () => {
      dispatch(SearchViewActions.clearFoundData());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
