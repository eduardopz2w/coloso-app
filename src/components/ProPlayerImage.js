import React, { Component, PropTypes } from 'react';
import { View, Image, ViewPropTypes } from 'react-native';

class ProPlayerImage extends Component {
  getStyles() {
    const roleSize = this.props.size * 0.40;
    const rolePosX = (this.props.size / 2) * Math.cos(315);
    const rolePosY = (this.props.size / 2) * Math.sin(315);

    const roleRight = ((this.props.size / 2) - rolePosX) - (roleSize / 2);
    const roleBottom = ((this.props.size / 2) - rolePosY) - (roleSize / 2);


    return {
      playerImageContainer: {
        width: this.props.size,
        height: this.props.size,
        position: 'relative',
        marginRight: roleSize / 2,
        marginBottom: roleSize / 2,
      },

      playerImage: {
        width: this.props.size,
        height: this.props.size,
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: this.props.size * 0.04,
      },

      roleImageContainer: {
        width: roleSize,
        height: roleSize,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderWidth: roleSize * 0.04,
        borderColor: 'white',
        position: 'absolute',
        right: roleRight,
        bottom: roleBottom,
      },

      roleImage: {
        width: roleSize - 8,
        height: roleSize - 8,
      },
    };
  }
  render() {
    const styles = this.getStyles();

    return (<View style={[styles.playerImageContainer, this.props.style]}>
      <Image source={{ uri: this.props.imageUrl }} style={styles.playerImage} />
      <View style={styles.roleImageContainer}>
        <Image source={{ uri: `role_icon_${this.props.role}` }} style={styles.roleImage} />
      </View>
    </View>);
  }
}

ProPlayerImage.propTypes = {
  imageUrl: PropTypes.string,
  role: PropTypes.string,
  size: PropTypes.number,
  style: ViewPropTypes.style,
};

ProPlayerImage.defaultProps = {
  size: 50,
};

export default ProPlayerImage;
