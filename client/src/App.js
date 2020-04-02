import React from 'react';
import { MuiThemeProvider, CssBaseline, Container } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import { theme } from './themes/theme';
import OnBoarding from './pages/onBoarding/onBoarding';

import ProfileSetup from './pages/onBoarding/ProfileSetup';
import ConnectedPage from './pages/onBoarding/ConnectedPage';
import AvailabilitySetup from './pages/onBoarding/AvailabilitySetup';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Container>
          <h1>Calendapp</h1>
          <Route path="/onboarding" component={OnBoarding} />

          <Route path="/profile_settings" component={ProfileSetup} />
          <Route path="/connected" component={ConnectedPage} />
          <Route path="/avail_settings" component={AvailabilitySetup} />
        </Container>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
