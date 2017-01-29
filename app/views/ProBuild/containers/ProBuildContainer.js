import { connect } from 'react-redux';
import { fetchProBuild } from '../modules/ProBuildActions';
import denormalize from '../../../utils/denormalize';

import ProBuild from '../components/ProBuild';

// TODO: Add reselect

function mapStateToProps(state) {
  const fetched = state.proBuild.get('fetched');
  let proBuildData;

  if (fetched) {
    proBuildData = denormalize(state.proBuild.get('proBuildId'), 'proBuilds', state.entities);
  }

  return {
    proBuildData,
    fetched,
    isFetching: state.proBuild.get('isFetching'),
    errorMessage: state.proBuild.get('errorMessage'),
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    fetchProBuild: () => {
      dispatch(fetchProBuild(props.buildId));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProBuild);
