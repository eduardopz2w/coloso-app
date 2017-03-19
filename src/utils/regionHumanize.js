import I18n from 'i18n-js';

function regionHumanize(shortName) {
  return I18n.t(`regions.${shortName.toLowerCase()}`);
}

export default regionHumanize;
