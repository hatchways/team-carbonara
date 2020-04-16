import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { theme } from './themes/theme';
import Form from './components/Form/Form';
import OnBoarding from './pages/OnBoarding';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Calendar from './pages/Calendar/Calendar';
import Confirm from './components/NewAppointment/Confirm';

const stylesApp = (theme) => ({
  appName: {
    margin: '5rem 0 3rem 0',
    color: '#ff6d00',
    textAlign: 'center',
    '& span': {
      color: 'rgba(0, 0, 0, 0.87)',
    },
  },
});

function App({ classes }) {
  return (
    <React.Fragment>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route path="/:url/:eventDuration" component={Calendar} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <React.Fragment>
              <h1 id="appName" className={classes.appName}>
                calend
                <span>app</span>
              </h1>
              <Switch>
                <Redirect exact from="/" to="/login" />
                <Route path="/login">
                  <Form type="login" />
                </Route>
                <Route path="/signup">
                  <Form type="signup" />
                </Route>
                <PrivateRoute path="/profile_settings" type="profile" activeStep={0} component={OnBoarding} />
                <PrivateRoute path="/confirm" type="confirm" activeStep={50} component={OnBoarding} />
                <PrivateRoute path="/availability" type="availability" activeStep={100} component={OnBoarding} />
              </Switch>
            </React.Fragment>
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default withStyles(stylesApp)(App);
