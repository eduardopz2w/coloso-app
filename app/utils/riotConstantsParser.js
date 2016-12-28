function playerStatSummaryType(constant) {
  if (constant === 'Unranked') {
    return 'Grieta del Invocador (Normal)';
  }
  if (constant === 'Unranked3x3') {
    return 'Bosque Retorcido';
  }
  if (constant === 'OdinUnranked') {
    return 'Dominion';
  }
  if (constant === 'AramUnranked5x5') {
    return 'Aram';
  }
  if (constant === 'CoopVsAI') {
    return 'Cooperativo vs Bots 5 vs 5';
  }
  if (constant === 'CoopVsAI3x3') {
    return 'Cooperativo vs Bots 3 vs 3';
  }
  if (constant === 'RankedSolo5x5') {
    return 'Ranked Solo 5 vs 5';
  }
  if (constant === 'RankedTeam3x3') {
    return 'Ranked de Equpos 3 vs 3';
  }
  if (constant === 'RankedTeam5x5') {
    return 'Ranked de Equpos 5 vs 5';
  }
  if (constant === 'OneForAll5x5') {
    return 'Uno Para Todos';
  }
  if (constant === 'FirstBlood1x1') {
    return 'Primera Sangre 1 vs 1';
  }
  if (constant === 'FirstBlood2x2') {
    return 'Primera Sangre 2 vs 2';
  }
  if (constant === 'SummonersRift6x6') {
    return 'Hexakill';
  }
  if (constant === 'CAP5x5') {
    return 'Creador de Equipos';
  }
  if (constant === 'URF') {
    return 'Rápido y Feróz';
  }
  if (constant === 'URFBots') {
    return 'Rápido y Feróz (Bots)';
  }
  if (constant === 'NightmareBot') {
    return 'Bots de Pesadilla';
  }
  if (constant === 'Ascension') {
    return 'Ascensión';
  }
  if (constant === 'Hexakill') {
    return 'Hexakill (Bosque Retorcido)';
  }
  if (constant === 'KingPoro') {
    return 'La Leyenda del Rey Poro';
  }
  if (constant === 'CounterPick') {
    return 'Nemesis';
  }
  if (constant === 'Siege') {
    return 'Asedio del Nexo';
  }
  if (constant === 'RankedFlexTT') {
    return 'Ranked Flexible 3 vs 3';
  }
  if (constant === 'RankedFlexSR') {
    return 'Ranked Flexible 5 vs 5';
  }

  return constant;
}

export default {
  playerStatSummaryType,
};
