export default function (gameMode) {
  if (gameMode === 'CLASSIC') {
    return 'Grieta del Invocador';
  }

  if (gameMode === 'ARAM') {
    return 'Abismo de los lamentos';
  }

  if (gameMode === 'TUTORIAL') {
    return 'Tutorial';
  }

  if (gameMode === 'ONEFORALL') {
    return 'Uno para todos';
  }
  if (gameMode === 'ASCENSION') {
    return 'Ascensión';
  }

  if (gameMode === 'KINGPORO') {
    return 'La leyenda del rey poro';
  }

  if (gameMode === 'ODIN') {
    return 'Dominion';
  }

  if (gameMode === 'FIRSTBLOOD') {
    return 'Primera sangre';
  }

  if (gameMode === 'SIEGE') {
    return 'Asedio del nexo';
  }

  return gameMode;
}
