import axios from 'axios';
import Qs from 'qs';
import _ from 'lodash';
import DeviceInfo from 'react-native-device-info';
import logger from './logger';

const TIMEOUT = 10000;
let BASEURL = 'http://coloso.ddns.net:3000';

if (__DEV__) {
  BASEURL = 'http://192.168.1.2:3000';
}

const axiosClient = axios.create({
  baseURL: BASEURL,
  timeout: TIMEOUT,
  responseType: 'json',
  headers: {
    'App-Version': DeviceInfo.getVersion(),
    'Content-Type': 'application/vnd.api+json',
  },
  paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'brackets' }),
});

axiosClient.interceptors.response.use((response) => {
  if (!_.isObject(response.data) && !_.isArray(response.data)) {
    return Promise.reject({
      response: {
        data: {
          message: 'Algo ha salido mal, asegurate de tener buena conexión a internet y la ultima version de la aplicación',
        },
      },
    });
  }

  return response;
}, (error) => {
  logger.debug(`${error}`);
  if (_.has(error, ['response', 'data', 'message'])) {
    return Promise.reject(error);
  }

  _.assign(error, {
    response: {
      data: {
        message: 'Error al conectar con el servidor, asegurate de tener acceso a internet y de tener la ultima version de la aplicación',
      },
    },
  });

  return Promise.reject(error);
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
      axiosClient.get(...args)
        .then(resolve)
        .catch(reject);

      setTimeout(() => {
        reject({
          response: {
            data: {
              message: 'No se ha podido establecer conexion con el servidor',
            },
          },
        });
      }, TIMEOUT);
    });
  },
};

export default colosoClient;
