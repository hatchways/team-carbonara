import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import { theme } from './themes/theme';
import ProfileSetup from './pages/ProfileSetup';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <h1>Calendapp</h1>
      <BrowserRouter>
        <Route path="/profile_settings" component={ProfileSetup} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
