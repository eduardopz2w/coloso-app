import { connect } from 'react-redux';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import Immutable from 'immutable';

import ProBuildsList from '../components/ProBuildsList';
import denormalize from '../../../utils/denormalize';
import { fetchBuilds, refreshBuilds } from '../modules/ProBuildsListActions';
import { fetchProPlayers } from '../../../modules/ProPlayersActions';

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getProBuildsIds = state => state.proBuildsList.get('proBuildsIds');
const getProPlayersIds = state => state.proPlayers.get('proPlayersIds');
const getProBuildsEntities = state => state.entities.filter((value, key) => {
  const filterKeys = ['proBuilds', 'proPlayers', 'proSummoners'];

  return filterKeys.indexOf(key) >= 0;
});

const getProPlayersEntities = state => state.entities.filter((value, key) => {
  const filterKeys = ['proPlayers'];

  return filterKeys.indexOf(key) >= 0;
});

const getProBuildsList = createImmutableSelector(
  [getProBuildsIds, getProBuildsEntities],
  (proBuildsIds, entities) => proBuildsIds.map(proBuildId => denormalize(proBuildId, 'proBuilds', entities)),
);

const getProPlayersList = createImmutableSelector(
  [getProPlayersIds, getProPlayersEntities],
  (proPlayersIds, entities) => proPlayersIds.map(proPlayerId => denormalize(proPlayerId, 'proPlayers', entities)),
);

function mapStateToProps(state) {
  let proBuilds = state.proBuildsList;
  let proPlayers = state.proPlayers;

  proBuilds = proBuilds.set('proBuildsList', getProBuildsList(state));
  proPlayers = proPlayers.set('proPlayersList', getProPlayersList(state));

  return {
    proBuilds,
    proPlayers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBuilds: (queryParams, pageNumber) => {
      dispatch(fetchBuilds(queryParams, pageNumber));
    },
    refreshBuilds: (queryParams) => {
      dispatch(refreshBuilds(queryParams));
    },
    fetchProPlayers: () => {
      dispatch(fetchProPlayers());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProBuildsList);
