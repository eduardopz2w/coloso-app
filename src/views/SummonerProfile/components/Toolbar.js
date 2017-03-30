import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import I18n from 'i18n-js';

import IconButton from '../../../components/IconButton';
import regionHumanize from '../../../utils/regionHumanize';
import colors from '../../../utils/colors';
import ProfileImage from '../../../components/ProfileImage';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      backgroundColor: colors.primary,
    },

    profileToolbar: {
      marginTop: -56,
      paddingTop: 18,
      paddingBottom: 8,
      minHeight: 100,
    },

    profileToolbarContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    loadingText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },

    backgroundImage: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },

    summonerImageContainer: {
      width: 70,
      height: 70,
      position: 'relative',
      alignSelf: 'center',
      justifyContent: 'center',
      borderColor: colors.accent,
      borderRadius: 50,
      borderWidth: 4,
      alignItems: 'center',
    },

    summonerImage: {
      width: 64,
      height: 64,
      borderRadius: 50,
    },

    summonerLevelContainer: {
      position: 'absolute',
      width: 20,
      height: 20,
      backgroundColor: colors.accent,
      bottom: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },

    summonerDataContainer: {
      marginLeft: 18,
      justifyContent: 'center',
    },

    summonerLevelText: {
      color: 'black',
      textAlign: 'center',
      fontSize: 12,
    },

    summonerNameText: {
      fontSize: 16,
      color: '#FFF',
      textShadowColor: '#000',
      textShadowOffset: {
        width: 2,
        height: 2,
      },
    },

    regionText: {
      color: '#FFF',
      textAlign: 'center',
      textShadowColor: '#000',
      textShadowOffset: {
        width: 1.5,
        height: 1.5,
      },
    },
  },
  {
    '@media (min-device-width: 600)': {
      profileToolbar: {
        minHeight: 100,
      },

      profileToolbarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },

      summonerImageContainer: {
        width: 100,
        height: 100,
      },

      summonerImage: {
        width: 90,
        height: 90,
      },

      summonerLevelContainer: {
        width: 30,
        height: 30,
      },

      summonerLevelText: {
        fontSize: 16,
      },

      summonerDataContainer: {
        marginLeft: 40,
        justifyContent: 'center',
      },
      summonerNameText: {
        fontSize: 26,
        textAlign: 'left',
      },
      regionText: {
        fontSize: 18,
        textAlign: 'left',
      },
    },
  },
);

function renderLoading() {
  return (<View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Text style={styles.loadingText}>{I18n.t('loading')}...</Text>
  </View>);
}

class SummonerProfileViewToolbar extends Component {
  constructor(props) {
    super(props);

    this.handleOnPressBackButton = this.handleOnPressBackButton.bind(this);
    this.renderSummonerData = this.renderSummonerData.bind(this);
    this.renderRetryButton = this.renderRetryButton.bind(this);
  }

  handleOnPressBackButton() {
    if (this.props.onPressBackButton) {
      return this.props.onPressBackButton();
    }

    return null;
  }

  renderSummonerData() {
    const summonerData = this.props.summonerData;

    return (
      <View style={styles.profileToolbarContainer}>
        <View style={styles.summonerImageContainer}>
          <ProfileImage
            style={styles.summonerImage}
            id={summonerData.getIn(['data', 'profileIconId'])}
          />
          <View style={styles.summonerLevelContainer}>
            <Text style={styles.summonerLevelText}>{summonerData.getIn(['data', 'summonerLevel'])}</Text>
          </View>
        </View>

        <View style={styles.summonerDataContainer}>
          <Text style={styles.summonerNameText}>{summonerData.getIn(['data', 'name'])}</Text>
          <Text style={styles.regionText}>{regionHumanize(summonerData.getIn(['data', 'region']))}</Text>
        </View>
      </View>
    );
  }

  renderRetryButton() {
    return (<View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <IconButton
        style={{ backgroundColor: 'white', borderRadius: 50, width: 40, height: 40 }}
        onPress={this.props.onPressRetryButton}
        iconName="refresh"
        iconColor={colors.primary}
      />
    </View>);
  }

  render() {
    const { summonerData } = this.props;
    let content;

    if (summonerData.get('fetched')) {
      content = this.renderSummonerData();
    } else if (summonerData.get('fetchError')) {
      content = this.renderRetryButton();
    } else {
      content = renderLoading();
    }

    return (<View style={styles.root}>
      <View style={styles.toolbar}>
        <IconButton iconName="arrow-back" onPress={this.handleOnPressBackButton} />
      </View>

      <View style={styles.profileToolbar}>
        {content}
      </View>
    </View>);
  }
}


SummonerProfileViewToolbar.propTypes = {
  summonerData: ImmutablePropTypes.mapContains({
    fetched: PropTypes.bool.isRequired,
    data: ImmutablePropTypes.mapContains({
      profileIconId: PropTypes.number.isRequired,
      summonerLevel: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onPressBackButton: PropTypes.func.isRequired,
  onPressRetryButton: PropTypes.func.isRequired,
};

export default SummonerProfileViewToolbar;
