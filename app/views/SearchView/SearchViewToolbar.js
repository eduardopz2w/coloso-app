import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import colors from '../../utils/colors';
import IconButton from '../../components/IconButton'

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
    backgroundColor: colors.primary,
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
