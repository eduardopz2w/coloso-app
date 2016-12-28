import axios from 'axios';
import _ from 'lodash';

const TIMEOUT = 5000;
let BASEURL = 'http://lolcena.ddns.net:1338/riot-api/';

if (__DEV__) {
  BASEURL = 'http://192.168.0.2:1337/riot-api/';
}

const riotClient = axios.create({
  baseURL: BASEURL,
  timeout: TIMEOUT,
  responseType: 'json',
});

riotClient.interceptors.response.use((response) => {
  if (!_.isObject(response.data) && !_.isArray(response.data)) {
    return Promise.reject({
      response: {
        data: {
          message: 'Algo ha salido mal',
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
        message: 'Error al conectar con el servidor',
      },
    },
  });

  return Promise.reject(error);
});

function getSummonerByName(summonerName, region) {
  return new Promise((resolve, reject) => {
    const url = `${region}/summoner/by-name/${summonerName}`;

    return riotClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err.response);
        const { message: errorMessage } = err.response.data;

        reject({ errorMessage });
      });
  });
}

function getSummonerById(summonerId, region) {
  return new Promise((resolve, reject) => {
    const url = `${region}/summoner/by-id/${summonerId}`;

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

function getSummonerLeagueEntry(summonerId, region) {
  return new Promise((resolve, reject) => {
    const url = `${region}/league/by-summoner/${summonerId}/entry`;

    return riotClient.get(url)
      .then((response) => {
        resolve(response.data[0]);
      })
      .catch((err) => {
        const { message: errorMessage } = err.response.data;

        reject({ errorMessage });
      });
  });
}

function getSummonerChampionsMastery(summonerId, region) {
  return new Promise((resolve, reject) => {
    const url = `${region}/summoner/${summonerId}/champions-mastery`;

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

function getSummonerGamesRecent(summonerId, region) {
  return new Promise((resolve, reject) => {
    const url = `${region}/game/by-summoner/${summonerId}/recent`;

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

function getSummonerMasteries(summonerId, region) {
  return new Promise((resolve, reject) => {
    const url = `${region}/summoner/${summonerId}/masteries`;

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

function getSummonerRunes(summonerId, region) {
  return new Promise((resolve, reject) => {
    const url = `${region}/summoner/${summonerId}/runes`;

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
    const url = `${region}/game/by-summoner/${summonerId}/current`;

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

function getSummonerStatsSummary(summonerId, region, season) {
  return new Promise((resolve, reject) => {
    const url = `${region}/summoner/${summonerId}/stats/summary/${season}`;

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

export default {
  summoner: {
    findByName: getSummonerByName,
    findById: getSummonerById,
    leagueEntry: getSummonerLeagueEntry,
    championsMastery: getSummonerChampionsMastery,
    gamesRecent: getSummonerGamesRecent,
    masteries: getSummonerMasteries,
    runes: getSummonerRunes,
    gameCurrent: getSummonerGameCurrent,
    stats: {
      summary: getSummonerStatsSummary,
    },
  },
};
