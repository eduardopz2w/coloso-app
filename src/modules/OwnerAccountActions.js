import { createAction } from 'redux-actions';
import logger from '../utils/logger';
import Storage from '../utils/Storage';
import { tracker } from '../utils/analytics';

export const loadAccount = createAction('OWNER_ACCOUNT/LOAD_ACCOUNT', () => new Promise((resolve) => {
  Storage.load({ key: 'ownerAccount' })
    .then(resolve)
    .catch(() => {
      logger.debug('Can not load ownerAccount from storeage');
    });
}));
export const saveAccount = createAction('OWNER_ACCOUNT/SAVE_ACCOUNT', (ownerAccount) => {
  tracker.trackEvent('ManageAccounts', 'ADD_ACCOUNT', { label: `urid: ${ownerAccount.summonerUrid}` });
  Storage.save({ key: 'ownerAccount', rawData: ownerAccount });

  return ownerAccount;
});
