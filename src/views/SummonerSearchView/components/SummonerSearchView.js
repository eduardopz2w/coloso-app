import React, { Component, PropTypes } from 'react';
import { View, Text, Keyboard, Dimensions, ScrollView, TouchableNativeFeedback } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Dialog from 'react-native-dialogs';
import _ from 'lodash';
import I18n from 'i18n-js';
import { MKRadioButton } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import update from 'immutability-helper';

import SearchViewToolbar from './SearchViewToolbar';
import HistoryModal from './HistoryModal';
import { tracker } from 'utils';
import { LoadingIndicator, RegionSelector, TextField } from 'components';

import styles from './styles';

const PROFILE_SEARCH = 'PROFILE_SEARCH';
const GAME_SEARCH = 'GAME_SEARCH';

class SummonerSearchView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleHeight: Dimensions.get('window').height,
      validationErrors: {
        summonerName: null,
      },
      valid: false,
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
  }

  componentDidMount() {
    tracker.trackScreenView('SummonerSearchView');

    if (_.isEmpty(this.props.summonerName)) {
      this.regionSelector.geolocalize();
    }
  }

  componentDidUpdate() {
    if (this.props.searchError) {
      const dialog = new Dialog();

      dialog.set({
        content: this.props.errorMessage,
        positiveText: 'OK',
      });

      dialog.show();

      return this.props.clearSearchError();
    }

    if (!_.isNull(this.props.summonerFoundId)) {
      this.props.addSearchEntry({
        summonerName: this.props.summonerName,
        region: this.props.region,
      });
      Actions.summonerProfileView({ summonerId: this.props.summonerFoundId });
      this.props.clearFoundData();
    }

    if (this.props.gameFound) {
      this.props.addSearchEntry({
        summonerName: this.props.summonerName,
        region: this.props.region,
      });
      this.props.clearFoundData();
      Actions.gameCurrentView();
    }

    return null;
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleChangeRegion(newRegion) {
    this.props.setRegion(newRegion.toUpperCase());
  }

  handleTextChangeSummonerName(summonerName) {
    this.props.setSummonerName(summonerName);
  }

  handlePressSearchButton() {
    if (this.validateForm()) {
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
    this.props.deleteSearchEntry({ summonerName, region });
  }

  performSearch() {
    Keyboard.dismiss();

    if (!this.props.isSearching) {
      if (this.props.searchType === PROFILE_SEARCH) {
        this.props.searchSummoner({
          summonerName: this.props.summonerName,
          region: this.props.region,
        });
      } else if (this.props.searchType === GAME_SEARCH) {
        this.props.searchGame({
          summonerName: this.props.summonerName,
          region: this.props.region,
        });
      }
    }
  }

  validateForm() {
    if (_.isEmpty(this.props.summonerName)) {
      const newState = update(this.state, {
        validationErrors: {
          summonerName: { $set: I18n.t('validation_errors.summoner_name_required') },
        },
        valid: { $set: false },
      });

      this.setState(newState);

      return false;
    } else if (!this.state.valid) {
      const newState = update(this.state, {
        validationErrors: {
          summonerName: { $set: null },
        },
        valid: { $set: true },
      });

      this.setState(newState);

      return true;
    }

    return true;
  }

  renderSpinner() {
    if (this.props.isSearching) {
      return (<View style={styles.spinnerContainer}>
        <LoadingIndicator />
      </View>);
    }

    return null;
  }

  renderButton() {
    if (!this.props.isSearching && this.state.visibleHeight > 350) {
      return (<TouchableNativeFeedback
        onPress={this.handlePressSearchButton}
      >
        <View style={styles.searchButton}>
          <Text style={styles.searchButtonText}>{I18n.t('summoner_search').toUpperCase()}</Text>
        </View>
      </TouchableNativeFeedback>);
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
        <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.paperBox}>
              <View style={styles.formGroup}>
                <Text style={[styles.label]}>{I18n.t('summoner_name')}:</Text>
                <TextField
                  style={styles.inputName}
                  value={this.props.summonerName}
                  onTextChange={this.handleTextChangeSummonerName}
                  placeholder={I18n.t('summoner_name')}
                  errorText={this.state.validationErrors.summonerName}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={[styles.label]}>Region: </Text>
                <RegionSelector
                  ref={(ref) => { this.regionSelector = ref; }}
                  selectedValue={this.props.region}
                  onChangeRegion={this.handleChangeRegion}
                />
              </View>
              <View style={styles.radiosContainer}>
                <View style={styles.radioGroup}>
                  <MKRadioButton
                    group={this.radioGroup}
                    onCheckedChange={this.handleOnChekedChangeProfileButton}
                    checked={this.props.searchType === PROFILE_SEARCH}
                  />
                  <Text>{I18n.t('summoner_profile')}</Text>
                </View>
                <View style={styles.radioGroup}>
                  <MKRadioButton
                    group={this.radioGroup}
                    checked={this.props.searchType === GAME_SEARCH}
                  />
                  <Text>{I18n.t('game_current')}</Text>
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

SummonerSearchView.propTypes = {
  summonerName: PropTypes.string,
  region: PropTypes.string,
  searchType: PropTypes.string,
  isSearching: PropTypes.bool,
  searchSummoner: PropTypes.func,
  errorMessage: PropTypes.string,
  summonerFoundId: PropTypes.string,
  searchError: PropTypes.bool.isRequired,
  gameFound: PropTypes.bool,
  // Dispatchers
  clearSearchError: PropTypes.func,
  clearFoundData: PropTypes.func,
  searchGame: PropTypes.func,
  searchHistoryEntries: ImmutablePropTypes.list,
  setSummonerName: PropTypes.func,
  setRegion: PropTypes.func,
  setSearchType: PropTypes.func,
  loadSearchHistory: PropTypes.func.isRequired,
  addSearchEntry: PropTypes.func.isRequired,
  deleteSearchEntry: PropTypes.func,
};

export default SummonerSearchView;
