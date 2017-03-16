import { connect } from 'react-redux';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import Immutable from 'immutable';

import ProBuildsList from '../components/ProBuildsList';
import denormalize from '../../../utils/denormalize';
import { fetchBuilds, refreshBuilds } from '../../../modules/ProBuildsActions';
import { fetchFavoriteBuilds, addFavoriteBuild, removeFavoriteBuild, setFavoriteBuildsFilters } from '../modules/FavoriteProBuildsActions';
import { fetchProPlayers } from '../../../modules/ProPlayersActions';

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getProBuildsIds = state => state.proBuilds.get('ids');
const getFavoriteProBuildsIds = state => state.favoriteProBuilds.get('ids');
const getFavoriteBuildsFilters = state => ({
  championSelected: state.favoriteProBuilds.get('championSelected'),
  proPlayerSelected: state.favoriteProBuilds.get('proPlayerSelected'),
});
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
  [getProBuildsIds, getProBuildsEntities, getFavoriteProBuildsIds],
  (ids, entities, favoriteIdsList) => ids.map((id) => {
    const build = denormalize(id, 'proBuilds', entities);

    if (favoriteIdsList.includes(id)) {
      return build.set('isFavorite', true);
    }

    return build.set('isFavorite', false);
  }),
);

const getFavoriteProBuildsList = createImmutableSelector(
  [getFavoriteProBuildsIds, getProBuildsEntities, getFavoriteBuildsFilters],
  (ids, entities, { championSelected, proPlayerSelected }) => {
    const builds = ids.map((id) => {
      const build = denormalize(id, 'proBuilds', entities);

      return build.set('isFavorite', true);
    });

    return builds.filter((proBuild) => {
      if (championSelected && proBuild.get('championId') !== championSelected) {
        return false;
      }

      if (proPlayerSelected && proBuild.getIn(['proSummoner', 'proPlayer', 'id']) !== proPlayerSelected) {
        return false;
      }

      return true;
    });
  },
);

const getProPlayersList = createImmutableSelector(
  [getProPlayersIds, getProPlayersEntities],
  (proPlayersIds, entities) => proPlayersIds.map(proPlayerId => denormalize(proPlayerId, 'proPlayers', entities)),
);

function mapStateToProps(state) {
  let proBuilds = state.proBuilds;
  let proPlayers = state.proPlayers;
  let favoriteProBuilds = state.favoriteProBuilds;

  proBuilds = proBuilds.set('builds', getProBuildsList(state));
  proPlayers = proPlayers.set('proPlayersList', getProPlayersList(state));
  favoriteProBuilds = favoriteProBuilds.set('builds', getFavoriteProBuildsList(state));

  return {
    proBuilds,
    proPlayers,
    favoriteProBuilds,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBuilds: (queryParams, pageNumber) => {
      dispatch(fetchBuilds(queryParams, pageNumber));
    },
    fetchFavoriteBuilds: () => {
      dispatch(fetchFavoriteBuilds());
    },
    refreshBuilds: (queryParams) => {
      dispatch(refreshBuilds(queryParams));
    },
    fetchProPlayers: () => {
      dispatch(fetchProPlayers());
    },
    addFavoriteBuild: (id) => {
      dispatch(addFavoriteBuild(id));
    },
    removeFavoriteBuild: (id) => {
      dispatch(removeFavoriteBuild(id));
    },
    setFavoriteBuildsFilters: (filters) => {
      dispatch(setFavoriteBuildsFilters(filters));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProBuildsList);
