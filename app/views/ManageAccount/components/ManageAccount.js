import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
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

class ManageAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerName: '',
      region: 'na',
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
          this.props.saveAccount({
            summonerName: summonerData.data.attributes.name,
            summonerUrid: summonerData.data.attributes.urid,
            profileIconId: summonerData.data.attributes.profileIconId,
            region: summonerData.data.attributes.region,
          });
          Alert.alert(null, I18n.t('account_added'));
          Actions.pop();
        })
        .catch(({ errorMessage }) => {
          Alert.alert(null, errorMessage);
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
            style={styles.inputRegion}
            onChangeRegion={this.handleChangeRegion}
            selectedValue={this.state.region}
          />
        </View>
        {!this.state.isFetching &&
          <MKButton
            rippleColor="rgba(0,0,0,0.1)"
            style={styles.addAccountButton}
            onPress={this.handlePressAddAccount}
          >
            <Text style={styles.addAccountText}>{I18n.t('add_account').toUpperCase()}</Text>
          </MKButton>
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

ManageAccount.propTypes = {
  saveAccount: PropTypes.func,
};

export default ManageAccount;
