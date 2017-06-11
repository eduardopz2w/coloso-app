import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import ContributorsView from '../components/ContributorsView';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    goBack: () => {
      dispatch(NavigationActions.back());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContributorsView);
