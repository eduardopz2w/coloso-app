import { connect } from 'react-redux';

import { fetchProBuild } from '../modules/ProBuildActions';
import { fetchMatch } from '../modules/MatchActions';
import createSelector from '../../../utils/createSelector';
import keyIn from '../../../utils/keyIn';
import ProBuildView from '../components/ProBuildView';

const getProBuildState = state => state.proBuild;
const getProBuildEntities = state => state.entities.filter(keyIn('proBuilds', 'proPlayers', 'proSummoners'));
const getMatchState = state => state.match;
const getMatchEntities = state => state.entities.filter(keyIn('matches'));

const getProBuild = createSelector('proBuilds', getProBuildState, getProBuildEntities);
const getMatch = createSelector('matches', getMatchState, getMatchEntities);

function mapStateToProps(state) {
  return {
    proBuild: getProBuild(state),
    match: getMatch(state),
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProBuildView);
