// TODO: Agregar mas constantes

export default function (constant) {
  if (constant === 'RANKED_SOLO_5x5') {
    return 'Ranked Solo 5 vs 5';
  }

  if (constant === 'RANKED_TEAM_5x5') {
    return 'Ranked Team 5 vs 5';
  }

  return constant;
}
