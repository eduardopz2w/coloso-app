import { connect } from 'react-redux';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import Immutable from 'immutable';

import { fetchProBuild } from '../modules/ProBuildActions';
import { addFavoriteBuild, removeFavoriteBuild } from '../../../modules/FavoriteProBuildsActions';
import { fetchGame } from '../modules/GameActions';
import createDenormalizeSelector from '../../../utils/createDenormalizeSelector';
import keyIn from '../../../utils/keyIn';
import ProBuildView from '../components/ProBuildView';

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getProBuildId = state => state.proBuild.get('id');
const getProBuildEntities = state => state.entities.filter(keyIn('proBuilds', 'proPlayers', 'proSummoners'));
const getGameId = state => state.game.get('id');
const getGameEntities = state => state.entities.filter(keyIn('games'));
const getFavoriteProBuildsIds = state => state.favoriteProBuilds.get('ids');

const getProBuild = createImmutableSelector(
  createDenormalizeSelector('proBuilds', getProBuildId, getProBuildEntities),
  getFavoriteProBuildsIds,
  (proBuild, favIds) => {
    const proBuildId = proBuild.get('id');

    if (favIds.includes(proBuildId)) {
      return proBuild.set('isFavorite', true);
    }

    return proBuild.set('isFavorite', false);
  },
);

const getGame = createDenormalizeSelector('games', getGameId, getGameEntities);

function mapStateToProps(state) {
  return {
    proBuild: state.proBuild.set('data', getProBuild(state)),
    game: state.game.set('data', getGame(state)),
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    fetchProBuild: () => {
      dispatch(fetchProBuild(props.buildId));
    },

    fetchGame: (id) => {
      dispatch(fetchGame(id));
    },

    addToFavorites: () => {
      dispatch(addFavoriteBuild(props.buildId));
    },

    removeFromFavorites: () => {
      dispatch(removeFavoriteBuild(props.buildId));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProBuildView);
