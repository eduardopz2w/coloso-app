import { connect } from 'react-redux';

import { fetchProBuild } from '../modules/ProBuildActions';
import { fetchMatch } from '../modules/MatchActions';
import createDenormalizeSelector from '../../../utils/createDenormalizeSelector';
import keyIn from '../../../utils/keyIn';
import ProBuildView from '../components/ProBuildView';

const getProBuildId = state => state.proBuild.get('id');
const getProBuildEntities = state => state.entities.filter(keyIn('proBuilds', 'proPlayers', 'proSummoners'));
const getMatchId = state => state.match.get('id');
const getMatchEntities = state => state.entities.filter(keyIn('matches'));

const getProBuild = createDenormalizeSelector('proBuilds', getProBuildId, getProBuildEntities);
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProBuildView);
