import React, { useEffect, useState, useRef } from 'react';
import { Paper, Divider, Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import stylesForm from './stylesForm';
import handleFetchErrors from '../../utils/handleFetchErrors';
import auth from '../../auth';

//obj to store values for signup/login

function Form({ classes, type }) {
  const [formType, setformType] = useState(null);
  const googleButtonRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (type === 'login') setformType('login');

    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        ux_mode: 'popup',
      });
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'filled_blue',
        size: 'large',
        width: '275',
        text: type === 'login' ? 'continue_with' : 'signup_with',
      });
    };
    document.body.appendChild(script);

    // Cleanup script
    return () => {
      document.body.removeChild(script);
    };
    // eslint-disable-next-line
  }, [type, history]);

  function handleCredentialResponse(response) {
    // response.credential is the ID token
    fetch('/api/user/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: response.credential }),
    })
      .then(handleFetchErrors)
      .then((res) => {
        auth.login(() => {
          switch (res.status) {
            case 201:
              history.push('/profile_settings');
              break;
            case 200:
              history.push('/dashboard');
              break;
            default:
              history.push('/signup');
              break;
          }
        });
      })
      .catch((error) => console.log(error));
  }

  const handleDemo = () => {
    auth.login(
      () => {
        history.push('/dashboard');
      },
      {
        getId: () => 'demo',
        getEmail: () => 'email@email.com',
        getName: () => 'John Doe',
      },
    );
  };

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

  return (
    <Paper elevation={6} className={classes.paper}>
      <h2 className={classes.loginHeader}>{formType === 'login' ? loginText.header : signupText.header}</h2>
      <div align="center" ref={googleButtonRef}></div>
      <Link component="button" onClick={handleDemo}>
        Try a Demo Account
      </Link>
      <div>
        <Divider />
        <div className={classes.helpText}>
          {formType === 'login' ? loginText.helpText : signupText.helpText}
          <a href={formType === 'login' ? loginText.redirectPath : signupText.redirectPath}>
            {formType === 'login' ? loginText.redirectText : signupText.redirectText}
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
