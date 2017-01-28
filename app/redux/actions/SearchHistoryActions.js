import { createAction } from 'redux-actions';
import _ from 'lodash';
import logger from '../../utils/logger';

export const addEntry = createAction('SEARCH_HISTORY/ADD_ENTRY', (summonerName, region) => new Promise((resolve, reject) => {
  Storage.load({ key: 'searchHistoryEntries' })
    .then((entries) => {
      const duplicateIndex = _.findIndex(entries, (entry) => {
        if (entry.summonerName.toLowerCase() === summonerName.toLowerCase() &&
            entry.region.toLowerCase() === region.toLowerCase()
        ) {
          return true;
        }
        return false;
      });

      if (duplicateIndex === -1) {
        entries.unshift({ summonerName, region });
      }

      Storage.save({ key: 'searchHistoryEntries', rawData: entries.slice(0, 20) })
        .then(resolve({ entries }))
        .catch(reject);
    })
    .catch(() => {
      const entries = [{ summonerName, region }];
      Storage.save({ key: 'searchHistoryEntries', rawData: entries })
        .then(() => resolve({ entries }))
        .catch(reject);
    });
}));

export const deleteEntry = createAction('SEARCH_HISTORY/DELETE_ENTRY', (summonerName, region) => new Promise((resolve, reject) => {
  Storage.load({ key: 'searchHistoryEntries' })
    .then((entries) => {
      const entriesFiltered = _.filter(entries, (entry) => {
        if (entry.summonerName === summonerName && entry.region === region) {
          return false;
        }
        return true;
      });

      Storage.save({ key: 'searchHistoryEntries', rawData: entriesFiltered })
        .then(resolve({ entries: entriesFiltered }))
        .catch(reject);
    })
    .catch(() => {
      const entries = [{ summonerName, region }];
      Storage.save({ key: 'searchHistoryEntries', rawData: entries })
        .then(() => resolve({ entries }))
        .catch(reject);
    });
}));

export const loadEntries = createAction('SEARCH_HISTORY/LOAD_ENTRIES', () => new Promise((resolve) => {
  Storage.load({ key: 'searchHistoryEntries' })
    .then(resolve)
    .catch(() => {
      logger.debug('Can not load searchHistoryEntries from storage');
    });
}));
