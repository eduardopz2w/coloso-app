import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import DeviceInfo from 'react-native-device-info';
import Config from 'react-native-config';

const TRACK_ID = Config.GOOGLE_ANALYTICS_ID;

export const gaTracker = new GoogleAnalyticsTracker(TRACK_ID);
gaTracker.setUser(DeviceInfo.getUniqueID());

export const tracker = {
  trackScreenView(screenName) {
    if (!__DEV__) {
      gaTracker.trackScreenView(screenName);
    } else {
      console.info(`Tracking Screen: ${screenName}`);
    }
  },

  trackEvent(category, action, optionalValues) {
    if (!__DEV__) {
      gaTracker.trackEvent(category, action, optionalValues);
    } else {
      console.info(`Tracking Event categoery: ${category}, action: ${action}`);
    }
  },
};
