import axios from 'axios';
import _ from 'lodash';

const TIMEOUT = 10000;
const VERSION_CODE = 20;
let BASEURL = 'http://lolcena.ddns.net:1338/riot-api/';

if (__DEV__) {
  BASEURL = 'http://192.168.1.2:3000/riot-api/';
}

const riotClient = axios.create({
  baseURL: BASEURL,
  timeout: TIMEOUT,
  responseType: 'json',
  headers: {
    'x-version-code': VERSION_CODE,
    'Content-Type': 'application/json',
  },
});

riotClient.interceptors.response.use((response) => {
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

function getSummonerByName(summonerName, region) {
  return new Promise((resolve, reject) => {
    const url = `summoner/by-name/${summonerName}`;

    return riotClient.get(url, { params: { region } })
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
    const url = `summoner/${sumUrid}`;

    return riotClient.get(url)
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
    const url = `summoner/${sumUrid}/league/entry`;

    return riotClient.get(url)
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
    const url = `summoner/${sumUrid}/champions-mastery`;

    return riotClient.get(url)
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
    const url = `summoner/${sumUrid}/games/recent`;

    return riotClient.get(url)
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
    const url = `summoner/${sumUrid}/masteries`;

    return riotClient.get(url)
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
    const url = `summoner/${sumUrid}/runes`;

    return riotClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        const { message: errorMessage } = err.response.data;

        reject({ errorMessage });
      });
  });
}

function getSummonerGameCurrent(summonerId, region) {
  return new Promise((resolve, reject) => {
    const url = `${region}/summoner/${summonerId}/games/current`;

    return riotClient.get(url)
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
    const url = `summoner/${sumUrid}/stats/summary`;

    return riotClient.get(url, {
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
  summoner: {
    findByName: getSummonerByName,
    findByUrid: getSummonerByUrid,
    leagueEntry: getLeagueEntry,
    championsMastery: getChampionsMasteries,
    gamesRecent: getGamesRecent,
    masteries: getMasteries,
    runes: getRunes,
    gameCurrent: getSummonerGameCurrent,
    stats: {
      summary: getStatsSummary,
    },
  },
};
