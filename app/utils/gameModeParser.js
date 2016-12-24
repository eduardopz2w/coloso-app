export default function (gameMode) {
  if (gameMode === 'CLASSIC') {
    return 'Grieta del Invocador';
  }

  if (gameMode === 'ARAM') {
    return 'Abismo de los Lamentos';
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
    return 'La leyenda del Rey Poro';
  }

  if (gameMode === 'ODIN') {
    return 'Dominion';
  }

  if (gameMode === 'FIRSTBLOOD') {
    return 'Primera Sangre';
  }

  if (gameMode === 'SIEGE') {
    return 'Asedio del Nexo';
  }

  return gameMode;
}
