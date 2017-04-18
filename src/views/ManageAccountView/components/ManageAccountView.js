import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Dialog from 'react-native-dialogs';
import I18n from 'i18n-js';
import update from 'immutability-helper';
import _ from 'lodash';

import Toolbar from './Toolbar';
import ColosoApi from '../../../utils/ColosoApi';
import colors from '../../../utils/colors';
import RegionSelector from '../../../components/RegionSelector';
import LoadingIndicator from '../../../components/LoadingIndicator';
import TextField from '../../../components/TextField';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  inputName: {
    marginLeft: 9,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  addAccountButton: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 16,
  },
  addAccountText: {
    color: '#FFF',
  },
});

class ManageAccountView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerName: '',
      region: 'NA',
      isFetching: false,
      validationErrors: {
        summonerName: null,
      },
      valid: false,
    };

    this.handleTextChangeSummonerName = this.handleTextChangeSummonerName.bind(this);
    this.handleChangeRegion = this.handleChangeRegion.bind(this);
    this.handlePressAddAccount = this.handlePressAddAccount.bind(this);
  }

  componentDidMount() {
    this.regionSelector.geolocalize();
  }

  handleTextChangeSummonerName(summonerName) {
    this.setState({
      summonerName,
    });
  }

  handleChangeRegion(region) {
    this.setState({
      region,
    });
  }

  handlePressAddAccount() {
    const state = this.state;

    if (this.validateForm()) {
      this.setState({ isFetching: true });

      ColosoApi.getSummonerByName(state.summonerName, state.region)
        .then((summonerData) => {
          const summonerName = summonerData.data.attributes.name;
          const region = summonerData.data.attributes.region;

          this.props.saveAccount({
            summonerName,
            summonerUrid: summonerData.data.attributes.urid,
            profileIconId: summonerData.data.attributes.profileIconId,
            region,
          });

          const dialog = new Dialog();

          dialog.set({
            content: I18n.t('account_added'),
            positiveText: 'OK',
          });

          dialog.show();
          Actions.pop();
        })
        .catch(({ message }) => {
          const dialog = new Dialog();

          dialog.set({
            content: message,
            positiveText: 'OK',
          });

          dialog.show();
          this.setState({ isFetching: false });
        });
    }
  }

  validateForm() {
    if (_.isEmpty(this.state.summonerName)) {
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

  render() {
    return (<View style={styles.root}>
      <Toolbar
        onPressBackButton={() => {
          Actions.pop();
        }}
      />
      <View style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={[styles.label]}>{I18n.t('summoner_name')}: </Text>
          <TextField
            style={styles.inputName}
            value={this.state.summonerName}
            onTextChange={this.handleTextChangeSummonerName}
            placeholder={I18n.t('summoner_name')}
            errorText={this.state.validationErrors.summonerName}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={[styles.label]}>Region: </Text>
          <RegionSelector
            ref={(ref) => { this.regionSelector = ref; }}
            style={styles.inputRegion}
            onChangeRegion={this.handleChangeRegion}
            selectedValue={this.state.region}
          />
        </View>
        {!this.state.isFetching &&
          <TouchableNativeFeedback
            onPress={this.handlePressAddAccount}
          >
            <View style={styles.addAccountButton}>
              <Text style={styles.addAccountText}>{I18n.t('add_account').toUpperCase()}</Text>
            </View>
          </TouchableNativeFeedback>
        }

        {this.state.isFetching &&
          <View style={{ alignItems: 'center' }}>
            <LoadingIndicator />
          </View>
        }
      </View>
    </View>);
  }
}

ManageAccountView.propTypes = {
  saveAccount: PropTypes.func,
};

export default ManageAccountView;
