import _ from 'lodash';

function addEntry(summonerName, region) {
  return (dispatch) => {
    storage.load({ key: 'searchHistoryEntries' })
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

        return storage.save({ key: 'searchHistoryEntries', rawData: { entries: entriesFiltered } });
      });
  };
}

function loadEntries() {
  return (dispatch) => {
    storage.load({ key: 'searchHistoryEntries' })
      .then(({ entries }) => {
        dispatch({
          type: 'SEARCH_HISTORY/UPDATE_ENTRIES',
          payload: { entries },
        });
      })
      .catch(() => {
        // TODO: Mejorar la iniciacion del storage
        // Si esta vacio creamos el storage
        storage.save({ key: 'searchHistoryEntries', rawData: { entries: [] } });
      });
  };
}

export default {
  addEntry,
  loadEntries,
};
