import { connect } from 'react-redux';
import { saveAccount } from '../../../modules/OwnerAccountActions';

import ManageAccount from '../components/ManageAccount';

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
)(ManageAccount);
