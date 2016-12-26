import { MediaQueryStyleSheet } from 'react-native-responsive';
import colors from '../../utils/colors';

export default MediaQueryStyleSheet.create(
  {
    root: {
      flex: 1,
      position: 'relative',
      backgroundColor: colors.primary,
    },

    container: {
      padding: 16,
      flex: 1,
      justifyContent: 'space-around',
    },

    label: {
      fontWeight: 'bold',
      fontSize: 16,
    },

    formContainer: {
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 5,
    },

    formGroup: {
      marginBottom: 8,
    },

    inputName: {
      flex: 1,
      height: 47,
      marginLeft: 10,
    },

    radioGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: 120,
      height: 40,
    },

    inputRegion: {
      flex: 1,
      height: 50,
    },

    searchButton: {
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
    },

    searchButtonText: {
      color: colors.primary,
    },

    whiteText: {
      color: 'white',
      textShadowColor: '#000',
      textShadowOffset: {
        width: 0.7,
        height: 0.7,
      },
    },

    spinnerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  },
  {
    '@media (min-device-width: 600)': {
      formGroup: {
        marginBottom: 16,
      },
      container: {
        paddingLeft: 40,
        paddingRight: 40,
      },
      inputName: {
        marginLeft: 16,
      },
      inputRegion: {
        marginLeft: 8,
      },
      radioGroup: {
        flex: 1,
      },
    },
  },
);
