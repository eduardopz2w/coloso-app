import React, { PureComponent, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import colors from '../../../utils/colors';
import IconButton from '../../../components/IconButton';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      backgroundColor: colors.primary,
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
    },

    title: {
      flex: 1,
      marginLeft: 18,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
  },
);

class Toolbar extends PureComponent {
  render() {
    return (<View style={[styles.root, this.props.style]}>
      <IconButton iconName="menu" onPress={this.props.onPressMenuButton} />
      <Text style={styles.title}>Builds Profesionales</Text>
    </View>);
  }
}

Toolbar.propTypes = {
  style: View.propTypes.style,
  onPressMenuButton: PropTypes.func,
};

export default Toolbar;
