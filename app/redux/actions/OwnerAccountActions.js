import { createAction } from 'redux-actions';

export const loadAccount = createAction('OWNER_ACCOUNT/LOAD_ACCOUNT', () => Storage.load({ key: 'ownerAccount' }));
export const saveAccount = createAction('OWNER_ACCOUNT/SAVE_ACCOUNT', (ownerAccount) => {
  Storage.save({ key: 'ownerAccount', rawData: ownerAccount });

  return ownerAccount;
});
