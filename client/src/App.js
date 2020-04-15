import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { theme } from './themes/theme';
import Form from './components/Form/Form';
import OnBoarding from './pages/OnBoarding';
import Dashboard from './pages/dashboard/dashboard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Confirm from './components/NewAppointment/Confirm';

const stylesApp = (theme) => ({
  appName: {
    margin: '5rem 0 3rem 0',
    color: '#ff6d00',
    // color: theme.palette.primary.main,
    textAlign: 'center',
    '& span': {
      color: 'rgba(0, 0, 0, 0.87)',
    },
  },
});

function App(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <main>
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
              <Route path="/confirm">
                <Confirm
                  user="Jenny"
                  meetingName="30 Minute Meeting"
                  meetTime={30}
                  apptTime="2020-05-20T14:00:00-04:00"
                />
              </Route>

              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/profile_settings" type="profile" activeStep={0} component={OnBoarding} />
              <PrivateRoute path="/confirm" type="confirm" activeStep={50} component={OnBoarding} />
              <PrivateRoute path="/availability" type="availability" activeStep={100} component={OnBoarding} />
            </Switch>
          </main>
        </ThemeProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default withStyles(stylesApp)(App);
