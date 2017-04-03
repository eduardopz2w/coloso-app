import React, { PureComponent, PropTypes } from 'react';
import { View, Image } from 'react-native';
import Config from 'react-native-config';

class ProfileImage extends PureComponent {
  render() {
    const url = `${Config.DDRAGON_URL}/img/profileicon/${this.props.id}.png`;

    return <Image source={{ uri: url }} style={this.props.style} />;
  }
}

ProfileImage.propTypes = {
  id: PropTypes.number.isRequired,
  style: View.propTypes.style,
};

ProfileImage.defaultProps = {
  style: {
    width: 40,
    height: 40,
  },
};

export default ProfileImage;
