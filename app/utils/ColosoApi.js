import _ from 'lodash';
import ColosoClient from './ColosoClient';

function handleError(error, reject) {
  const { message: errorMessage } = error.response.data;

  reject({ errorMessage });
}

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

    return ColosoClient.get(url, {
      params,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch(err => handleError(err, reject));
  });
}

function getProPlayers() {
  return new Promise((resolve, reject) => {
    const url = 'pro-players';

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(err => handleError(err, reject));
  });
}

function getProBuild(proBuildId) {
  return new Promise((resolve, reject) => {
    const url = `pro-builds/${proBuildId}`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(err => handleError(err, reject));
  });
}

function getSummonerByName(summonerName, region) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/by-name/${summonerName}`;

    return ColosoClient.get(url, { params: { region } })
      .then((response) => {
        resolve(response.data);
      })
      .catch(err => handleError(err, reject));
  });
}

function getSummonerByUrid(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(err => handleError(err, reject));
  });
}

function getLeagueEntry(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/league/entry`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(err => handleError(err, reject));
  });
}

function getChampionsMasteries(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/champions-mastery`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(err => handleError(err, reject));
  });
}

function getGamesRecent(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/games/recent`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(err => handleError(err, reject));
  });
}

function getMasteries(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/masteries`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(err => handleError(err, reject));
  });
}

function getRunes(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/runes`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(err => handleError(err, reject));
  });
}

function getGameCurrent(sumUrid) {
  return new Promise((resolve, reject) => {
    const url = `riot-api/summoner/${sumUrid}/games/current`;

    return ColosoClient.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch(err => handleError(err, reject));
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
      .catch(err => handleError(err, reject));
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

export default {
  getProBuilds,
  getProBuild,
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
  getAndroidStatus,
};
