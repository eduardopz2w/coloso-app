import I18n from 'i18n-js';

function playerStatSummaryType(constant) {
  if (constant === 'Unranked') {
    return I18n.t('queues_ids.2');
  }
  if (constant === 'Unranked3x3') {
    return I18n.t('queues_ids.8');
  }
  if (constant === 'OdinUnranked') {
    return I18n.t('queues_ids.16');
  }
  if (constant === 'AramUnranked5x5') {
    return I18n.t('queues_ids.65');
  }
  if (constant === 'CoopVsAI') {
    return 'Cop vs AI 5 vs 5';
  }
  if (constant === 'CoopVsAI3x3') {
    return 'Cop vs AI 3 vs 3';
  }
  if (constant === 'RankedSolo5x5') {
    return I18n.t('queues_ids.4');
  }
  if (constant === 'RankedTeam3x3') {
    return I18n.t('queues_ids.41');
  }
  if (constant === 'RankedTeam5x5') {
    return I18n.t('queues_ids.42');
  }
  if (constant === 'OneForAll5x5') {
    return I18n.t('queues_ids.70');
  }
  if (constant === 'FirstBlood1x1') {
    return I18n.t('queues_ids.72');
  }
  if (constant === 'FirstBlood2x2') {
    return I18n.t('queues_ids.73');
  }
  if (constant === 'SummonersRift6x6') {
    return I18n.t('queues_ids.98');
  }
  if (constant === 'CAP5x5') {
    return I18n.t('team_builder');
  }
  if (constant === 'URF') {
    return I18n.t('queues_ids.76');
  }
  if (constant === 'URFBots') {
    return I18n.t('queues_ids.83');
  }
  if (constant === 'NightmareBot') {
    return I18n.t('nightmare_bots');
  }
  if (constant === 'Ascension') {
    return I18n.t('queues_ids.96');
  }
  if (constant === 'Hexakill') {
    return `${I18n.t('queues_ids.98')} (${I18n.t('maps.twisted_treeline')})`;
  }
  if (constant === 'KingPoro') {
    return I18n.t('queues_ids.300');
  }
  if (constant === 'CounterPick') {
    return I18n.t('queues_ids.310');
  }
  if (constant === 'Siege') {
    return I18n.t('queues_ids.315');
  }
  if (constant === 'RankedFlexTT') {
    return `${I18n.t('queues_ids.9')} 3 vs 3`;
  }
  if (constant === 'RankedFlexSR') {
    return `${I18n.t('queues_ids.9')} 5 vs 5`;
  }

  return constant;
}

export default {
  playerStatSummaryType,
};
