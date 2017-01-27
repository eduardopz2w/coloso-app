import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RankedMiniseries from '../../../../components/RankedMiniseries';
import rankedQueueParser from '../../../../utils/rankedQueueParser';
import colors from '../../../../utils/colors';
import styleUtils from '../../../../utils/styleUtils';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      backgroundColor: '#FFF',
      borderBottomWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
    },
    title: {
      fontSize: 14,
    },
    titleContainer: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 5,
      paddingBottom: 5,
      backgroundColor: colors.titlesBackground,
    },
    tierImage: {
      width: 70,
      height: 70,
      marginRight: 8,
    },
    entryContainer: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 16,
      flexDirection: 'row',
    },
    victoriesNumberText: {
      fontSize: 20,
      color: colors.victory,
      fontWeight: 'bold',
    },
    defeatsNumberText: {
      fontSize: 20,
      color: colors.defeat,
      fontWeight: 'bold',
    },
    leaguePointsTitleText: {
      textAlign: 'center',
    },
    miniSeriesContainer: {
      alignItems: 'center',
    },
    dataText: {
      fontWeight: 'bold',
    },
    leaguePointsText: {
      color: 'black',
    },
  }, {
    '@media (min-device-width: 600)': {
      tierImage: {
        width: 100,
        height: 100,
      },
      entryContainer: {
        paddingLeft: 40,
        paddingRight: 40,
      },
      miniSeriesContainer: {
        width: 250,
        alignSelf: 'center',
        marginTop: 10,
      },
      nameText: {
        fontSize: 18,
      },
      dataText: {
        fontSize: 18,
      },
      title: {
        fontSize: 18,
      },
      victoriesNumberText: {
        fontSize: 24,
      },
      defeatsNumberText: {
        fontSize: 24,
      },
      leaguePointsText: {
        fontSize: 20,
      },
    },
  },
);

class LeagueEntry extends Component {
  constructor(props) {
    super(props);

    this.renderTierImage = this.renderTierImage.bind(this);
    this.getTierTextStyle = this.getTierTextStyle.bind(this);
  }


  getTierTextStyle() {
    const tier = this.props.leagueEntry.get('tier');

    return {
      color: colors.tiers[tier.toLowerCase()],
      textShadowColor: '#000',
      textShadowOffset: {
        width: 0.5,
        height: 0.5,
      },
    };
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
            <Text style={[styleUtils.centerText, styles.nameText]}>
              <Text style={styleUtils.boldText}>Nombre: </Text>
              {entries.get('playerOrTeamName')}
            </Text>
          }

          <View style={styleUtils.flexRow}>
            <Text style={[styleUtils.flexOne, styleUtils.centerText]}>
              <Text style={styles.dataText}>Tier: </Text>
              <Text style={[this.getTierTextStyle(), styles.dataText]}>{leagueEntry.get('tier')}</Text>
            </Text>
            {entries.get('division') &&
              <Text style={[styleUtils.flexOne, styleUtils.centerText, styles.dataText]}>
                <Text style={styleUtils.boldText}>Division: </Text>
                {entries.get('division')}
              </Text>
            }
          </View>

          <View style={styleUtils.flexRow}>
            <Text style={[styleUtils.flexOne, styleUtils.centerText]}>
              <Text style={[styles.victoriesTitleText, styles.dataText]}>Victorias: </Text>
              <Text style={styles.victoriesNumberText}>{entries.get('wins')}</Text>
            </Text>
            <Text style={[styleUtils.flexOne, styleUtils.centerText]}>
              <Text style={[styles.defeatsTitleText, styles.dataText]}>Derrotas: </Text>
              <Text style={styles.defeatsNumberText}>{entries.get('losses')}</Text>
            </Text>
          </View>

          <View>
            {entries.miniSeries ? (
              <View style={[styleUtils.flexRow, styles.miniSeriesContainer]}>
                <Text style={[styleUtils.boldText, styles.dataText]}>Progreso: </Text>
                <RankedMiniseries progress={entries.getIn(['miniSeries', 'progress'])} style={{ flex: 1 }} />
              </View>
            ) : (
              <Text style={styles.leaguePointsTitleText}>
                <Text style={styles.dataText}>Puntos de Liga: </Text>
                <Text style={styles.leaguePointsText}> {entries.get('leaguePoints') || 0}</Text>
              </Text>
            )}
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
