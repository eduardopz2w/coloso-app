import axios from 'axios';
import Qs from 'qs';
import _ from 'lodash';
import I18n from 'i18n-js';
import DeviceInfo from 'react-native-device-info';
import logger from './logger';

let BASEURL = 'http://api.coloso.net';
let TIMEOUT = 25000;

if (__DEV__) {
  BASEURL = 'http://192.168.1.2:3000';
  TIMEOUT = 5000;
}

const axiosClient = axios.create({
  baseURL: BASEURL,
  timeout: TIMEOUT * 2,
  responseType: 'json',
  headers: {
    common: {
      'Accept-Language': 'en',
      'App-Version': DeviceInfo.getVersion(),
    },
  },
  paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'brackets' }),
});

axiosClient.interceptors.response.use((response) => {
  if (!_.isObject(response.data) && !_.isArray(response.data)) {
    logger.debug(`Request Fail ${response.config.method.toUpperCase()} @ ${response.config.url}, reason: Slow Connection`);

    return Promise.reject({
      message: I18n.t('errors.slow_connection'),
    });
  }

  logger.groupCollapsed(`Request Success ${response.config.method.toUpperCase()} @ ${response.config.url}`);
  logger.debug(`Status: ${response.status}`);
  logger.debug('Data: ', response.data);
  logger.groupEnd('Request');

  return response;
}, (error) => {
  logger.groupCollapsed(`Request Fail ${error.response.config.method.toUpperCase()} @ ${error.response.config.url}`);
  logger.debug(`Status: ${error.response.status}`);
  logger.debug('Data: ', error.response.data);
  logger.groupEnd('Request');

  let message;

  if (_.has(error, ['response', 'data', 'message'])) {
    message = error.response.data.message;
  } else {
    message = I18n.t('errors.request_failed');
  }

  return Promise.reject({ message });
});

axiosClient.interceptors.request.use((config) => {
  if (__DEV__) {
    logger.groupCollapsed(`Request ${config.method.toUpperCase()} @ ${config.url}`);
    logger.debug('params: ', config.params);
    logger.debug('headers: ', config.headers);
    logger.groupEnd('Request');
  }

  return config;
});

const colosoClient = {
  get(...args) {
    return new Promise((resolve, reject) => {
      let canceled = false;

      axiosClient.get(...args)
        .then((response) => {
          if (!canceled) {
            resolve(response);
          }
        })
        .catch((error) => {
          if (!canceled) {
            reject(error);
          }
        });

      setTimeout(() => {
        reject({ message: I18n.t('errors.timeout') });
        canceled = true;
      }, TIMEOUT);
    });
  },

  setLocale(newLocale) {
    axiosClient.defaults.headers.common['Accept-Language'] = newLocale;
  },
};

export default colosoClient;
