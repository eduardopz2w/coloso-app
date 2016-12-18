import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import SummonerProfileViewToolbar from './SummonerProfileViewToolbar';
import SummonerProfileViewActions from '../../redux/actions/SummonerProfileViewActions';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

class SummonerProfileView extends Component {
  constructor(props) {
    super(props);

    this.handleOnPressBackButton = this.handleOnPressBackButton.bind(this);
    this.handleOnChangeTab = this.handleOnChangeTab.bind(this);
  }

  componentWillMount() {
    this.props.fetchSummonerData(this.props.summonerId, this.props.region);
  }


  handleOnChangeTab() {
    this.setState({});
  }

  render() {
    const { summonerData } = this.props;

    return (<View style={styles.root}>
      <SummonerProfileViewToolbar
        summonerData={summonerData}
        onPressBackButton={() => { Actions.pop(); }}
      />
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
        onChangeTab={this.handleOnChangeTab}
      >
        <Text tabLabel="Champions" />
        <Text tabLabel="League" />
        <Text tabLabel="History" />
        <Text tabLabel="Runes" />
        <Text tabLabel="Masteries" />
      </ScrollableTabView>
    </View>);
  }

}

SummonerProfileView.propTypes = {
  summonerId: PropTypes.number,
  region: PropTypes.string,
  summonerData: PropTypes.obj,
  leagueEntry: PropTypes.obj,
  fetchSummonerData: PropTypes.func,
};

function mapStateToProps(state) {
  const summonerData = state.summonerProfileView.get('summonerData').toJS();
  const leagueEntry = state.summonerProfileView.get('leagueEntry').toJS();

  return {
    summonerData,
    leagueEntry,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSummonerData: (summonerId, region) => {
      dispatch(SummonerProfileViewActions.fetchSummonerData(summonerId, region));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SummonerProfileView);
