import { connect } from 'react-redux';
import { saveAccount } from '../../../modules/OwnerAccountActions';

import ManageAccountView from '../components/ManageAccountView';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    saveAccount: (ownerAccount) => {
      dispatch(saveAccount(ownerAccount));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageAccountView);
