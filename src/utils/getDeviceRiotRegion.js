import axios from 'axios';
import _ from 'lodash';

const REGION_CONTRIES = [
  {
    code: 'LAN',
    countries: ['MX', 'GT', 'BZ', 'CU', 'JM', 'HT', 'DO', 'PR', 'DM', 'SV', 'HN', 'NI', 'CR', 'PA', 'CO', 'VE', 'EC'],
  },
  {
    code: 'LAS',
    countries: ['BO', 'CL', 'PY', 'UY', 'AR'],
  },
  {
    code: 'NA',
    countries: ['US', 'CA', 'GL'],
  },
  {
    code: 'EUNE',
    countries: ['IS', 'NO', 'SE', 'FI', 'EE', 'LV', 'LT', 'BY', 'PL', 'DK', 'UA', 'MD', 'CZ', 'SK', 'HU', 'SI', 'HR', 'BA', 'CS', 'RS', 'RO', 'BG', 'XK', 'MK', 'AL', 'GR'],
  },
  {
    code: 'EUW',
    countries: ['IE', 'ES', 'PT', 'FR', 'CH', 'IT', 'AT', 'LU', 'BE', 'DE'],
  },
  {
    code: 'OCE',
    countries: ['AU', 'PG', 'NZ', 'FJ', 'SB', 'VU', 'NC', 'PF', 'WS', 'GU', 'KI', 'TO', 'FM', 'MH'],
  },
];

let cached = false;
let regionCached;

function getRiotRegion(countryName) {
  if (['JP', 'BR', 'TR', 'RU', 'KR'].includes(countryName)) {
    return countryName;
  }

  let region = 'NA';

  _.each(REGION_CONTRIES, ({ code, countries }) => {
    if (countries.includes(countryName)) {
      region = code;
      return false;
    }

    return true;
  });

  return region;
}

function getCountryCode() {
  return new Promise((resolve, reject) => {
    axios.get('http://freegeoip.net/json/')
      .then(({ data: { country_code: countryCode } }) => resolve(countryCode))
      .catch(reject);
  });
}

export default function getDeviceRiotRegion() {
  return new Promise((resolve, reject) => {
    if (cached) {
      return resolve(regionCached);
    }

    return getCountryCode()
      .then(countryCode => getRiotRegion(countryCode))
      .then((riotRegion) => {
        cached = true;
        regionCached = riotRegion;

        resolve(regionCached);
      })
      .catch(reject);
  });
}
