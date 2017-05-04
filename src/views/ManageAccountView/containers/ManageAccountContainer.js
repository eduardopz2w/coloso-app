import { connect } from 'react-redux';
import { fetchAccount } from '../../../modules/ManageAccountActions';

import ManageAccountView from '../components/ManageAccountView';

function mapStateToProps(state) {
  return {
    fetching: state.manageAccount.get('fetching'),
    fetched: state.manageAccount.get('fetched'),
    fetchError: state.manageAccount.get('fetchError'),
    errorMessage: state.manageAccount.get('errorMessage'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAccount: (params) => {
      dispatch(fetchAccount(params));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageAccountView);
