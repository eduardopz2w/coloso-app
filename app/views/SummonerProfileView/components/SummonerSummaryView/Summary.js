import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import _ from 'lodash';
import CollapsibleBar from 'react-native-bar-collapsible';
import colors from '../../../../utils/colors';
import constantsParser from '../../../../utils/riotConstantsParser';

const styles = StyleSheet.create({
  root: {},
  dataContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text.main,
  },
  dataBox: {
    flexDirection: 'row',
    height: 20,
    width: 160,
    justifyContent: 'space-around',
  },
  dataTitle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 11,
  },
  dataContent: {
    width: 45,
    fontSize: 11,
  },
  collapsible: {
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginBottom: 1,
  },
});

function renderDataBox(title, content) {
  if (_.isUndefined(content)) {
    return null;
  }

  return (<View style={styles.dataBox}>
    <Text style={styles.dataTitle} numberOfLines={1}>{title}</Text>
    <Text style={styles.dataContent}>{content}</Text>
  </View>);
}

class Summary extends PureComponent {
  render() {
    const { summary } = this.props;
    const { aggregatedStats } = summary;
    const title = constantsParser.playerStatSummaryType(summary.playerStatSummaryType);

    return (<CollapsibleBar
      style={styles.collapsible}
      titleStyle={styles.title}
      title={title}
      tintColor={colors.text.main}
      collapsible
      iconSize={10}
    >
      <View style={styles.dataContainer}>
        {renderDataBox('Victorias', summary.wins)}
        {renderDataBox('Derrotas', summary.losses)}
        {renderDataBox('Partidas', aggregatedStats.botGamesPlayed)}
        {renderDataBox('Prom. Asistidos', aggregatedStats.averageAssists)}
        {renderDataBox('Prom. Asesinatos', aggregatedStats.averageChampionsKilled)}
        {renderDataBox('Prom. Pts Combate', aggregatedStats.averageCombatPlayerScore)}
        {renderDataBox('Prom. Nodos Capturados', aggregatedStats.averageNodeCapture)}
        {renderDataBox('Prom. Nodos Neutralizados', aggregatedStats.averageNodeNeutralize)}
        {renderDataBox('Prom. Puntos', aggregatedStats.averageTotalPlayerScore)}
        {renderDataBox('Racha de Asesinatos', aggregatedStats.killingSpree)}
        {renderDataBox('Max. Asistidos', aggregatedStats.maxAssists)}
        {renderDataBox('Max. Asesinatos', aggregatedStats.maxChampionsKilled)}
        {renderDataBox('Score', aggregatedStats.maxCombatPlayerScore)}
        {renderDataBox('Max. Golpe Critico', aggregatedStats.maxLargestCriticalStrike)}
        {renderDataBox('Max. Racha Asesnatos', aggregatedStats.maxLargestKillingSpree)}
        {renderDataBox('Max. Nodos Capturados', aggregatedStats.maxNodeCapture)}
        {renderDataBox('Max. Nodos Neutralizados', aggregatedStats.maxNodeNeutralize)}
        {renderDataBox('Max. Muertes', aggregatedStats.maxNumDeaths)}
        {renderDataBox('Max. Tiempo Jugado', aggregatedStats.maxTimePlayed)}
        {renderDataBox('Max. Tiempo Muerto', aggregatedStats.maxTimeSpentLiving)}
        {renderDataBox('Max. Puntos', aggregatedStats.maxTotalPlayerScore)}
        {renderDataBox('Max. Campeones Asesinados', aggregatedStats.mostChampionKillsPerSession)}
        {renderDataBox('Max. Hechizos Lanzados', aggregatedStats.mostSpellsCast)}
        {renderDataBox('Partidas', aggregatedStats.normalGamesPlayed)}
        {renderDataBox('Partidas (Premade)', aggregatedStats.rankedPremadeGamesPlayed)}
        {renderDataBox('Partidas (Solo)', aggregatedStats.rankedSoloGamesPlayed)}
        {renderDataBox('Asistencias', aggregatedStats.totalAssists)}
        {renderDataBox('Asesinatos', aggregatedStats.totalChampionKills)}
        {renderDataBox('Daño Hecho', aggregatedStats.totalDamageDealt)}
        {renderDataBox('Daño Recibido', aggregatedStats.totalDamageTaken)}
        {renderDataBox('Muertes por Partida', aggregatedStats.totalDeathsPerSession)}
        {renderDataBox('Double Kills', aggregatedStats.totalDoubleKills)}
        {renderDataBox('Primeras Sangre', aggregatedStats.totalFirstBlood)}
        {renderDataBox('Oro Ganado', aggregatedStats.totalGoldEarned)}
        {renderDataBox('Vida Restaurada', aggregatedStats.totalHeal)}
        {renderDataBox('Daño Magico Recibido', aggregatedStats.totalMagicDamageDealt)}
        {renderDataBox('Minions', aggregatedStats.totalMinionKills)}
        {renderDataBox('Monstruos Neutrales', aggregatedStats.totalNeutralMinionsKilled)}
        {renderDataBox('Nodos Capturados', aggregatedStats.totalNodeCapture)}
        {renderDataBox('Nodos Neutralizados', aggregatedStats.totalNodeNeutralize)}
        {renderDataBox('Penta Kills', aggregatedStats.totalPentaKills)}
        {renderDataBox('Daño Fisico', aggregatedStats.totalPhysicalDamageDealt)}
        {renderDataBox('Quadra Kills', aggregatedStats.totalQuadraKills)}
        {renderDataBox('Perdidas', aggregatedStats.totalSessionsLost)}
        {renderDataBox('Jugadas', aggregatedStats.totalSessionsPlayed)}
        {renderDataBox('Ganadas', aggregatedStats.totalSessionsWon)}
        {renderDataBox('Triple Kills', aggregatedStats.totalTripleKills)}
        {renderDataBox('Torretas', aggregatedStats.totalTurretsKilled)}
        {renderDataBox('Unreal Kills', aggregatedStats.totalUnrealKills)}
      </View>
    </CollapsibleBar>);
  }
}

Summary.propTypes = {
  summary: PropTypes.shape({
    losses: PropTypes.number,
    playerStatSummaryType: PropTypes.string,
    aggregatedStats: PropTypes.shape({
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
