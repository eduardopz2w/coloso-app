import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import numeral from 'numeral';
import _ from 'lodash';
import I18n from 'i18n-js';
import CollapsibleBar from 'react-native-bar-collapsible';
import { colors, riotConstantsParser } from 'utils';

const PADDING = 16;

const styles = StyleSheet.create({
  root: {},
  dataContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: PADDING,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text.main,
  },
  dataBox: {
    flexDirection: 'row',
    height: 25,
  },
  dataTitle: {
    flex: 1,
  },
  dataContent: {
    width: 55,
  },
  collapsible: {
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginBottom: 1,
  },
});

class Summary extends PureComponent {
  constructor(props) {
    super(props);

    const { width } = Dimensions.get('window');

    if (width < 600) {
      this.dataBoxWidth = (width - (PADDING * 2));
    } else {
      this.dataBoxWidth = (width - (PADDING * 2)) / 2;
    }

    this.renderDataBox = this.renderDataBox.bind(this);
    this.deviceWidth = width;
  }

  renderDataBox(title, content) {
    if (_.isUndefined(content)) {
      return null;
    }
    let width = this.dataBoxWidth;

    if (this.deviceWidth < 600 && title.length > 20) {
      width *= 2;
    }

    return (<View style={[styles.dataBox, { width }]}>
      <Text style={styles.dataTitle} numberOfLines={1}>{title}</Text>
      <Text style={styles.dataContent}>{numeral(content).format('0,0')}</Text>
    </View>);
  }

  render() {
    const summary = this.props.summary;
    const aggregatedStats = summary.get('aggregatedStats');
    const title = riotConstantsParser.playerStatSummaryType(summary.get('playerStatSummaryType'));

    return (<CollapsibleBar
      style={styles.collapsible}
      titleStyle={styles.title}
      title={title}
      tintColor={colors.text.main}
      collapsible
      iconSize={10}
      activeSection
    >
      <View style={styles.dataContainer}>
        {this.renderDataBox(I18n.t('victories'), summary.get('wins'))}
        {this.renderDataBox(I18n.t('defeats'), summary.get('losses'))}
        {this.renderDataBox(I18n.t('games'), aggregatedStats.get('botGamesPlayed'))}
        {this.renderDataBox(I18n.t('avg_assists'), aggregatedStats.get('averageAssists'))}
        {this.renderDataBox(I18n.t('avg_kills'), aggregatedStats.get('averageChampionsKilled'))}
        {this.renderDataBox(I18n.t('avg_combat_pts'), aggregatedStats.get('averageCombatPlayerScore'))}
        {this.renderDataBox(I18n.t('avg_nodes_captured'), aggregatedStats.get('averageNodeCapture'))}
        {this.renderDataBox(I18n.t('avg_nodes_neutralized'), aggregatedStats.get('averageNodeNeutralize'))}
        {this.renderDataBox(I18n.t('avg_pts'), aggregatedStats.get('averageTotalPlayerScore'))}
        {this.renderDataBox(I18n.t('killing_spree'), aggregatedStats.get('killingSpree'))}
        {this.renderDataBox(I18n.t('max_assists'), aggregatedStats.get('maxAssists'))}
        {this.renderDataBox(I18n.t('max_champions_kills'), aggregatedStats.get('maxChampionsKilled'))}
        {this.renderDataBox(I18n.t('combat_pts'), aggregatedStats.get('maxCombatPlayerScore'))}
        {this.renderDataBox(I18n.t('max_critical_strike'), aggregatedStats.get('maxLargestCriticalStrike'))}
        {this.renderDataBox(I18n.t('max_critical_strike'), aggregatedStats.get('maxLargestKillingSpree'))}
        {this.renderDataBox(I18n.t('max_killing_spree'), aggregatedStats.get('maxNodeCapture'))}
        {this.renderDataBox(I18n.t('max_nodes_captured'), aggregatedStats.get('maxNodeNeutralize'))}
        {this.renderDataBox(I18n.t('max_deaths'), aggregatedStats.get('maxNumDeaths'))}
        {this.renderDataBox(I18n.t('max_time_played'), aggregatedStats.get('maxTimePlayed'))}
        {this.renderDataBox(I18n.t('max_time_death'), aggregatedStats.get('maxTimeSpentLiving'))}
        {this.renderDataBox(I18n.t('max_pts'), aggregatedStats.get('maxTotalPlayerScore'))}
        {this.renderDataBox(I18n.t('max_champions_kills'), aggregatedStats.get('mostChampionKillsPerSession'))}
        {this.renderDataBox(I18n.t('max_spells_cast'), aggregatedStats.get('mostSpellsCast'))}
        {this.renderDataBox(I18n.t('games'), aggregatedStats.get('normalGamesPlayed'))}
        {this.renderDataBox(I18n.t('games'), aggregatedStats.get('rankedPremadeGamesPlayed'))}
        {this.renderDataBox(I18n.t('games'), aggregatedStats.get('rankedSoloGamesPlayed'))}
        {this.renderDataBox(I18n.t('assists'), aggregatedStats.get('totalAssists'))}
        {this.renderDataBox(I18n.t('kills'), aggregatedStats.get('totalChampionKills'))}
        {this.renderDataBox(I18n.t('damage_dealt'), aggregatedStats.get('totalDamageDealt'))}
        {this.renderDataBox(I18n.t('damage_taken'), aggregatedStats.get('totalDamageTaken'))}
        {this.renderDataBox(I18n.t('deaths_per_game'), aggregatedStats.get('totalDeathsPerSession'))}
        {this.renderDataBox(I18n.t('doublekills'), aggregatedStats.get('totalDoubleKills'))}
        {this.renderDataBox(I18n.t('first_bloods'), aggregatedStats.get('totalFirstBlood'))}
        {this.renderDataBox(I18n.t('gold_earned'), aggregatedStats.get('totalGoldEarned'))}
        {this.renderDataBox(I18n.t('heal_restaured'), aggregatedStats.get('totalHeal'))}
        {this.renderDataBox(I18n.t('magic_damage_dealt'), aggregatedStats.get('totalMagicDamageDealt'))}
        {this.renderDataBox(I18n.t('minions'), aggregatedStats.get('totalMinionKills'))}
        {this.renderDataBox(I18n.t('neutral_minions'), aggregatedStats.get('totalNeutralMinionsKilled'))}
        {this.renderDataBox(I18n.t('nodes_captured'), aggregatedStats.get('totalNodeCapture'))}
        {this.renderDataBox(I18n.t('nodes_neutralized'), aggregatedStats.get('totalNodeNeutralize'))}
        {this.renderDataBox(I18n.t('pentakills'), aggregatedStats.get('totalPentaKills'))}
        {this.renderDataBox(I18n.t('physic_damage_dealt'), aggregatedStats.get('totalPhysicalDamageDealt'))}
        {this.renderDataBox(I18n.t('quadrakills'), aggregatedStats.get('totalQuadraKills'))}
        {this.renderDataBox(I18n.t('games'), aggregatedStats.get('totalSessionsLost'))}
        {this.renderDataBox(I18n.t('games'), aggregatedStats.get('totalSessionsPlayed'))}
        {this.renderDataBox(I18n.t('victories'), aggregatedStats.get('totalSessionsWon'))}
        {this.renderDataBox(I18n.t('triplekills'), aggregatedStats.get('totalTripleKills'))}
        {this.renderDataBox(I18n.t('turrets'), aggregatedStats.get('totalTurretsKilled'))}
        {this.renderDataBox(I18n.t('hexakills'), aggregatedStats.get('totalUnrealKills'))}
      </View>
    </CollapsibleBar>);
  }
}

