import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

const StorageInstance = new Storage({
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});

export default StorageInstance;
