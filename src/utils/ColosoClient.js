import axios from 'axios';
import Qs from 'qs';
import _ from 'lodash';
import I18n from 'i18n-js';
import DeviceInfo from 'react-native-device-info';
import Config from 'react-native-config';

import logger from './logger';

const BASE_URL = Config.API_URL;
const TIMEOUT = parseInt(Config.REQUEST_TIMEOUT, 10);

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
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
  if (__DEV__) {
    logger.groupCollapsed(`Request Fail ${error.config.method.toUpperCase()} @ ${error.config.url}`);
    logger.debug(`Status: ${error.response && error.response.status}`);
    logger.debug('Data: ', error.response && error.response.data);
    logger.groupEnd('Request');
  }

  let message;

  if (error.code === 'ECONNABORTED') {
    message = I18n.t('errors.timeout');
  } else if (_.has(error, ['response', 'data', 'message'])) {
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
    let canceled = false;

    return new Promise((resolve, reject) => {
      axiosClient.get(...args)
        .then((response) => {
          if (!canceled) {
            resolve(response);
          }
        })
        .catch((err) => {
          if (!canceled) {
            reject(err);
          }
        });

      setTimeout(() => {
        canceled = true;
        reject({ message: I18n.t('errors.timeout') });
      }, TIMEOUT);
    });
  },

  setLocale(newLocale) {
    axiosClient.defaults.headers.common['Accept-Language'] = newLocale;
  },
};

export default colosoClient;
