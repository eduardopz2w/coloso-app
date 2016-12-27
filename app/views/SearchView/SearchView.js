import React, { Component, PropTypes } from 'react';
import { View, Picker, Text, Keyboard, Dimensions, BackAndroid, Alert } from 'react-native';
import { connect } from 'react-redux';
import { MKTextField, MKButton, MKSpinner, MKRadioButton } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import { MediaQuery } from 'react-native-responsive';
import SearchViewToolbar from './components/SearchViewToolbar';
import HistoryModal from './components//HistoryModal';
import { tracker } from '../../utils/analytics';
import SearchViewActions from '../../redux/actions/SearchViewActions';
import SearchHistoryActions from '../../redux/actions/SearchHistoryActions';
import History from './components/History';
import regionHumanize from '../../utils/regionHumanize';
import styles from './styles';

// TODO: Agregar busquedas recientes

const PROFILE_SEARCH = 'PROFILE_SEARCH';
const GAME_SEARCH = 'GAME_SEARCH';

class SearchView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      summonerName: 'armaghyon',
      region: 'lan',
      searchType: PROFILE_SEARCH,
      visibleHeight: Dimensions.get('window').height,
    };

    this.handlePressSearchButton = this.handlePressSearchButton.bind(this);
    this.handleTextChangeSummonerName = this.handleTextChangeSummonerName.bind(this);
    this.handleChangeRegion = this.handleChangeRegion.bind(this);
    this.handleOnChekedChangeProfileButton = this.handleOnChekedChangeProfileButton.bind(this);
    this.handleOnPressHistoryButton = this.handleOnPressHistoryButton.bind(this);
    this.handleOnPressHistoryEntry = this.handleOnPressHistoryEntry.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.radioGroup = new MKRadioButton.Group();
  }

  componentWillMount() {
    this.props.loadSearchHistory();
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide.bind(this));
    this.backAndroidListener = BackAndroid.addEventListener('hardwareBackPress', this.handleOnBackAndroid.bind(this));
  }

  componentDidMount() {
    console.log(tracker);
    tracker.trackScreenView('SearchView');
  }

  componentDidUpdate() {
    if (this.props.searchError) {
      Alert.alert(null, this.props.errorMessage);
      return this.props.clearSearchError();
    }

    if (this.props.summonerFoundId > 0) {
      this.props.addSearchEntry(this.state.summonerName, this.state.region);
      Actions.summoner_profile_view({
        summonerId: this.props.summonerFoundId,
        region: this.props.summonerFoundRegion,
      });
      this.props.clearFoundData();
    } else if (this.props.gameFound) {
      this.props.addSearchEntry(this.state.summonerName, this.state.region);
      this.props.clearFoundData();
      Actions.game_current();
    }

    return null;
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this.backAndroidListener.remove();
  }

  handleOnBackAndroid() {
    if (this.historyModal.isOpen()) {
      this.historyModal.close();
      return true;
    }

    return false;
  }

  handleChangeRegion(newRegion) {
    if (!this.props.isSearching) {
      this.setState({ region: newRegion });
    }
  }

  handleTextChangeSummonerName(newSummonerName) {
    if (!this.props.isSearching) {
      this.setState({ summonerName: newSummonerName });
    }
  }

  handlePressSearchButton() {
    if (this.state.summonerName !== '') {
      Keyboard.dismiss();

      if (this.state.searchType === PROFILE_SEARCH) {
        this.props.searchSummoner(this.state.summonerName, this.state.region);
      } else if (this.state.searchType === GAME_SEARCH) {
        this.props.searchGame(this.state.summonerName, this.state.region);
      }
    }
  }

  handleKeyboardDidHide() {
    this.setState({
      visibleHeight: Dimensions.get('window').height,
    });
  }

  handleOnChekedChangeProfileButton({ checked }) {
    if (checked) {
      this.setState({ searchType: PROFILE_SEARCH });
    } else {
      this.setState({ searchType: GAME_SEARCH });
    }
  }

  handleKeyboardDidShow(e) {
    const newSize = Dimensions.get('window').height - e.endCoordinates.height;

    this.setState({
      visibleHeight: newSize,
    });
  }

  handleOnPressHistoryButton() {
    this.historyModal.open();
  }

  handleOnPressHistoryEntry(summonerName, region) {
    this.historyModal.close();
    this.setState({ summonerName, region });
  }

  renderSpinner() {
    if (this.props.isSearching) {
      return (<View style={styles.spinnerContainer}>
        <MKSpinner strokeColor="white" />
      </View>);
    }

    return null;
  }

  renderButton() {
    if (!this.props.isSearching && this.state.visibleHeight > 300) {
      return (<MKButton
        rippleColor="rgba(0,0,0,0.1)"
        style={styles.searchButton}
        onPress={this.handlePressSearchButton}
      >
        <Text style={styles.searchButtonText}>BUSCAR INVOCADOR</Text>
      </MKButton>);
    }

    return null;
  }

  render() {
    const regions = ['na', 'lan', 'las', 'br', 'eunw', 'eune', 'oce', 'jp', 'kr', 'ru', 'tr'];


    return (<View style={styles.root}>
      <SearchViewToolbar onPressHistoryButton={this.handleOnPressHistoryButton} />
      <View style={styles.container}>

        <View style={styles.paperBox}>
          <View style={styles.formGroup}>
            <Text style={[styles.label]}>Nombre de Invocador: </Text>
            <MKTextField
              style={styles.inputName}
              value={this.state.summonerName}
              onTextChange={this.handleTextChangeSummonerName}
              placeholder="Nombre de invocador"
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={[styles.label]}>Region: </Text>
            <Picker
              style={styles.inputRegion}
              onValueChange={this.handleChangeRegion}
              selectedValue={this.state.region}
            >
              {regions.map((region, index) => <Picker.Item
                key={index}
                label={regionHumanize(region)}
                value={region}
              />)}
            </Picker>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <View style={styles.radioGroup}>
              <MKRadioButton
                group={this.radioGroup}
                onCheckedChange={this.handleOnChekedChangeProfileButton}
                checked
              />
              <Text>Perfil de invocador</Text>
            </View>
            <View style={styles.radioGroup}>
              <MKRadioButton group={this.radioGroup} />
              <Text>Juego actual</Text>
            </View>
          </View>
        </View>

        <MediaQuery minDeviceWidth={600}>
          <View style={[styles.paperBox, styles.historyContainer]}>
            <Text style={styles.modalTitle}>Busqueda Rápida</Text>
            <History
              ref={(historyModal) => { this.historyModal = historyModal; }}
              style={{ flex: -1 }}
              historyEntries={this.props.searchHistoryEntries}
              onPressHistoryEntry={this.handleOnPressHistoryEntry}
            />
          </View>
        </MediaQuery>

        {this.renderSpinner()}
        {this.renderButton()}
      </View>

      <HistoryModal
        ref={(historyModal) => { this.historyModal = historyModal; }}
        historyEntries={this.props.searchHistoryEntries}
        onPressHistoryEntry={this.handleOnPressHistoryEntry}
      />
    </View>);
  }
}

