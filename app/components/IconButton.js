import React, {Component, PropTypes} from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MKButton} from 'react-native-material-kit'

class IconButton extends Component {
  render () {
    let { iconSize, iconName, iconColor } = this.props
    let handleOnPress = this.handleOnPress.bind(this)

    return <MKButton style={styles.root} onPress={handleOnPress}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </MKButton>
  }

  handleOnPress () {
    if (this.props.onPress) {
      this.props.onPress()
    }
  }
}

const styles = StyleSheet.create({
  root: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  onPress: PropTypes.func
}

IconButton.defaultProps = {
  iconSize: 30,
  iconColor: '#ffffff'
}

export default IconButton
