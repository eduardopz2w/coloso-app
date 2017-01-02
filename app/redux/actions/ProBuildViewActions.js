import CenaApi from '../../utils/CenaApi';

function fetchBuild(buildId) {
  return {
    type: 'PROBUILD_VIEW/FETCH_BUILD',
    payload: CenaApi.getBuild(buildId),
  };
}

export default {
  fetchBuild,
};