Summary.propTypes = {
  summary: ImmutablePropTypes.mapContains({
    losses: PropTypes.number,
    playerStatSummaryType: PropTypes.string,
    aggregatedStats: ImmutablePropTypes.mapContains({
      averageAssists: PropTypes.number,
      averageChampionsKilled: PropTypes.number,
      averageCombatPlayerScore: PropTypes.number,
      averageNodeCapture: PropTypes.number,
      averageNodeCaptureAssist: PropTypes.number,
      averageNodeNeutralize: PropTypes.number,
      averageNodeNeutralizeAssist: PropTypes.number,
      averageNumDeaths: PropTypes.number,
      averageObjectivePlayerScore: PropTypes.number,
      averageTeamObjective: PropTypes.number,
      averageTotalPlayerScore: PropTypes.number,
      botGamesPlayed: PropTypes.number,
      killingSpree: PropTypes.number,
      maxAssists: PropTypes.number,
      maxChampionsKilled: PropTypes.number,
      maxCombatPlayerScore: PropTypes.number,
      maxLargestCriticalStrike: PropTypes.number,
      maxLargestKillingSpree: PropTypes.number,
      maxNodeCapture: PropTypes.number,
      maxNodeCaptureAssist: PropTypes.number,
      maxNodeNeutralize: PropTypes.number,
      maxNodeNeutralizeAssist: PropTypes.number,
      maxNumDeaths: PropTypes.number,
      maxObjectivePlayerScore: PropTypes.number,
      maxTeamObjective: PropTypes.number,
      maxTimePlayed: PropTypes.number,
      maxTimeSpentLiving: PropTypes.number,
      maxTotalPlayerScore: PropTypes.number,
      mostChampionKillsPerSession: PropTypes.number,
      mostSpellsCast: PropTypes.number,
      normalGamesPlayed: PropTypes.number,
      rankedPremadeGamesPlayed: PropTypes.number,
      rankedSoloGamesPlayed: PropTypes.number,
      totalAssists: PropTypes.number,
      totalChampionKills: PropTypes.number,
      totalDamageDealt: PropTypes.number,
      totalDamageTaken: PropTypes.number,
      totalDeathsPerSession: PropTypes.number,
      totalDoubleKills: PropTypes.number,
      totalFirstBlood: PropTypes.number,
      totalGoldEarned: PropTypes.number,
      totalHeal: PropTypes.number,
      totalMagicDamageDealt: PropTypes.number,
      totalMinionKills: PropTypes.number,
      totalNeutralMinionsKilled: PropTypes.number,
      totalNodeCapture: PropTypes.number,
      totalNodeNeutralize: PropTypes.number,
      totalPentaKills: PropTypes.number,
      totalPhysicalDamageDealt: PropTypes.number,
      totalQuadraKills: PropTypes.number,
      totalSessionsLost: PropTypes.number,
      totalSessionsPlayed: PropTypes.number,
      totalSessionsWon: PropTypes.number,
      totalTripleKills: PropTypes.number,
      totalTurretsKilled: PropTypes.number,
      totalUnrealKills: PropTypes.number,
    }),
  }),
};

export default Summary;
