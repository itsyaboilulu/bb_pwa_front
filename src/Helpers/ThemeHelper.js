import { ThemeProvider as ThemeProviderMui, createTheme } from "@mui/material/styles";

import { theme as themeColors } from 'Helpers/ColorHelper'

// theme constant
export const gridSpacing = 3;
export const drawerWidth = 260;
export const appDrawerWidth = 320;

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: themeColors.primary,
    },
    secondary: {
      main: themeColors.secondary,
    },
    warning: {
      main: themeColors.warning,
    },
    error: {
        main: themeColors.error,
    },
    success: {
        main: themeColors.success,
    }
  },
  typography: {
    fontSize: 16,
  },
});

export const ThemeProvider = (props) => 
    <ThemeProviderMui theme={theme}>
        {props.children}
    </ThemeProviderMui>


