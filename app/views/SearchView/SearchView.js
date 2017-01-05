import React, { Component, PropTypes } from 'react';
import { View, Text, Keyboard, Dimensions, BackAndroid, Alert, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { MKTextField, MKButton, MKSpinner, MKRadioButton } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import SearchViewToolbar from './components/SearchViewToolbar';
import HistoryModal from './components//HistoryModal';
import { tracker } from '../../utils/analytics';
import colors from '../../utils/colors';
import { loadEntries, addEntry, deleteEntry } from '../../redux/actions/SearchHistoryActions';
import RegionSelector from '../../components/RegionSelector';
import {
  setSummonerName,
  setRegion,
  setSearchType,
  searchSummoner,
  searchGame,
  clearSearchError,
  clearFoundData,
} from '../../redux/actions/SearchViewActions';
import styles from './styles';

// TODO: Agregar busquedas recientes

const PROFILE_SEARCH = 'PROFILE_SEARCH';
const GAME_SEARCH = 'GAME_SEARCH';

class SearchView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleHeight: Dimensions.get('window').height,
      region: 'na',
    };

    this.handlePressSearchButton = this.handlePressSearchButton.bind(this);
    this.handleTextChangeSummonerName = this.handleTextChangeSummonerName.bind(this);
    this.handleChangeRegion = this.handleChangeRegion.bind(this);
    this.handleOnChekedChangeProfileButton = this.handleOnChekedChangeProfileButton.bind(this);
    this.handleOnPressHistoryButton = this.handleOnPressHistoryButton.bind(this);
    this.handleOnPressHistoryEntry = this.handleOnPressHistoryEntry.bind(this);
    this.handleOnPressDeleteEntry = this.handleOnPressDeleteEntry.bind(this);
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
    tracker.trackScreenView('SearchView');
  }

  componentDidUpdate() {
    if (this.props.searchError) {
      Alert.alert(null, this.props.errorMessage);
      return this.props.clearSearchError();
    }

    if (this.props.summonerFoundId > 0) {
      this.props.addSearchEntry(this.props.summonerName, this.props.region);
      Actions.summoner_profile_view({
        summonerId: this.props.summonerFoundId,
        region: this.props.summonerFoundRegion,
      });
      this.props.clearFoundData();
    } else if (this.props.gameFound) {
      this.props.addSearchEntry(this.props.summonerName, this.props.region);
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
    this.props.setRegion(newRegion);
  }

  handleTextChangeSummonerName(summonerName) {
    this.props.setSummonerName(summonerName);
  }

  handlePressSearchButton() {
    if (this.props.summonerName !== '') {
      this.performSearch();
    }
  }

  handleKeyboardDidHide() {
    this.setState({
      visibleHeight: Dimensions.get('window').height,
    });
  }

  handleOnChekedChangeProfileButton({ checked }) {
    if (checked) {
      this.props.setSearchType(PROFILE_SEARCH);
    } else {
      this.props.setSearchType(GAME_SEARCH);
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
    this.props.setSummonerName(summonerName);
    this.props.setRegion(region);
  }

  handleOnPressDeleteEntry(summonerName, region) {
    this.props.deleteSearchEntry(summonerName, region);
  }

  performSearch() {
    Keyboard.dismiss();

    if (!this.props.isSearching) {
      if (this.props.searchType === PROFILE_SEARCH) {
        this.props.searchSummoner(this.props.summonerName, this.props.region);
      } else if (this.props.searchType === GAME_SEARCH) {
        this.props.searchGame(this.props.summonerName, this.props.region);
      }
    }
  }

  renderSpinner() {
    if (this.props.isSearching) {
      return (<View style={styles.spinnerContainer}>
        <MKSpinner strokeColor={colors.spinnerColor} />
      </View>);
    }

    return null;
  }

  renderButton() {
    if (!this.props.isSearching && this.state.visibleHeight > 350) {
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
    return (<View style={styles.root}>
      <SearchViewToolbar
        onPressHistoryButton={this.handleOnPressHistoryButton}
        onPressMenuButton={() => { Actions.refresh({ key: 'drawer', open: true }); }}
      />
      <View style={styles.wrapper}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <View style={styles.paperBox}>
              <View style={styles.formGroup}>
                <Text style={[styles.label]}>Nombre de Invocador: </Text>
                <MKTextField
                  style={styles.inputName}
                  value={this.props.summonerName}
                  onTextChange={this.handleTextChangeSummonerName}
                  placeholder="Nombre de invocador"
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={[styles.label]}>Region: </Text>
                <RegionSelector
                  selectedValue={this.props.region}
                  onChangeRegion={this.handleChangeRegion}
                />
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <View style={styles.radioGroup}>
                  <MKRadioButton
                    group={this.radioGroup}
                    onCheckedChange={this.handleOnChekedChangeProfileButton}
                    checked={this.props.searchType === PROFILE_SEARCH}
                  />
                  <Text>Perfil de invocador</Text>
                </View>
                <View style={styles.radioGroup}>
                  <MKRadioButton
                    group={this.radioGroup}
                    checked={this.props.searchType === GAME_SEARCH}
                  />
                  <Text>Juego actual</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {this.renderSpinner()}
        {this.renderButton()}
      </View>


      <HistoryModal
        ref={(historyModal) => { this.historyModal = historyModal; }}
        historyEntries={this.props.searchHistoryEntries}
        onPressHistoryEntry={this.handleOnPressHistoryEntry}
        onPressDeleteEntry={this.handleOnPressDeleteEntry}
      />
    </View>);
  }
}

SearchView.propTypes = {
  summonerName: PropTypes.string,
  region: PropTypes.string,
  searchType: PropTypes.string,
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
  setSummonerName: PropTypes.func,
  setRegion: PropTypes.func,
  setSearchType: PropTypes.func,
  loadSearchHistory: PropTypes.func.isRequired,
  addSearchEntry: PropTypes.func.isRequired,
  deleteSearchEntry: PropTypes.func,
};

function mapStateToProps(state) {
  const searchViewState = state.searchView;

  return {
    summonerName: searchViewState.get('summonerName'),
    region: searchViewState.get('region'),
    searchType: searchViewState.get('searchType'),
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
      dispatch(searchSummoner(summonerName, region));
    },

    searchGame: (summonerName, region) => {
      tracker.trackEvent('search game', `name: ${summonerName} region: ${region}`);
      dispatch(searchGame(summonerName, region));
    },

    clearSearchError: () => {
      dispatch(clearSearchError());
    },

    clearFoundData: () => {
      dispatch(clearFoundData());
    },

    loadSearchHistory: () => {
      dispatch(loadEntries());
    },

    addSearchEntry: (summonerName, region) => {
      dispatch(addEntry(summonerName, region));
    },

    deleteSearchEntry: (summonerName, region) => {
      dispatch(deleteEntry(summonerName, region));
    },

    setSummonerName: (summonerName) => {
      dispatch(setSummonerName(summonerName));
    },

    setRegion: (region) => {
      dispatch(setRegion(region));
    },

    setSearchType: (searchType) => {
      dispatch(setSearchType(searchType));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
