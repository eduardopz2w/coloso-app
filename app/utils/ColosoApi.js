import axios from 'axios';
import Qs from 'qs';
import _ from 'lodash';

const TIMEOUT = 10000;
const VERSION_CODE = 20;
let BASEURL = 'http://lolcena.ddns.net:1338/';

if (__DEV__) {
  BASEURL = 'http://192.168.1.2:3000';
}

const colosoClient = axios.create({
  baseURL: BASEURL,
  timeout: TIMEOUT,
  responseType: 'json',
  headers: {
    'x-version-code': VERSION_CODE,
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'brackets' }),
});

colosoClient.interceptors.response.use((response) => {
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


function getProBuilds(queryParams, pageParams) {
  return new Promise((resolve, reject) => {
    const url = 'pro-builds';
    const params = {
      page: pageParams,
    };

    if (_.isFinite(queryParams.championId) && queryParams.championId > 0) {
      params.championId = queryParams.championId;
    }

    if (!_.isEmpty(queryParams.proPlayerId)) {
      params.proPlayerId = queryParams.proPlayerId;
    }

    return colosoClient.get(url, {
      params,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.error(err);
        const { message: errorMessage } = err.response.data;

        reject({ errorMessage });
      });
  });
}

function getProPlayers() {
  return new Promise((resolve, reject) => {
    const url = 'pro-players';

    return colosoClient.get(url)
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

    return colosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        const { message: errorMessage } = err.response.data;

        reject({ errorMessage });
      });
  });
}

function getSummonerByName(summonerName, region) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/by-name/${summonerName}`;

    return colosoClient.get(url, { params: { region } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        const { message: errorMessage } = err.response.data;

        reject({ errorMessage });
      });
  });
}

function getSummonerByUrid(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}`;

    return colosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        const { message: errorMessage } = err.response.data;

        reject({ errorMessage });
      });
  });
}

function getLeagueEntry(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/league/entry`;

    return colosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        const { message: errorMessage } = err.response.data;

        reject({ errorMessage });
      });
  });
}

function getChampionsMasteries(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/champions-mastery`;

    return colosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        const { message: errorMessage } = err.response.data;

        reject({ errorMessage });
      });
  });
}

function getGamesRecent(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/games/recent`;

    return colosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        const { message: errorMessage } = err.response.data;

        reject({ errorMessage });
      });
  });
}

function getMasteries(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/masteries`;

    return colosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        const { message: errorMessage } = err.response.data;

        reject({ errorMessage });
      });
  });
}

function getRunes(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/runes`;

    return colosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        const { message: errorMessage } = err.response.data;

        reject({ errorMessage });
      });
  });
}

function getGameCurrent(summonerId, region) {
  return new Promise((resolve, reject) => {
    const url = `${region}/summoner/${summonerId}/games/current`;

    return colosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        const { message: errorMessage } = err.response.data;

        reject({ errorMessage });
      });
  });
}

function getStatsSummary(sumUrid, season) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/stats/summary`;

    return colosoClient.get(url, {
      params: {
        season,
      },
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

export default {
  getProBuilds,
  getBuild,
  getProPlayers,
  getSummonerByName,
  getSummonerByUrid,
  getLeagueEntry,
  getChampionsMasteries,
  getGamesRecent,
  getGameCurrent,
  getMasteries,
  getRunes,
  getStatsSummary,
};
