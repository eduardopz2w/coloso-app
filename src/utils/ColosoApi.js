import _ from 'lodash';
import ColosoClient from './ColosoClient';

function getProBuilds(params) {
  return new Promise((resolve, reject) => {
    const url = 'pro-builds';
    const requestParams = params;

    if (_.has(requestParams, 'ids') && _.isArray(requestParams.ids)) {
      requestParams.ids = params.ids.toString();
    }

    return ColosoClient.get(url, {
      params: requestParams,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getProPlayers() {
  return new Promise((resolve, reject) => {
    const url = 'pro-players';

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getProBuild({ id }) {
  return new Promise((resolve, reject) => {
    const url = `pro-builds/${id}`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getSummonerByName(summonerName, region) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/by-name/${summonerName}`;

    return ColosoClient.get(url, { params: { region } })
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getSummonerByUrid(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getLeagueEntry(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/league/entry`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getChampionsMasteries(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/champions-mastery`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getGamesRecent(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/games/recent`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getMasteries(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/masteries`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getRunes(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/runes`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getGameCurrent(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/games/current`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getStatsSummary(sumUrid, season) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/stats/summary`;

    return ColosoClient.get(url, {
      params: {
        season,
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getAndroidStatus() {
  return new Promise((resolve, reject) => {
    const url = 'status/android-app';

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getGame({ id }) {
  return new Promise((resolve, reject) => {
    const url = `games/${id}`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

export default {
  proBuilds: {
    get: getProBuilds,
    byId: getProBuild,
  },
  proPlayers: {
    get: getProPlayers,
  },
  games: {
    byId: getGame,
  },
  getSummonerByName,
  getSummonerByUrid,
  getLeagueEntry,
  getChampionsMasteries,
  getGamesRecent,
  getGameCurrent,
  getMasteries,
  getRunes,
  getStatsSummary,
  getAndroidStatus,
};
