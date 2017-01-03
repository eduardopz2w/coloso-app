export default function (queueName) {
  if (queueName === 'RANKED_SOLO_5x5') {
    return 'Ranked Solo 5 vs 5';
  }

  if (queueName === 'RANKED_TEAM_5x5') {
    return 'Ranked Team 5 vs 5';
  }

  if (queueName === 'RANKED_FLEX_SR') {
    return 'Ranked Flexible';
  }

  if (queueName === 'RANKED_FLEX_TT') {
    return 'Ranked Flexible';
  }

  if (queueName === 'RANKED_TEAM_3x3') {
    return 'Ranked Team 3 vs 3';
  }

  return queueName;
}
