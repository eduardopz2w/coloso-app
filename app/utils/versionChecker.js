import semver from 'semver';
import DeviceInfo from 'react-native-device-info';
import ColosoApi from './ColosoApi';

const APP_VERSION = DeviceInfo.getVersion();

export default function () {
  return new Promise((resolve) => {
    ColosoApi.getAndroidStatus()
      .then(({ data }) => {
        const apkVersions = data.apkVersions;

        if (semver.satisfies(APP_VERSION, apkVersions.actual)) {
          resolve({ state: 'UPDATED' });
        } else if (semver.lt(APP_VERSION, apkVersions.min)) {
          resolve({ state: 'UPDATE_REQUIRED' });
        } else {
          resolve({ state: 'UPDATE_AVAILABLE' });
        }
      })
      .catch(() => {
        resolve({ state: 'UPDATED' });
      });
  });
}

