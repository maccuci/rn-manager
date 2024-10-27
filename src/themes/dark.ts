import { createTheme } from '@shopify/restyle';
import { StatusBarStyle } from 'react-native';
import light, { Theme } from './light';

const darkPalette = {
  slate00: '#121212',
  slate10: '#1d1f21',
  slate20: '#25272b',
  slate30: '#2d2f34',
  slate40: '#35373d',
  slate100: '#6d6e71',
  slate900: '#d1d1d4',
  blue70: '#007aff',
  navy20: '#0d1117',
  navy900: '#c9d1d9',
  red: '#ff453a',
  yellow: '#ffd60a',
  green: '#32d74b',
  primary: "#4A90E2", // Azul profissional
  secondary: "#67B8CB", // Azul claro
  accent: "#F8F9FA", // Cinza claro
  text: "#2C3E50", // Azul escuro
  background: "#FFFFFF",
  success: "#2ECC71",
  warning: "#F1C40F",
  error: "#E74C3C",
};

export const theme: Theme = createTheme({
  ...light,
  colors: {
    ...light.colors,
    $primary: darkPalette.blue70,
    $secondary: darkPalette.slate00,
    $windowBackground: darkPalette.slate10,
    $background: darkPalette.slate10,
    $foreground: darkPalette.slate900,
    $separator: darkPalette.slate100,
    $navbarBackground: darkPalette.slate20,
    $navbarBorderBottom: darkPalette.slate00,
    $headerBarBackground: darkPalette.slate30,
    $sidebarBackground: darkPalette.slate20,
    $sidebarForeground: darkPalette.slate900,
    $sidebarSeparator: `${darkPalette.slate900}20`,
    $fieldInputBackground: darkPalette.slate30,
    $fieldInputPlaceholderTextColor: darkPalette.slate100,
    red: darkPalette.red,
    yellow: darkPalette.yellow,
    green: darkPalette.green,
  },
  statusBar: {
    barStyle: 'light-content' as StatusBarStyle,
  },
  textVariants: {
    ...light.textVariants,
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '$primary',
    },
  },
  barVariants: {
    headerBar: {
      backgroundColor: '$headerBarBackground',
      borderRadius: 'md',
      paddingHorizontal: 'lg',
      paddingVertical: 'sm',
      shadowColor: '$foreground',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
  },
});

export default theme;
