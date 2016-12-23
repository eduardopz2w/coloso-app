import _ from 'lodash';

const regions = [
  { shortName: 'na', longName: 'Norteamérica' },
  { shortName: 'lan', longName: 'Latinoamérica Norte' },
  { shortName: 'las', longName: 'Latinoamérica Sur' },
  { shortName: 'oce', longName: 'Oceanía' },
  { shortName: 'eune', longName: 'Europa Nórdica y Este' },
  { shortName: 'eunw', longName: 'Europa Oeste' },
  { shortName: 'jp', longName: 'Japón' },
  { shortName: 'kr', longName: 'Corea' },
  { shortName: 'tr', longName: 'Turquía' },
  { shortName: 'ru', longName: 'Rusia' },
  { shortName: 'br', longName: 'Brasil' },
];

function regionHumanize(shortName) {
  const regionFound = _.find(regions, { shortName });

  if (regionFound) {
    return regionFound.longName;
  }

  return shortName;
}

export default regionHumanize;