SearchView.propTypes = {
  isSearching: PropTypes.bool,
  searchSummoner: PropTypes.func,
  clearSearchError: PropTypes.func,
  clearFoundData: PropTypes.func,
  summonerFoundId: PropTypes.number,
  summonerFoundRegion: PropTypes.string,
  gameFound: PropTypes.bool.isRequired,
  searchError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  searchGame: PropTypes.func,
  searchHistoryEntries: PropTypes.arrayOf(PropTypes.shape({
    entries: PropTypes.arrayOf(PropTypes.shape({})),
  })),
  loadSearchHistory: PropTypes.func.isRequired,
  addSearchEntry: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const searchViewState = state.searchView;

  return {
    isSearching: searchViewState.get('isSearching'),
    searchError: searchViewState.get('searchError'),
    errorMessage: searchViewState.get('errorMessage'),
    summonerFoundId: searchViewState.get('summonerFoundId'),
    summonerFoundRegion: searchViewState.get('summonerFoundRegion'),
    gameFound: searchViewState.get('gameFound'),
    searchHistoryEntries: state.searchHistory.get('entries').toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchSummoner: (summonerName, region) => {
      tracker.trackEvent('search profile', `name: ${summonerName} region: ${region}`);
      dispatch(SearchViewActions.searchSummoner(summonerName, region));
    },

    searchGame: (summonerName, region) => {
      tracker.trackEvent('search game', `name: ${summonerName} region: ${region}`);
      dispatch(SearchViewActions.searchGame(summonerName, region));
    },

    clearSearchError: () => {
      dispatch(SearchViewActions.clearSearchError());
    },

    clearFoundData: () => {
      dispatch(SearchViewActions.clearFoundData());
    },

    loadSearchHistory: () => {
      dispatch(SearchHistoryActions.loadEntries());
    },

    addSearchEntry: (summonerName, region) => {
      dispatch(SearchHistoryActions.addEntry(summonerName, region));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
