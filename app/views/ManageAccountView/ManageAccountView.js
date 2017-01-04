import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Picker, Alert } from 'react-native';
import { MKTextField, MKButton, MKSpinner } from 'react-native-material-kit';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Toolbar from './components/Toolbar';
import regionHumanize from '../../utils/regionHumanize';
import RiotApi from '../../utils/RiotApi';
import OwnerAccountActions from '../../redux/actions/OwnerAccountActions';
import colors from '../../utils/colors';

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
      region: 'na',
      isFetching: false,
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

    if (state.summonerName !== '') {
      this.setState({ isFetching: true });

      RiotApi.summoner.findByName(state.summonerName, state.region)
        .then((summonerData) => {
          this.props.saveAccount({
            summonerName: summonerData.name,
            summonerId: summonerData.id,
            profileIconId: summonerData.profileIconId,
            region: summonerData.region,
          });
          Alert.alert(null, 'Tu cuenta ha sido agregada');
          Actions.pop();
        })
        .catch(({ errorMessage }) => {
          Alert.alert(null, errorMessage);
          this.setState({ isFetching: false });
        });
    }
  }
  render() {
    const regions = ['na', 'lan', 'las', 'br', 'eunw', 'eune', 'oce', 'jp', 'kr', 'ru', 'tr'];

    return (<View style={styles.root}>
      <Toolbar
        onPressBackButton={() => {
          Actions.pop();
        }}
      />
      <View style={styles.container}>
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
        {!this.state.isFetching &&
          <MKButton
            rippleColor="rgba(0,0,0,0.1)"
            style={styles.addAccountButton}
            onPress={this.handlePressAddAccount}
          >
            <Text style={styles.addAccountText}>AGREGAR CUENTA</Text>
          </MKButton>
        }

        {this.state.isFetching &&
          <View style={{ alignItems: 'center' }}>
            <MKSpinner strokeColor={colors.spinnerColor} />
          </View>
        }
      </View>
    </View>);
  }
}

ManageAccountView.propTypes = {
  saveAccount: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    saveAccount: (ownerAccount) => {
      dispatch(OwnerAccountActions.saveAccount(ownerAccount));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageAccountView);
