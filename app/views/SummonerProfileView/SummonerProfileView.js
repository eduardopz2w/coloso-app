import React, { Component, PropTypes } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import SummonerProfileViewToolbar from './SummonerProfileViewToolbar'
import SummonerProfileViewActions from '../../redux/actions/SummonerProfileViewActions'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'

class SummonerProfileView extends Component {
  componentWillMount () {
    this.props.fetchSummonerData(this.props.summonerId, this.props.region)
  }

  render () {
    let {summonerData} = this.props
    let handleOnPressBackButton = this.handleOnPressBackButton.bind(this)
    let handleOnChangeTab = this.handleOnChangeTab.bind(this)

    return <View style={styles.root}>
      <SummonerProfileViewToolbar
        summonerData={summonerData}
        onPressBackButton={handleOnPressBackButton} />
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
        onChangeTab={handleOnChangeTab}
      >
        <Text tabLabel="Champions" />
        <Text tabLabel="League" />
        <Text tabLabel="History" />
        <Text tabLabel="Runes" />
        <Text tabLabel="Masteries" />
      </ScrollableTabView>
    </View>
  }

  handleOnPressBackButton () {
    Actions.pop()
  }

  handleOnChangeTab ({i: tabNumber}) {
    console.log(tabNumber)
  }
}

SummonerProfileView.propTypes = {
  summonerId: PropTypes.number,
  region: PropTypes.string
}

let mapStateToProps = (state, props) => {
  let summonerData = state.summonerProfileView.get('summonerData').toJS()

  return {
    summonerData: summonerData
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    fetchSummonerData: (summonerId, region) => {
      dispatch(SummonerProfileViewActions.fetchSummonerData(summonerId, region))
    }
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummonerProfileView)
