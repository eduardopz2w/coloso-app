import { connect } from 'react-redux';
import { saveAccount } from '../../../modules/ManageAccountActions';

import ManageAccountView from '../components/ManageAccountView';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    saveAccount: (riotAccount) => {
      dispatch(saveAccount(riotAccount));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageAccountView);
