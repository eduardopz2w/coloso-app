// TODO: Agregar todas las regiones

function regionHumanize(region) {
  if (region === 'na') {
    return 'Norte America';
  } else if (region === 'lan') {
    return 'Latinoamerica Norte';
  } else if (region === 'las') {
    return 'Latinoamerica Sur';
  } else if (region === 'br') {
    return 'Brasil';
  }

  return region;
}

export default regionHumanize;
