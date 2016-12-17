import React, { Component, PropTypes } from 'react'
import {View} from 'react-native'

class SummonerProfileView extends Component {
  componentWillMount () {
    console.log(this.props.summonerId)
  }

  render () {
    return <View />
  }
}

SummonerProfileView.propTypes = {
  summonerId: PropTypes.number
}

export default SummonerProfileView
