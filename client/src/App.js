import React from 'react';
import { MuiThemeProvider, CssBaseline, Container } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import { theme } from './themes/theme';
import OnBoarding from './pages/onBoarding/onBoarding';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Container>
          <h1>Calendapp</h1>
          <Route path="/onboarding" component={OnBoarding} />
        </Container>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
