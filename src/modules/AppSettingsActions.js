import { createAction } from 'redux-actions';
import { Storage } from '../utils';

const SETTINGS_STORAGE_KEY = 'appSettings';
export const DEFAULT_SETTINGS = {
  keepAwake: true,
};

function getAllSettings() {
  return new Promise((resolve) => {
    Storage.load({ key: SETTINGS_STORAGE_KEY })
      .then(resolve)
      .catch(() => {
        resolve(DEFAULT_SETTINGS);
      });
  });
}

function setSettingToStorage(key, value) {
  let newSettings;

  return new Promise((resolve, reject) => {
    getAllSettings()
      .then((settings) => {
        newSettings = settings;
        newSettings[key] = value;

        return Storage.save({ key: SETTINGS_STORAGE_KEY, rawData: newSettings });
      })
      .then(() => resolve(newSettings))
      .catch(reject);
  });
}

export const loadSettings = createAction('APP_SETTINGS/LOAD', getAllSettings);

export const set = createAction('APP_SETTINGS/SET', (key, value) => new Promise((resolve, reject) => {
  setSettingToStorage(key, value)
    .then(settings => resolve(settings))
    .catch(reject);
}));
