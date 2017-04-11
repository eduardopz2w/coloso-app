import React, { Component, PropTypes } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import ImmutablePropTypes from 'react-immutable-proptypes';
import I18n from 'i18n-js';
import _ from 'lodash';

import RankedMiniseries from '../../../../components/RankedMiniseries';
import rankedQueueParser from '../../../../utils/rankedQueueParser';
import colors from '../../../../utils/colors';
import styleUtils from '../../../../utils/styleUtils';

const TIER_SIZE = {
  phone: 70,
  phone_big: 80,
  tablet: 90,
};

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      borderBottomWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
    },
    title: {
      fontSize: 14,
    },
    titleContainer: {
      paddingHorizontal: 16,
      paddingVertical: 5,
      backgroundColor: colors.titlesBackground,
    },
    tierImage: {
      width: TIER_SIZE.phone,
      height: TIER_SIZE.phone,
    },
    entryContainer: {
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 16,
      flexDirection: 'row',
    },
    victoriesNumberText: {
      fontSize: 20,
      color: colors.victory,
      fontWeight: 'bold',
      textAlignVertical: 'center',
    },
    defeatsNumberText: {
      fontSize: 20,
      color: colors.defeat,
      fontWeight: 'bold',
      textAlignVertical: 'center',
    },
    miniSeriesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 32,
      justifyContent: 'center',
    },
    miniSeries: {
      flex: 1,
      maxWidth: 150,
    },
    leaguePointsText: {
      fontWeight: 'bold',
    },
    statsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    statTitle: {
      fontWeight: 'bold',
      height: 100,
      textAlignVertical: 'center',
    },
    nameText: {
      textAlign: 'center',
    },
  },
  {
    '@media (min-device-width: 400)': {
      tierImage: {
        width: TIER_SIZE.phone_big,
        height: TIER_SIZE.phone_big,
      },
      statsRow: {
        alignItems: 'center',
      },
    },
    '@media (min-device-width: 600)': {
      tierImage: {
        width: TIER_SIZE.tablet,
        height: TIER_SIZE.tablet,
      },
      miniSeries: {
        maxWidth: 200,
      },
    },
  },
);

class LeagueEntry extends Component {
  constructor(props) {
    super(props);

    this.deviceDimensions = Dimensions.get('window');
    this.renderTierImage = this.renderTierImage.bind(this);
    this.getTierTextStyle = this.getTierTextStyle.bind(this);
    this.getStatStyle = this.getStatStyle.bind(this);
  }


  getTierTextStyle() {
    const tier = this.props.leagueEntry.get('tier');

    return {
      color: colors.tiers[tier.toLowerCase()],
      fontWeight: 'bold',
      textShadowColor: '#000',
      textShadowOffset: {
        width: 0.5,
        height: 0.5,
      },
    };
  }

  getStatStyle() {
    const horizontalPadding = 16;
    const statStyle = {
      height: 32,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    };

    if (this.deviceDimensions.width <= 399) {
      _.merge(statStyle, {
        width: (this.deviceDimensions.width - (horizontalPadding * 2) - TIER_SIZE.phone) / 2,
      });
    } else if (this.deviceDimensions.width <= 599) {
      _.merge(statStyle, {
        width: (this.deviceDimensions.width - (horizontalPadding * 2) - TIER_SIZE.phone_big) / 2,
      });
    } else {
      _.merge(statStyle, {
        flex: 1,
      });
    }


    return statStyle;
  }

  renderTierImage() {
    return <Image style={styles.tierImage} source={{ uri: this.props.leagueEntry.get('tier') }} />;
  }

  render() {
    const { leagueEntry } = this.props;
    let entries = {};

    if (leagueEntry.get('entries').size > 0) {
      entries = leagueEntry.get('entries').get(0);
    }

    return (<View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}><Text style={styleUtils.boldText}>{rankedQueueParser(leagueEntry.get('queue'))}</Text></Text>
      </View>

      <View style={[styles.entryContainer, this.props.reverse && { flexDirection: 'row-reverse' }]}>
        <View>
          {this.renderTierImage()}
        </View>

        <View style={styleUtils.flexOne}>
          {entries.get('playerOrTeamName') &&
            <Text style={styles.nameText}>
              <Text style={styleUtils.boldText}>{I18n.t('name')}: </Text>
              {entries.get('playerOrTeamName')}
            </Text>
          }

          <View style={styles.statsRow}>
            <View style={this.getStatStyle()}>
              <Text style={styles.statTitle}>{I18n.t('tier')}: </Text>
              <Text style={this.getTierTextStyle()}>{I18n.t(`tiers.${leagueEntry.get('tier').toLowerCase()}`).toUpperCase()}</Text>
            </View>

            <View style={this.getStatStyle()}>
              <Text style={styles.statTitle}>{I18n.t('division')}: </Text>
              <Text>{entries.get('division') || 'I'}</Text>
            </View>

            <View style={this.getStatStyle()}>
              <Text style={styles.statTitle}>{I18n.t('victories')}: </Text>
              <Text style={styles.victoriesNumberText}>{entries.get('wins')}</Text>
            </View>

            <View style={this.getStatStyle()}>
              <Text style={styles.statTitle}>{I18n.t('defeats')}: </Text>
              <Text style={styles.defeatsNumberText}>{entries.get('losses')}</Text>
            </View>
          </View>

          <View>
            {entries.get('miniSeries') && (
              <View style={styles.miniSeriesContainer}>
                <Text style={styles.statTitle}>{I18n.t('progress')}: </Text>
                <RankedMiniseries progress={entries.getIn(['miniSeries', 'progress'])} style={styles.miniSeries} />
              </View>
            )}
            <Text style={styleUtils.centerText}>
              <Text style={styles.statTitle}>{I18n.t('league_points')}: </Text>
              <Text style={styles.leaguePointsText}> {entries.get('leaguePoints') || 0}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>);
  }
}

LeagueEntry.propTypes = {
  leagueEntry: ImmutablePropTypes.mapContains({
    tier: PropTypes.string.isRequired,
    name: PropTypes.string,
    queue: PropTypes.string.isRequired,
    leagueName: PropTypes.string,
    entries: ImmutablePropTypes.list.isRequired,
  }),
  reverse: PropTypes.bool,
};

export default LeagueEntry;
