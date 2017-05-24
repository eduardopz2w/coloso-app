import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Dialog from 'react-native-dialogs';
import I18n from 'i18n-js';
import update from 'immutability-helper';
import _ from 'lodash';

import Toolbar from './Toolbar';
import { colors } from 'utils';
import { RegionSelector, LoadingIndicator, TextField } from 'components';

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
      validationErrors: {
        summonerName: null,
      },
      valid: false,
    };

    this.handleTextChangeSummonerName = this.handleTextChangeSummonerName.bind(this);
    this.handleChangeRegion = this.handleChangeRegion.bind(this);
    this.handlePressAddAccount = this.handlePressAddAccount.bind(this);
    this.dialog = new Dialog();
  }

  componentDidMount() {
    this.regionSelector.geolocalize();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.fetched) {
      this.dialog.set({
        content: I18n.t('account_added'),
        positiveText: 'OK',
      });

      this.dialog.show();
      Actions.pop();
    }

    if (newProps.fetchError) {
      this.dialog.set({
        content: newProps.errorMessage,
        positiveText: 'OK',
      });

      this.dialog.show();
    }
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
    if (this.validateForm()) {
      const { summonerName, region } = this.state;

      this.props.fetchAccount({ summonerName, region });
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
        {!this.props.fetching &&
          <TouchableNativeFeedback
            onPress={this.handlePressAddAccount}
          >
            <View style={styles.addAccountButton}>
              <Text style={styles.addAccountText}>{I18n.t('add_account').toUpperCase()}</Text>
            </View>
          </TouchableNativeFeedback>
        }

        {this.props.fetching &&
          <View style={{ alignItems: 'center' }}>
            <LoadingIndicator />
          </View>
        }
      </View>
    </View>);
  }
}

ManageAccountView.propTypes = {
  fetching: PropTypes.bool.isRequired,
  /* eslint-disable react/no-unused-prop-types*/
  fetched: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  /* eslint-enable react/no-unused-prop-types*/
  fetchAccount: PropTypes.func.isRequired,
};

export default ManageAccountView;
