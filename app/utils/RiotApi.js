import axios from 'axios';

const SERVER_URL = 'http://192.168.0.2:1337/riot-api';

function getSummonerByName(summonerName, region) {
  return new Promise((resolve, reject) => {
    const url = `${SERVER_URL}/${region}/summoner/by-name/${summonerName}`;

    return axios.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        let errorMessage;

        if (err.response) {
          errorMessage = err.response.data.message;
        } else {
          errorMessage = 'Algo salio mal';
        }

        reject({ errorMessage });
      });
  });
}

function getSummonerById(summonerId, region) {
  return new Promise((resolve, reject) => {
    const url = `${SERVER_URL}/${region}/summoner/by-id/${summonerId}`;

    return axios.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        let errorMessage;

        if (err.response) {
          errorMessage = err.response.data.message;
        } else {
          errorMessage = 'Algo salio mal';
        }

        reject({ errorMessage });
      });
  });
}

function getSummonerLeagueEntry(summonerId, region) {
  return new Promise((resolve, reject) => {
    const url = `${SERVER_URL}/${region}/league/by-summoner/${summonerId}/entry`;

    return axios.get(url)
      .then((response) => {
        resolve(response.data[0]);
      })
      .catch((err) => {
        let errorMessage;

        if (err.response) {
          errorMessage = err.response.data.message;
        } else {
          errorMessage = 'Algo salio mal';
        }

        reject({ errorMessage });
      });
  });
}

function getSummonerChampionsMastery(summonerId, region) {
  return new Promise((resolve, reject) => {
    const url = `${SERVER_URL}/${region}/summoner/${summonerId}/champions-mastery`;

    return axios.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        let errorMessage;

        if (err.response) {
          errorMessage = err.response.data.message;
        } else {
          errorMessage = 'Algo salio mal';
        }

        reject({ errorMessage });
      });
  });
}

function getSummonerGamesRecent(summonerId, region) {
  return new Promise((resolve, reject) => {
    const url = `${SERVER_URL}/${region}/game/by-summoner/${summonerId}/recent`;

    return axios.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        let errorMessage;

        if (err.response) {
          errorMessage = err.response.data.message;
        } else {
          errorMessage = 'Algo salio mal';
        }

        reject({ errorMessage });
      });
  });
}

function getSummonerMasteries(summonerId, region) {
  return new Promise((resolve, reject) => {
    const url = `${SERVER_URL}/${region}/summoner/${summonerId}/masteries`;

    return axios.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        let errorMessage;

        if (err.response) {
          errorMessage = err.response.data.message;
        } else {
          errorMessage = 'Algo salio mal';
        }

        reject({ errorMessage });
      });
  });
}

function getSummonerRunes(summonerId, region) {
  return new Promise((resolve, reject) => {
    const url = `${SERVER_URL}/${region}/summoner/${summonerId}/runes`;

    return axios.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        let errorMessage;

        if (err.response) {
          errorMessage = err.response.data.message;
        } else {
          errorMessage = 'Algo salio mal';
        }

        reject({ errorMessage });
      });
  });
}

function getSummonerGameCurrent(summonerId, region) {
  return new Promise((resolve, reject) => {
    const url = `${SERVER_URL}/${region}/game/by-summoner/${summonerId}/current`;

    return axios.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        let errorMessage;

        if (err.response) {
          errorMessage = err.response.data.message;
        } else {
          errorMessage = 'Algo salio mal';
        }

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
  },
};
