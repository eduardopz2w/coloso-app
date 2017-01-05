import { createAction } from 'redux-actions';
import _ from 'lodash';

export const addEntry = createAction('SEARCH_HISTORY/ADD_ENTRY', (summonerName, region) => new Promise((resolve, reject) => {
  Storage.load({ key: 'searchHistoryEntries' })
    .then((entries) => {
      let entriesFiltered = _.filter(entries, (entry) => {
        if (entry.summonerName === summonerName && entry.region === region) {
          return false;
        }
        return true;
      });

      entriesFiltered.unshift({ summonerName, region });
      entriesFiltered = entriesFiltered.slice(0, 15);

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

export const loadEntries = createAction('SEARCH_HISTORY/LOAD_ENTRIES', () => Storage.load({ key: 'searchHistoryEntries' }));
