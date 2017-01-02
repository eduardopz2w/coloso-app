import CenaApi from '../../utils/CenaApi';

function fetchBuilds(championId, page, pageSize) {
  return {
    type: 'GAME_CURRENT_VIEW/FETCH_BUILDS',
    payload: {
      promise: CenaApi.getBuilds(championId, page, pageSize),
      data: {
        page,
        pageSize,
      },
    },
  };
}

export default {
  fetchBuilds,
};
