import React, { useEffect } from 'react';
import { ThemeProvider, Container, CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { theme } from './themes/theme';
import Form from './components/Form/Form';
import OnBoarding from './pages/OnBoarding';

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

//user arg returned from onSuccess
function handleSuccessLogin(user) {
  //send token to backend, verifiy and create session & or account
  console.log('Token: ' + user.getAuthResponse().id_token);
}

function handleFailureLogin() {
  console.log('Login failed');
}

function App(props) {
  const { classes } = props;

  useEffect(() => {
    window.gapi.load('auth2', () => {
      //init GoogleAuth object
      window.gapi.auth2
        .init({
          client_id: process.env.REACT_APP_CLIENT_ID,
        })
        .then((authObj) => {
          //attach signin flow to button
          authObj.attachClickHandler(
            'googleButton',
            { scope: 'https://www.googleapis.com/auth/calendar' },
            handleSuccessLogin,
            handleFailureLogin,
          );
        });
    });
  }, []);

  return (
    <React.Fragment>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container>
            <h1 className={classes.appName}>
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

              <Route path="/profile_settings">
                <OnBoarding type="profile" activeStep={0} />
              </Route>
              <Route path="/confirm">
                <OnBoarding type="confirm" activeStep={50} />
              </Route>
              <Route path="/availability">
                <OnBoarding type="availability" activeStep={100} />
              </Route>
            </Switch>
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default withStyles(stylesApp)(App);
