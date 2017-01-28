import I18n from 'i18n-js';

export default function (queueName) {
  if (queueName === 'RANKED_SOLO_5x5') {
    return I18n.t('queues_ids.4');
  }

  if (queueName === 'RANKED_TEAM_5x5') {
    return I18n.t('queues_ids.42');
  }

  if (queueName === 'RANKED_FLEX_SR') {
    return I18n.t('queues_ids.9');
  }

  if (queueName === 'RANKED_FLEX_TT') {
    return I18n.t('queues_ids.9');
  }

  if (queueName === 'RANKED_TEAM_3x3') {
    return I18n.t('queues_ids.41');
  }

  return queueName;
}
