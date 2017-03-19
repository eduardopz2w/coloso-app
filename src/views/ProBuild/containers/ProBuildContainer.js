import { connect } from 'react-redux';
import { fetchProBuild } from '../modules/ProBuildActions';
import { fetchMatch } from '../modules/MatchActions';
import denormalize from '../../../utils/denormalize';

import ProBuild from '../components/ProBuild';

function mapStateToProps(state) {
  let proBuild = state.proBuild;
  let match = state.match;

  if (proBuild.get('fetched')) {
    proBuild = proBuild.set('data', denormalize(state.proBuild.get('id'), 'proBuilds', state.entities));

    if (match.get('fetched')) {
      match = match.set('data', denormalize(state.match.get('urid'), 'matches', state.entities));
    }
  }

  return {
    proBuild,
    match,
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
)(ProBuild);
