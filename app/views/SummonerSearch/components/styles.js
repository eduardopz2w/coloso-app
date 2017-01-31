import { MediaQueryStyleSheet } from 'react-native-responsive';
import colors from '../../../utils/colors';

export default MediaQueryStyleSheet.create(
  {
    root: {
      flex: 1,
      position: 'relative',
    },

    wrapper: {
      flex: 1,
      justifyContent: 'space-around',
      paddingHorizontal: 16,
    },

    scrollView: {
      flex: 1,
      maxHeight: 300,
    },

    container: {
      flex: 1,
      justifyContent: 'space-around',
    },

    label: {
      fontWeight: 'bold',
      fontSize: 16,
    },

    paperBox: {
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 5,
      marginBottom: 25,
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
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
    },

    searchButtonText: {
      color: 'white',
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
  },
  {
    '@media (min-device-width: 600)': {
      wrapper: {
        paddingHorizontal: 40,
      },
      formGroup: {
        marginBottom: 16,
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
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
      },
    },
  },
);
