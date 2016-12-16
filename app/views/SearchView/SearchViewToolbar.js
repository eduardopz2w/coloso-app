import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import IconButton from '../../components/IconButton'
import {MKColor} from 'react-native-material-kit'

class SearchViewToolbar extends Component {
  render () {
    return <View style={[styles.root, this.props.style]}>
      <IconButton iconName="menu" />
      <Text style={styles.title}>Buscar</Text>
    </View>
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: MKColor.Indigo,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center'
  },

  title: {
    flex: 1,
    marginLeft: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
})

export default SearchViewToolbar
