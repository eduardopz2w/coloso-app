import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { MKTextField, MKButton, MKSpinner } from 'react-native-material-kit';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Toolbar from './components/Toolbar';
import RiotApi from '../../utils/RiotApi';
import { saveAccount } from '../../redux/actions/OwnerAccountActions';
import colors from '../../utils/colors';
import RegionSelector from '../../components/RegionSelector';
import LoadingIndicator from '../../components/LoadingIndicator';

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
            <Text style={styles.addAccountText}>AGREGAR CUENTA</Text>
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

ManageAccountView.propTypes = {
  saveAccount: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    saveAccount: (ownerAccount) => {
      dispatch(saveAccount(ownerAccount));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageAccountView);
