export default function (mapId) {
  if (mapId === 1 || mapId === 2 || mapId === 11) {
    return 'Grieta del invocador';
  } if (mapId === 4 || mapId === 10) {
    return 'Bosque retorcido';
  } if (mapId === 8) {
    return 'Cicatríz de cristal';
  } if (mapId === 3 || mapId === 12 || mapId === 14) {
    return 'Abismo de los lamentos';
  }

  return mapId;
}
