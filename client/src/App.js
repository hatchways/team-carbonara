import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';

<<<<<<< HEAD
import { theme } from "./themes/theme";
import ProfileSetup from "./pages/ProfileSetup";
import LandingPage from "./pages/Landing";

import "./App.css";
=======
import { theme } from './themes/theme';
>>>>>>> dev

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
<<<<<<< HEAD
        <Route path="/profile_settings" component={ProfileSetup} />
        <Route path="/" component={LandingPage} />
=======
        <h1>Calendapp</h1>
>>>>>>> dev
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
