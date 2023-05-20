import { StyleSheet } from 'react-native';
import { colors } from './colors';

const DEFAULTS = {
    FONT_SIZE_TINY: 12,
    FONT_SIZE_SMALL: 14,
    FONT_SIZE_REGULAR: 20,
    FONT_SIZE_MEDIUM: 24,
    FONT_SIZE_LARGE: 40,
    SPACING: 24,
};

const commonStyles = StyleSheet.create({
    margin: {
      margin: DEFAULTS.SPACING,
    },
    marginB: {
      marginBottom: DEFAULTS.SPACING,
    },
    marginH: {
      marginHorizontal: DEFAULTS.SPACING,
    },
    marginL: {
      marginLeft: DEFAULTS.SPACING,
    },
    marginR: {
      marginRight: DEFAULTS.SPACING,
    },
    marginT: {
      marginTop: DEFAULTS.SPACING,
    },
    marginV: {
      marginVertical: DEFAULTS.SPACING,
    },
    padding: {
      padding: DEFAULTS.SPACING,
    },
    paddingB: {
      paddingBottom: DEFAULTS.SPACING,
    },
    paddingH: {
      paddingHorizontal: DEFAULTS.SPACING,
    },
    paddingL: {
      paddingLeft: DEFAULTS.SPACING,
    },
    paddingR: {
      paddingRight: DEFAULTS.SPACING,
    },
    paddingT: {
      paddingTop: DEFAULTS.SPACING,
    },
    paddingV: {
      paddingVertical: DEFAULTS.SPACING,
    },
    shadow: {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
});

  export default {
    ...DEFAULTS,
    ...commonStyles,
};