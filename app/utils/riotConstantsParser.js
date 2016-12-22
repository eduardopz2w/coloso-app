// TODO: Agregar mas constantes

export default function (constant) {
  if (constant === 'RANKED_SOLO_5x5') {
    return 'Ranked Solo 5 vs 5';
  }

  if (constant === 'RANKED_TEAM_5x5') {
    return 'Ranked Team 5 vs 5';
  }

  if (constant === 'RANKED_FLEX_SR') {
    return 'Ranked Flexible';
  }

  if (constant === 'RANKED_FLEX_TT') {
    return 'Ranked Flexible';
  }

  if (constant === 'RANKED_TEAM_3x3') {
    return 'Ranked Team 3 vs 3';
  }

  if (constant === 'CLASSIC') {
    return 'Grieta del Invocador';
  }

  if (constant === 'ARAM') {
    return 'Abismo de los lamentos';
  }

  if (constant === 'TUTORIAL') {
    return 'Tutorial';
  }

  if (constant === 'ONEFORALL') {
    return 'Uno para todos';
  }
  if (constant === 'ASCENSION') {
    return 'Ascension';
  }

  if (constant === 'KINGPORO') {
    return 'La leyenda del rey poro';
  }

  return constant;
}
