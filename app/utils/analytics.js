import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

const TRACK_ID = 'UA-59658116-4';

export const gaTracker = new GoogleAnalyticsTracker(TRACK_ID);

export const tracker = {
  trackScreenView(screenName) {
    if (!__DEV__) {
      gaTracker.trackScreenView(screenName);
    } else {
      console.log(`Tracking Screen: ${screenName}`);
    }
  },

  trackEvent(category, action, optionalValues) {
    if (!__DEV__) {
      gaTracker.trackEvent(category, action, optionalValues);
    } else {
      console.log(`Tracking Event categoery: ${category}, action: ${action}`);
    }
  },
};
