function loadAccount() {
  return {
    type: 'OWNER_ACCOUNT/LOAD_ACCOUNT',
    payload: Storage.load({ key: 'ownerAccount' }),
  };
}

function saveAccount(ownerAccount) {
  Storage.save({ key: 'ownerAccount', rawData: ownerAccount });

  return {
    type: 'OWNER_ACCOUNT/SAVE_ACCOUNT',
    payload: ownerAccount,
  };
}

export default {
  loadAccount,
  saveAccount,
};
