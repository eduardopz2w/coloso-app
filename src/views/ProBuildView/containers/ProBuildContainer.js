import { connect } from 'react-redux';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import Immutable from 'immutable';

import { fetchProBuild } from '../modules/ProBuildActions';
import { addFavoriteBuild, removeFavoriteBuild } from '../../../modules/FavoriteProBuildsActions';
import { fetchMatch } from '../modules/MatchActions';
import createDenormalizeSelector from '../../../utils/createDenormalizeSelector';
import keyIn from '../../../utils/keyIn';
import ProBuildView from '../components/ProBuildView';

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getProBuildId = state => state.proBuild.get('id');
const getProBuildEntities = state => state.entities.filter(keyIn('proBuilds', 'proPlayers', 'proSummoners'));
const getMatchId = state => state.match.get('id');
const getMatchEntities = state => state.entities.filter(keyIn('matches'));
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

const getMatch = createDenormalizeSelector('matches', getMatchId, getMatchEntities);

function mapStateToProps(state) {
  return {
    proBuild: state.proBuild.set('data', getProBuild(state)),
    match: state.match.set('data', getMatch(state)),
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    fetchProBuild: () => {
      dispatch(fetchProBuild(props.buildId));
    },

    fetchMatch: (urid) => {
      dispatch(fetchMatch(urid));
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
