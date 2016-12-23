function addEntry(summonerName, region) {
  return {
    type: 'SEARCH_HISTORY/ADD_ENTRY',
    payload: { summonerName, region },
  };
}

function loadEntries() {
  return {
    type: 'SEARCH_HISTORY/LOAD_ENTRIES',
  };
}

export default {
  addEntry,
  loadEntries,
};
