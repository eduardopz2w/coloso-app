import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import numeral from 'numeral';
import _ from 'lodash';
import CollapsibleBar from 'react-native-bar-collapsible';
import colors from '../../../../utils/colors';
import constantsParser from '../../../../utils/riotConstantsParser';

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
    const title = constantsParser.playerStatSummaryType(summary.get('playerStatSummaryType'));

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
        {this.renderDataBox('Victorias', summary.get('wins'))}
        {this.renderDataBox('Derrotas', summary.get('losses'))}
        {this.renderDataBox('Partidas', aggregatedStats.get('botGamesPlayed'))}
        {this.renderDataBox('Prom. Asistidos', aggregatedStats.get('averageAssists'))}
        {this.renderDataBox('Prom. Asesinatos', aggregatedStats.get('averageChampionsKilled'))}
        {this.renderDataBox('Prom. Pts Combate', aggregatedStats.get('averageCombatPlayerScore'))}
        {this.renderDataBox('Prom. Nodos Capturados', aggregatedStats.get('averageNodeCapture'))}
        {this.renderDataBox('Prom. Nodos Neutralizados', aggregatedStats.get('averageNodeNeutralize'))}
        {this.renderDataBox('Prom. Puntos', aggregatedStats.get('averageTotalPlayerScore'))}
        {this.renderDataBox('Racha de Asesinatos', aggregatedStats.get('killingSpree'))}
        {this.renderDataBox('Max. Asistidos', aggregatedStats.get('maxAssists'))}
        {this.renderDataBox('Max. Asesinatos', aggregatedStats.get('maxChampionsKilled'))}
        {this.renderDataBox('Puntos de Combate', aggregatedStats.get('maxCombatPlayerScore'))}
        {this.renderDataBox('Max. Golpe Critico', aggregatedStats.get('maxLargestCriticalStrike'))}
        {this.renderDataBox('Max. Racha Asesnatos', aggregatedStats.get('maxLargestKillingSpree'))}
        {this.renderDataBox('Max. Nodos Capturados', aggregatedStats.get('maxNodeCapture'))}
        {this.renderDataBox('Max. Nodos Neutralizados', aggregatedStats.get('maxNodeNeutralize'))}
        {this.renderDataBox('Max. Muertes', aggregatedStats.get('maxNumDeaths'))}
        {this.renderDataBox('Max. Tiempo Jugado', aggregatedStats.get('maxTimePlayed'))}
        {this.renderDataBox('Max. Tiempo Muerto', aggregatedStats.get('maxTimeSpentLiving'))}
        {this.renderDataBox('Max. Puntos', aggregatedStats.get('maxTotalPlayerScore'))}
        {this.renderDataBox('Max. Campeones Asesinados', aggregatedStats.get('mostChampionKillsPerSession'))}
        {this.renderDataBox('Max. Hechizos Lanzados', aggregatedStats.get('mostSpellsCast'))}
        {this.renderDataBox('Partidas', aggregatedStats.get('normalGamesPlayed'))}
        {this.renderDataBox('Partidas (Premade)', aggregatedStats.get('rankedPremadeGamesPlayed'))}
        {this.renderDataBox('Partidas (Solo)', aggregatedStats.get('rankedSoloGamesPlayed'))}
        {this.renderDataBox('Asistencias', aggregatedStats.get('totalAssists'))}
        {this.renderDataBox('Asesinatos', aggregatedStats.get('totalChampionKills'))}
        {this.renderDataBox('Daño Hecho', aggregatedStats.get('totalDamageDealt'))}
        {this.renderDataBox('Daño Recibido', aggregatedStats.get('totalDamageTaken'))}
        {this.renderDataBox('Muertes por Partida', aggregatedStats.get('totalDeathsPerSession'))}
        {this.renderDataBox('Double Kills', aggregatedStats.get('totalDoubleKills'))}
        {this.renderDataBox('Primeras Sangre', aggregatedStats.get('totalFirstBlood'))}
        {this.renderDataBox('Oro Ganado', aggregatedStats.get('totalGoldEarned'))}
        {this.renderDataBox('Vida Restaurada', aggregatedStats.get('totalHeal'))}
        {this.renderDataBox('Daño Magico Recibido', aggregatedStats.get('totalMagicDamageDealt'))}
        {this.renderDataBox('Minions', aggregatedStats.get('totalMinionKills'))}
        {this.renderDataBox('Monstruos Neutrales', aggregatedStats.get('totalNeutralMinionsKilled'))}
        {this.renderDataBox('Nodos Capturados', aggregatedStats.get('totalNodeCapture'))}
        {this.renderDataBox('Nodos Neutralizados', aggregatedStats.get('totalNodeNeutralize'))}
        {this.renderDataBox('Penta Kills', aggregatedStats.get('totalPentaKills'))}
        {this.renderDataBox('Daño Fisico', aggregatedStats.get('totalPhysicalDamageDealt'))}
        {this.renderDataBox('Quadra Kills', aggregatedStats.get('totalQuadraKills'))}
        {this.renderDataBox('Perdidas', aggregatedStats.get('totalSessionsLost'))}
        {this.renderDataBox('Jugadas', aggregatedStats.get('totalSessionsPlayed'))}
        {this.renderDataBox('Ganadas', aggregatedStats.get('totalSessionsWon'))}
        {this.renderDataBox('Triple Kills', aggregatedStats.get('totalTripleKills'))}
        {this.renderDataBox('Torretas', aggregatedStats.get('totalTurretsKilled'))}
        {this.renderDataBox('Unreal Kills', aggregatedStats.get('totalUnrealKills'))}
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
