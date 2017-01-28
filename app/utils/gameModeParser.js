import I18n from 'i18n-js';

export default function (gameMode) {
  return I18n.t(`game_modes.${gameMode.toLowerCase()}`);
}
