import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';


const StorageInstance = new Storage({
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});

StorageInstance.load({ key: 'searchHistoryEntries' })
  .then()
  .catch(() => {
    StorageInstance.save({ key: 'searchHistoryEntries', rawData: { entries: [] } });
  });

export default StorageInstance;
