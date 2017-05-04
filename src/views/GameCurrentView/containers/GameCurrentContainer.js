import { connect } from 'react-redux';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import Immutable from 'immutable';

import GameCurrentView from '../components/GameCurrentView';
import createDenormalizeSelector from '../../../utils/createDenormalizeSelector';
import keyIn from '../../../utils/keyIn';
import { fetchBuilds } from '../../../modules/ProBuildsActions';
import { addFavoriteBuild, removeFavoriteBuild } from '../../../modules/FavoriteProBuildsActions';
import { fetchProPlayers } from '../../../modules/ProPlayersActions';

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getProBuildsIds = state => state.proBuilds.get('ids');
const getProBuildsEntities = state => state.entities.filter(keyIn('proBuilds', 'proSummoners', 'proPlayers'));
const getProPlayersIds = state => state.proPlayers.get('ids');
const getProPlayersEntities = state => state.entities.filter(keyIn('proPlayers', 'proSummoners'));
const getGameCurrentId = state => state.gameCurrent.get('id');
const getGameCurrentEntities = state => state.entities.filter(keyIn('gamesCurrent'));
const getFavoriteProBuildsIds = state => state.favoriteProBuilds.get('ids');

const getProBuilds = createImmutableSelector(
  createDenormalizeSelector('proBuilds', getProBuildsIds, getProBuildsEntities),
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
const getGameCurrent = createDenormalizeSelector('gamesCurrent', getGameCurrentId, getGameCurrentEntities);

function mapStateToProps(state) {
  return {
    gameData: state.gameCurrent.set('data', getGameCurrent(state)),
    proBuilds: state.proBuilds.set('data', getProBuilds(state)),
    proPlayers: state.proPlayers.set('data', getProPlayers(state)),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProBuilds: (params) => {
      dispatch(fetchBuilds(params));
    },
    fetchProPlayers: () => {
      dispatch(fetchProPlayers());
    },
    addFavoriteBuild: (buildId) => {
      dispatch(addFavoriteBuild(buildId));
    },
    removeFavoriteBuild: (buildId) => {
      dispatch(removeFavoriteBuild(buildId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCurrentView);
