import React, { useEffect } from 'react';
import { MuiThemeProvider, Container, CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { theme } from './themes/theme';
import Form from './components/Form/Form';
import handleFetchErrors from './utils/handleFetchErrors';

const stylesApp = {
  appName: {
    margin: '5rem 0 3rem 0',
    textAlign: 'center',
    '& span': {
      color: 'orange',
    },
  },
};

//user arg returned from onSuccess
function handleSuccessLogin(user) {
  //send token to backend, verifiy and create session & or account
  const id_token = user.getAuthResponse().id_token;

  fetch('http://localhost:3001/api/user/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: id_token,
  })
    .then(handleFetchErrors)
    .then((response) => console.log('token sent'))
    .catch((error) => console.log(error));
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
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Container>
            <h1 className={classes.appName}>
              Calend
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
            </Switch>
          </Container>
        </MuiThemeProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default withStyles(stylesApp)(App);
