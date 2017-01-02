import CenaApi from '../../utils/CenaApi';

function fetchBuilds(championId) {
  return {
    type: 'PROBUILDS_SEARCH_VIEW/FETCH_BUILDS',
    payload: CenaApi.getBuilds(championId),
  };
}

export default {
  fetchBuilds,
};
