import axios from 'axios';
import _ from 'lodash';

const TIMEOUT = 10000;
const VERSION_CODE = 18;
let BASEURL = 'http://lolcena.ddns.net:1338/';

if (__DEV__) {
  BASEURL = 'http://192.168.1.2:1337/';
}

const cenaClient = axios.create({
  baseURL: BASEURL,
  timeout: TIMEOUT,
  responseType: 'json',
  headers: {
    'x-version-code': VERSION_CODE,
  },
});

cenaClient.interceptors.response.use((response) => {
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
  if (error.response) {
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


function getBuilds(championId, page, pageSize) {
  const params = {
    page,
    pageSize,
  };

  if (_.isFinite(championId) && championId > 0) {
    params.championId = championId;
  }

  return new Promise((resolve, reject) => {
    const url = 'pro-builds';

    return cenaClient.get(url, {
      params,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        const { message: errorMessage } = err.response.data;

        reject({ errorMessage });
      });
  });
}

function getBuild(buildId) {
  return new Promise((resolve, reject) => {
    const url = `pro-builds/${buildId}`;

    return cenaClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        const { message: errorMessage } = err.response.data;

        reject({ errorMessage });
      });
  });
}

export default {
  getBuilds,
  getBuild,
};
