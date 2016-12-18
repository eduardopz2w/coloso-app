import axios from 'axios';

const SERVER_URL = 'http://192.168.0.2:1337/riot-api';

function findByName(summonerName, region) {
  return new Promise((resolve, reject) => {
    const url = `${SERVER_URL}/${region}/summoner/by-name/${summonerName}`;

    return axios.get(url, { params: { region } })
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

function findById(summonerId, region) {
  return new Promise((resolve, reject) => {
    const url = `${SERVER_URL}/${region}/summoner/by-id/${summonerId}`;

    return axios.get(url, { params: { region } })
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
    findByName,
    findById,
  },
};
