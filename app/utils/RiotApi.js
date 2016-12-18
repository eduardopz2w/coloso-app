import axios from 'axios'
const SERVER_URL = 'http://192.168.0.2:1337/riot-api'

let findByName = (summonerName, region) => {
  return new Promise((resolve, reject) => {
    let url = `${SERVER_URL}/${region}/summoner/by-name/${summonerName}`

    axios.get(url, {params: {region: region}})
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        let errorMessage

        if (err.response) {
          errorMessage = err.response.data.message
        } else {
          errorMessage = 'Algo salio mal'
        }

        reject({ errorMessage: errorMessage })
      })
  })
}

let findById = (summonerId, region) => {
  return new Promise((resolve, reject) => {
    let url = `${SERVER_URL}/${region}/summoner/by-id/${summonerId}`

    axios.get(url, {params: {region: region}})
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        let errorMessage

        if (err.response) {
          errorMessage = err.response.data.message
        } else {
          errorMessage = 'Algo salio mal'
        }

        reject({ errorMessage: errorMessage })
      })
  })
}

export default {
  summoner: {
    findByName: findByName,
    findById: findById
  }
}
