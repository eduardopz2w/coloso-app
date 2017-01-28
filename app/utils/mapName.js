import I18n from 'i18n-js';

export default function (mapId) {
  if (mapId === 1 || mapId === 2 || mapId === 11) {
    return I18n.t('maps.summoner_rift');
  } if (mapId === 4 || mapId === 10) {
    return I18n.t('maps.twisted_treeline');
  } if (mapId === 8) {
    return I18n.t('maps.crystal_scar');
  } if (mapId === 3 || mapId === 12 || mapId === 14) {
    return I18n.t('maps.howling_abyss');
  }

  return mapId;
}
