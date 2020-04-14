import React, { useEffect, useState } from 'react';
import { Paper, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import stylesForm from './stylesForm';
import GoogleButton from '../../components/GoogleButton/GoogleButton';
import handleFetchErrors from '../../utils/handleFetchErrors';
import auth from '../../auth';

//obj to store values for signup/login
const loginText = {
  header: 'Log into your account',
  helpText: "Don't have an account? ",
  redirectText: 'Sign Up',
  redirectPath: '/signup',
};

const signupText = {
  header: 'Register an account',
  helpText: 'Already have an account? ',
  redirectText: 'Login',
  redirectPath: '/login',
};

function Form({ classes, type }) {
  const [formType, setformType] = useState(null);

  //store bool of ternary operator
  const formTypeConditional = formType === 'login' ? true : false;

  let history = useHistory();

  useEffect(() => {
    if (type === 'login') setformType('login');

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
    //look into useCallback()
  }, [type, handleSuccessLogin]);

  function handleFailureLogin() {
    console.log('Login failed');
  }

  //user arg returned from onSuccess
  function handleSuccessLogin(user) {
    //send token to backend, verifiy and create session & or account
    const idToken = user.getAuthResponse().id_token;

    fetch('http://localhost:3001/api/user/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: idToken,
    })
      .then(handleFetchErrors)
      .then((response) => {
        auth.login(() => {
          //redirect to profile setup if user was created
          switch (response.status) {
            case 201:
              history.push('/profile_settings');
              break;

            case 200:
              history.push('/dashboard');
              break;

            //any other status codes will return back to login
            default:
              return;
          }
        });
      })
      .catch((error) => console.log(error));
  }

  return (
    <Paper elevation={6} className={classes.paper}>
      <h2 className={classes.loginHeader}>{formTypeConditional ? loginText.header : signupText.header}</h2>
      <GoogleButton type={type} />
      <div>
        <Divider />
        <div className={classes.helpText}>
          {formTypeConditional ? loginText.helpText : signupText.helpText}
          <a href={formTypeConditional ? loginText.redirectPath : signupText.redirectPath}>
            {formTypeConditional ? loginText.redirectText : signupText.redirectText}
          </a>
        </div>
      </div>
    </Paper>
  );
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default withStyles(stylesForm)(Form);
