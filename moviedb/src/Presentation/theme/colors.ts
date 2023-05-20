const colors = {
  black: '#000000',
  blueGreen: '#69ADA3',
  darkerBlue: '#03141F',
  darkBlue: '#152834',
  darkerGray: '#43515F',
  darkGray: '#566472',
  lightBlue: '#152834',
  lightGray: '#8E8E8E',
  mediumGray: '#9EADBC',
  orange: '#FF8C1A',
  red: '#FF3748',
  transparent: 'transparent',
  white: '#FFFFFF',
  yellowishGreen: '#CCDE24',
  backgroundGradient: '#1E1E1E'
};

const colorPallete = {
  primary: colors.backgroundGradient,
  secondary: colors.lightBlue,
  tertiary: colors.darkerGray,
  textPrimary: colors.white,
  textSecondary: colors.darkerBlue,
  textTertiary: colors.mediumGray,
  accentPrimary: colors.yellowishGreen,
  accentSecondary: colors.blueGreen,
  error: colors.red,
  warning: colors.orange,
};

export { colors, colorPallete };
