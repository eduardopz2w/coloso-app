import CenaApi from '../../utils/CenaApi';

function fetchBuilds(championId, page, pageSize) {
  return {
    type: 'PROBUILDS_SEARCH_VIEW/FETCH_BUILDS',
    payload: {
      promise: CenaApi.getBuilds(championId, page, pageSize),
      data: {
        championId,
        page,
        pageSize,
      },
    },
  };
}

export default {
  fetchBuilds,
};
