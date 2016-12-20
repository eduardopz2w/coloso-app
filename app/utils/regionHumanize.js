// TODO: Agregar todas las regiones

function regionHumanize(region) {
  if (region === 'na') {
    return 'Norte America';
  } else if (region === 'lan') {
    return 'Latinoamerica Norte';
  }

  return region;
}

export default regionHumanize;
