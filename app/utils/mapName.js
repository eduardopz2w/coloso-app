export default function (mapId) {
  if (mapId === 1 || mapId === 2 || mapId === 11) {
    return 'Grieta del Invocador';
  } if (mapId === 4 || mapId === 10) {
    return 'Bosque Retorcido';
  } if (mapId === 8) {
    return 'Cicatríz de cristal';
  } if (mapId === 3 || mapId === 12 || mapId === 14) {
    return 'Abismo de los Lamentos';
  }

  return mapId;
}
