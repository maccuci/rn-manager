import { createTheme } from '@shopify/restyle';
import { StatusBarStyle } from 'react-native';
import light, { Theme } from './light';

const nordPalette = {
  nord0: '#2e3440',
  nord1: '#3b4252',
  nord2: '#434c5e',
  nord3: '#4c566a',
  nord4: '#d8dee9',
  nord5: '#e5e9f0',
  nord6: '#eceff4',
  nord7: '#8fbcbb',
  nord8: '#88c0d0',
  nord9: '#81a1c1',
  nord10: '#5e81ac',
  nord11: '#bf616a',
  nord12: '#d08770',
  nord13: '#ebcb8b',
  nord14: '#a3be8c',
  nord15: '#b48ead',
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
    $primary: nordPalette.nord10,
    $secondary: nordPalette.nord9,
    $windowBackground: nordPalette.nord0,
    $background: nordPalette.nord1,
    $foreground: nordPalette.nord1,
    $separator: nordPalette.nord3,
    $navbarBackground: nordPalette.nord2,
    $navbarBorderBottom: nordPalette.nord0,
    $headerBarBackground: nordPalette.nord2,
    $sidebarBackground: nordPalette.nord1,
    $sidebarForeground: nordPalette.nord4,
    $sidebarSeparator: `${nordPalette.nord4}20`,
    $fieldInputBackground: nordPalette.nord6,
    $fieldInputPlaceholderTextColor: nordPalette.nord5,
    red: nordPalette.nord11,
    yellow: nordPalette.nord13,
    green: nordPalette.nord14,
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
