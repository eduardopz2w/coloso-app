import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';


const StorageInstance = new Storage({
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});

function resetStorage(newVersion) {
  AsyncStorage.clear()
    .then(() => {
      StorageInstance.save({ key: 'storageMeta', rawData: { version: newVersion } });
    });
}

StorageInstance.load({ key: 'storageMeta' })
  .then((meta) => {
    console.info(`Storage loaded version: ${meta.version}`);
  })
  .catch((e) => {
    if (e.name === 'NotFoundError') {
      resetStorage(1);
    }
  });

export default StorageInstance;
