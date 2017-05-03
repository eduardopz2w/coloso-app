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

function getSummonerByName({ summonerName, region }) {
  return new Promise((resolve, reject) => {
    const url = `summoners/by-name/${summonerName}`;

    return ColosoClient.get(url, { params: { region } })
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getSummonerById({ id }) {
  return new Promise((resolve, reject) => {
    const url = `summoners/${id}`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getLeagueEntry({ summonerId }) {
  return new Promise((resolve, reject) => {
    const url = `summoners/${summonerId}/league/entry`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getChampionsMasteries({ summonerId }) {
  return new Promise((resolve, reject) => {
    const url = `summoners/${summonerId}/champions-mastery`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getGamesRecent({ summonerId }) {
  return new Promise((resolve, reject) => {
    const url = `summoners/${summonerId}/games/recent`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getMasteries({ summonerId }) {
  return new Promise((resolve, reject) => {
    const url = `summoners/${summonerId}/masteries`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getRunes({ summonerId }) {
  return new Promise((resolve, reject) => {
    const url = `summoners/${summonerId}/runes`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getGameCurrent({ summonerId }) {
  return new Promise((resolve, reject) => {
    const url = `summoners/${summonerId}/games/current`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(reject);
  });
}

function getStatsSummary({ summonerId, season }) {
  return new Promise((resolve, reject) => {
    const url = `summoners/${summonerId}/stats/summary`;

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
  summoner: {
    byName: getSummonerByName,
    byId: getSummonerById,
    leagueEntry: getLeagueEntry,
    championsMasteries: getChampionsMasteries,
    gamesRecent: getGamesRecent,
    gameCurrent: getGameCurrent,
    masteries: getMasteries,
    runes: getRunes,
    statsSummary: getStatsSummary,
  },
  getAndroidStatus,
};
