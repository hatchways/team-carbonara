import { createMuiTheme } from '@material-ui/core';
import { orange, deepPurple } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    },
    // body1: {
    //   //modifies some component typography
    //   fontSize: '0.7rem',
    // },
    subtitle1: {
      fontWeight: 'bold',
    },
  },
  palette: {
    primary: { main: orange.A700, light: orange[400] },
    secondary: { main: '#d8e2f2', light: '#ebf2ff' },
    purple: { main: deepPurple.A200 },
  },
});
