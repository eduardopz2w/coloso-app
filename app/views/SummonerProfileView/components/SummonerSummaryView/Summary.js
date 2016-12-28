import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
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
    width: 45,
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
      <Text style={styles.dataContent}>{content}</Text>
    </View>);
  }

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
      activeSection
    >
      <View style={styles.dataContainer}>
        {this.renderDataBox('Victorias', summary.wins)}
        {this.renderDataBox('Derrotas', summary.losses)}
        {this.renderDataBox('Partidas', aggregatedStats.botGamesPlayed)}
        {this.renderDataBox('Prom. Asistidos', aggregatedStats.averageAssists)}
        {this.renderDataBox('Prom. Asesinatos', aggregatedStats.averageChampionsKilled)}
        {this.renderDataBox('Prom. Pts Combate', aggregatedStats.averageCombatPlayerScore)}
        {this.renderDataBox('Prom. Nodos Capturados', aggregatedStats.averageNodeCapture)}
        {this.renderDataBox('Prom. Nodos Neutralizados', aggregatedStats.averageNodeNeutralize)}
        {this.renderDataBox('Prom. Puntos', aggregatedStats.averageTotalPlayerScore)}
        {this.renderDataBox('Racha de Asesinatos', aggregatedStats.killingSpree)}
        {this.renderDataBox('Max. Asistidos', aggregatedStats.maxAssists)}
        {this.renderDataBox('Max. Asesinatos', aggregatedStats.maxChampionsKilled)}
        {this.renderDataBox('Puntos de Combate', aggregatedStats.maxCombatPlayerScore)}
        {this.renderDataBox('Max. Golpe Critico', aggregatedStats.maxLargestCriticalStrike)}
        {this.renderDataBox('Max. Racha Asesnatos', aggregatedStats.maxLargestKillingSpree)}
        {this.renderDataBox('Max. Nodos Capturados', aggregatedStats.maxNodeCapture)}
        {this.renderDataBox('Max. Nodos Neutralizados', aggregatedStats.maxNodeNeutralize)}
        {this.renderDataBox('Max. Muertes', aggregatedStats.maxNumDeaths)}
        {this.renderDataBox('Max. Tiempo Jugado', aggregatedStats.maxTimePlayed)}
        {this.renderDataBox('Max. Tiempo Muerto', aggregatedStats.maxTimeSpentLiving)}
        {this.renderDataBox('Max. Puntos', aggregatedStats.maxTotalPlayerScore)}
        {this.renderDataBox('Max. Campeones Asesinados', aggregatedStats.mostChampionKillsPerSession)}
        {this.renderDataBox('Max. Hechizos Lanzados', aggregatedStats.mostSpellsCast)}
        {this.renderDataBox('Partidas', aggregatedStats.normalGamesPlayed)}
        {this.renderDataBox('Partidas (Premade)', aggregatedStats.rankedPremadeGamesPlayed)}
        {this.renderDataBox('Partidas (Solo)', aggregatedStats.rankedSoloGamesPlayed)}
        {this.renderDataBox('Asistencias', aggregatedStats.totalAssists)}
        {this.renderDataBox('Asesinatos', aggregatedStats.totalChampionKills)}
        {this.renderDataBox('Daño Hecho', aggregatedStats.totalDamageDealt)}
        {this.renderDataBox('Daño Recibido', aggregatedStats.totalDamageTaken)}
        {this.renderDataBox('Muertes por Partida', aggregatedStats.totalDeathsPerSession)}
        {this.renderDataBox('Double Kills', aggregatedStats.totalDoubleKills)}
        {this.renderDataBox('Primeras Sangre', aggregatedStats.totalFirstBlood)}
        {this.renderDataBox('Oro Ganado', aggregatedStats.totalGoldEarned)}
        {this.renderDataBox('Vida Restaurada', aggregatedStats.totalHeal)}
        {this.renderDataBox('Daño Magico Recibido', aggregatedStats.totalMagicDamageDealt)}
        {this.renderDataBox('Minions', aggregatedStats.totalMinionKills)}
        {this.renderDataBox('Monstruos Neutrales', aggregatedStats.totalNeutralMinionsKilled)}
        {this.renderDataBox('Nodos Capturados', aggregatedStats.totalNodeCapture)}
        {this.renderDataBox('Nodos Neutralizados', aggregatedStats.totalNodeNeutralize)}
        {this.renderDataBox('Penta Kills', aggregatedStats.totalPentaKills)}
        {this.renderDataBox('Daño Fisico', aggregatedStats.totalPhysicalDamageDealt)}
        {this.renderDataBox('Quadra Kills', aggregatedStats.totalQuadraKills)}
        {this.renderDataBox('Perdidas', aggregatedStats.totalSessionsLost)}
        {this.renderDataBox('Jugadas', aggregatedStats.totalSessionsPlayed)}
        {this.renderDataBox('Ganadas', aggregatedStats.totalSessionsWon)}
        {this.renderDataBox('Triple Kills', aggregatedStats.totalTripleKills)}
        {this.renderDataBox('Torretas', aggregatedStats.totalTurretsKilled)}
        {this.renderDataBox('Unreal Kills', aggregatedStats.totalUnrealKills)}
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
