import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flex: 1,
  },
});

class SideMenu extends Component {
  render() {
    return (<View style={styles.root}>
      <TouchableWithoutFeedback
        onPress={() => {
          Actions.search_view();
          this.context.drawer.close();
        }}
      >
        <View style={{ height: 56 }}>
          <Text>Home Search</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => {
          Actions.probuilds_search_view();
          this.context.drawer.close();
        }}
      >
        <View style={{ height: 56 }}>
          <Text>Pro Builds</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>);
  }
}

SideMenu.contextTypes = {
  drawer: React.PropTypes.object,
};

export default SideMenu;
