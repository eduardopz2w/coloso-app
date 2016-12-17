import React, { Component, PropTypes } from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import SummonerProfileViewToolbar from './SummonerProfileViewToolbar'
import SummonerProfileViewActions from '../../redux/actions/SummonerProfileViewActions'

class SummonerProfileView extends Component {
  componentWillMount () {
    this.props.fetchSummonerData(this.props.summonerId, this.props.region)
  }

  render () {
    let {summonerData} = this.props
    let handleOnPressBackButton = this.handleOnPressBackButton.bind(this)

    return <View>
      <SummonerProfileViewToolbar
        summonerData={summonerData}
        onPressBackButton={handleOnPressBackButton} />
    </View>
  }

  handleOnPressBackButton () {
    Actions.pop()
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummonerProfileView)
