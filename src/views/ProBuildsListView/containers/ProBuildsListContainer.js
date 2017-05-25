import { connect } from 'react-redux';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import Immutable from 'immutable';
import { NavigationActions } from 'react-navigation';

import { keyIn, createDenormalizeSelector } from 'utils';
import ProBuildsListView from '../components/ProBuildsListView';
import { fetchBuilds, refreshBuilds } from '../../../modules/ProBuildsActions';
import { fetchFavoriteBuilds, addFavoriteBuild, removeFavoriteBuild, setFavoriteBuildsFilters } from '../../../modules/FavoriteProBuildsActions';
import { fetchProPlayers } from '../../../modules/ProPlayersActions';

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getProBuildsIds = state => state.proBuilds.get('ids');
const getProBuildsEntities = state => state.entities.filter(keyIn('proBuilds', 'proPlayers', 'proSummoners'));
const getProPlayersIds = state => state.proPlayers.get('ids');
const getProPlayersEntities = state => state.entities.filter(keyIn('proPlayers', 'proSummoners'));
const getFavoriteProBuildsIds = state => state.favoriteProBuilds.get('ids');
const getFavoriteBuildsFilters = state => ({
  championId: state.favoriteProBuilds.getIn(['filters', 'championId']),
  proPlayerId: state.favoriteProBuilds.getIn(['filters', 'proPlayerId']),
});

const proBuildsSelector = createDenormalizeSelector('proBuilds', getProBuildsIds, getProBuildsEntities);
const favoriteProBuildsSelector = createDenormalizeSelector('proBuilds', getFavoriteProBuildsIds, getProBuildsEntities);

const getProBuilds = createImmutableSelector(
  proBuildsSelector,
  getFavoriteProBuildsIds,
  (proBuildsList, favoriteIdsList) => proBuildsList.map((proBuildMap) => {
    const id = proBuildMap.get('id');

    if (favoriteIdsList.includes(id)) {
      return proBuildMap.set('isFavorite', true);
    }

    return proBuildMap.set('isFavorite', false);
  }),
);

const getProPlayers = createDenormalizeSelector('proPlayers', getProPlayersIds, getProPlayersEntities);

const getFavoriteProBuilds = createImmutableSelector(
  favoriteProBuildsSelector,
  getFavoriteBuildsFilters,
  (builds, { championId, proPlayerId }) => builds.filter((build) => {
    if (championId && build.get('championId') !== championId) {
      return false;
    }

    if (proPlayerId && build.getIn(['proSummoner', 'proPlayer', 'id']) !== proPlayerId) {
      return false;
    }

    return true;
  }).map(build => build.set('isFavorite', true)),
);


function mapStateToProps(state) {
  return {
    proBuilds: state.proBuilds.set('data', getProBuilds(state)),
    proPlayers: state.proPlayers.set('data', getProPlayers(state)),
    favoriteProBuilds: state.favoriteProBuilds.set('data', getFavoriteProBuilds(state)),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBuilds: (params) => {
      dispatch(fetchBuilds(params));
    },

    fetchFavoriteBuilds: () => {
      dispatch(fetchFavoriteBuilds());
    },

    refreshBuilds: (params) => {
      dispatch(refreshBuilds(params));
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

    goToSummonerProfile: (summonerId) => {
      dispatch(NavigationActions.navigate({ routeName: 'SummonerProfileView', params: { summonerId } }));
    },

    goToBuild: (buildId) => {
      dispatch(NavigationActions.navigate({ routeName: 'ProBuildView', params: { buildId } }));
    },

    openDrawer: () => {
      dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' }));
    },

    goBack: () => {
      dispatch(NavigationActions.back());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProBuildsListView);
