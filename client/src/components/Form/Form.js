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

function Form({ classes, type }) {
  const [formType, setformType] = useState(null);

  //store bool of ternary operator
  const isLoginForm = formType === 'login' ? true : false;

  let history = useHistory();

  const handleSignUp = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    console.log('auth2', auth2);
    auth2
      .grantOfflineAccess({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/calendar',
      })
      .then((res) => {
        console.log('AUTH2 AFTER', auth2);
        // debugger;
        //auth code, post to backend to trade for tokens
        fetch('http://localhost:3001/api/user/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: res.code }),
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
            }, auth2.currentUser);
            //this won't work with auth class
          })
          .catch((error) => console.log(error));
      });
  };

  useEffect(() => {
    if (type === 'login') setformType('login');

    function handleFailureLogin() {
      console.log('Login failed');
    }

    //user arg returned from onSuccess
    function handleSuccessLogin(user) {
      //send token to backend, verifiy and create session & or account
      const idToken = user.getAuthResponse().id_token;
      console.log(user.getAuthResponse(), 'user', user);

      fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: idToken }),
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
                history.push('/signup');
                return;
            }
          }, user);
        })
        .catch((error) => console.log(error));
    }

    window.gapi.load('auth2', () => {
      //init GoogleAuth object
      window.gapi.auth2
        .init({
          authParameters: { response_type: 'code', access_type: 'offline', prompt: 'consent' },
          client_id: process.env.REACT_APP_CLIENT_ID,
        })
        .then((authObj) => {
          console.log('authobj', authObj);

          //attach signin flow to button
          authObj.attachClickHandler(
            'googleButton',
            { scope: 'https://www.googleapis.com/auth/calendar' },
            handleSuccessLogin,
            handleFailureLogin,
          );
        });
    });
  }, [type, history]);

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
    handleClick: handleSignUp,
  };

  return (
    <Paper elevation={6} className={classes.paper}>
      <h2 className={classes.loginHeader}>{isLoginForm ? loginText.header : signupText.header}</h2>
      <GoogleButton type={type} click={isLoginForm ? loginText.handleClick : signupText.handleClick} />
      <div>
        <Divider />
        <div className={classes.helpText}>
          {isLoginForm ? loginText.helpText : signupText.helpText}
          <a href={isLoginForm ? loginText.redirectPath : signupText.redirectPath}>
            {isLoginForm ? loginText.redirectText : signupText.redirectText}
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
