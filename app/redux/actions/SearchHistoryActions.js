import _ from 'lodash';

function addEntry(summonerName, region) {
  return (dispatch) => {
    Storage.load({ key: 'searchHistoryEntries' })
      .then(({ entries }) => {
        // Filtramos en caso de duplicado
        let entriesFiltered = _.filter(entries, (entry) => {
          if (entry.summonerName === summonerName && entry.region === region) {
            return false;
          }

          return true;
        });
        entriesFiltered.unshift({ summonerName, region });
        entriesFiltered = entriesFiltered.slice(0, 15);

        dispatch({
          type: 'SEARCH_HISTORY/UPDATE_ENTRIES',
          payload: { entries: entriesFiltered },
        });

        return Storage.save({ key: 'searchHistoryEntries', rawData: { entries: entriesFiltered } });
      });
  };
}

function loadEntries() {
  return (dispatch) => {
    Storage.load({ key: 'searchHistoryEntries' })
      .then(({ entries }) => {
        dispatch({
          type: 'SEARCH_HISTORY/UPDATE_ENTRIES',
          payload: { entries },
        });
      });
  };
}

export default {
  addEntry,
  loadEntries,
};
