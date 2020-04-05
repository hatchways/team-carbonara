import { createMuiTheme } from '@material-ui/core';
import { orange, lightGreen, deepPurple } from '@material-ui/core/colors';

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
  },
  palette: {
    primary: { main: orange.A700, light: orange[400] },
    green: { main: lightGreen[700] },
    purple: { main: deepPurple.A200 },
  },
});
