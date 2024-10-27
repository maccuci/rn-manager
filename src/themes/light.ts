import { createTheme } from '@shopify/restyle';
import { StatusBarStyle } from 'react-native';

const palette = {
  white: '#ffffff',
  black: '#000000',
  red: '#ff0000',
  blue: '#0000ff',
  yellow: '#ffff00',
  paper00: '#ffffff',
  paper10: '#f5f5f4',
  paper20: '#e6e6e6',
  paper100: '#aeaeae',
  paper300: '#767577',
  paper900: '#202020',
  blue70: '#2185d0',
  navy20: '#171a21',
  navy900: '#b9babc',
  primary1: "#4A90E2", // Azul profissional
  secondary1: "#67B8CB", // Azul claro
  accent1: "#F8F9FA", // Cinza claro
  text1: "#2C3E50", // Azul escuro
  background1: "#FFFFFF",
  success1: "#2ECC71",
  warning1: "#F1C40F",
  error1: "#E74C3C",
};

const theme = createTheme({
  spacing: {
    '0': 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 48,
    hg: 128,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  colors: {
    white: palette.white,
    black: palette.black,
    red: palette.red,
    blue: palette.blue,
    yellow: palette.yellow,

    $primary: palette.blue70,
    $secondary: palette.navy20,
    $windowBackground: '#f0f0f0',
    $background: palette.paper10,
    $foreground: palette.paper900,
    $navbarBackground: palette.paper10,
    $navbarBorderBottom: palette.paper100,
    $sidebarBackground: palette.navy20,
    $sidebarForeground: palette.navy900,
    $sidebarSeparator: `${palette.paper00}20`,
    $headerBarBackground: palette.paper20,
    $fieldInputBackground: palette.paper00,
    $fieldInputPlaceholderTextColor: palette.paper300,

    primary: palette.primary1, // Azul profissional
    secondary: palette.secondary1, // Azul claro
    accent: palette.accent1, // Cinza claro
    text: palette.text1, // Azul escuro
    background: palette.background1,
    success: palette.success1,
    warning: palette.warning1,
    error: palette.error1,
  },
  borderRadii: {
    xs: 4,
    sm: 16,
    md: 24,
    lg: 64,
    hg: 128,
  },
  statusBar: {
    barStyle: 'dark-content' as StatusBarStyle,
  },
  textVariants: {
    defaults: {
      color: '$foreground',
      fontSize: 16,
    },
    sidebar: {
      color: '$sidebarForeground',
      fontSize: 14,
    },
    navbar: {
      fontSize: 20,
      color: '$foreground',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '$primary',
    },
    body: {
      fontSize: 16,
      color: '$foreground',
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
  cardVariants: {
    defaults: {
      backgroundColor: '$fieldInputBackground',
      padding: 'md',
      borderRadius: 'xs',
    },
    outlined: {
      backgroundColor: '$fieldInputBackground',
      padding: 'md',
      borderRadius: 'xs',
      borderWidth: 1,
      borderColor: '$navbarBorderBottom',
    },
    elevated: {
      backgroundColor: '$fieldInputBackground',
      padding: 'md',
      borderRadius: 'xs',
      shadowColor: '$foreground',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    sidebar: {
      backgroundColor: '$sidebarBackground',
      padding: 'md',
      borderRadius: 'xs',
    },
  },
});

export default theme;

export type Theme = typeof theme;
