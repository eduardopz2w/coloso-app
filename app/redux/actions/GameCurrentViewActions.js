import CenaApi from '../../utils/CenaApi';

function fetchBuilds(championId) {
  return {
    type: 'GAME_CURRENT_VIEW/FETCH_BUILDS',
    payload: CenaApi.getBuilds(championId),
  };
}

export default {
  fetchBuilds,
};
