import React, { useEffect, useState, useRef } from 'react';
import { Paper, Divider, Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import stylesForm from './stylesForm';
import handleFetchErrors from '../../utils/handleFetchErrors';
import auth from '../../auth';
import GoogleButton from '../GoogleButton/GoogleButton';

function Form({ classes, type }) {
  const [formType, setformType] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (type === 'login') setformType('login');

    // Check for OAuth2 code in URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      // Send code to backend
      fetch('/api/user/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(handleFetchErrors)
        .then(async (res) => {
          const user = await res.json();
          // Remove code from URL after login
          window.history.replaceState({}, document.title, window.location.pathname);

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
          }, user);
        })
        .catch((error) => {
          console.error('Error during login:', error);
        });
    }
    // eslint-disable-next-line
  }, [type, history]);

  // Redirect to Google OAuth2 endpoint
  function handleGoogleLogin() {
    const redirectUri = encodeURIComponent(window.location.origin + '/login');
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const scope = encodeURIComponent('openid email profile https://www.googleapis.com/auth/calendar');
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&prompt=consent`;
    window.location.href = oauthUrl;
  }

  const handleDemo = () => {
    auth.login(
      () => {
        history.push('/dashboard');
      },
      {
        sub: 'demo',
        email: 'email@email.com',
        name: 'John Doe',
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
      <div align="center">
        <GoogleButton type={type} click={handleGoogleLogin} />
      </div>
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
