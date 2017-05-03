import { createAction } from 'redux-actions';
import logger from '../utils/logger';
import Storage from '../utils/Storage';
import { tracker } from '../utils/analytics';

const STORAGE_KEY = 'riotAccount';

export const loadAccount = createAction('MANAGE_ACCOUNT/LOAD_ACCOUNT', () => new Promise((resolve) => {
  Storage.load({ key: STORAGE_KEY })
    .then(resolve)
    .catch(() => {
      logger.debug('Can not load RiotAccount from storeage');
    });
}));

export const saveAccount = createAction('MANAGE_ACCOUNT/SAVE_ACCOUNT', (riotAccount) => {
  tracker.trackEvent('ManageAccounts', 'ADD_ACCOUNT', { label: `summonerId: ${riotAccount.id}` });
  Storage.save({ key: STORAGE_KEY, rawData: riotAccount });

  return riotAccount;
});
