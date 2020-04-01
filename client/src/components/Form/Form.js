import React, { useEffect, useState } from 'react';
import { Paper, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import stylesForm from './stylesForm';
import GoogleButton from '../../components/GoogleButton/GoogleButton';

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

function Form(props) {
  const { classes, type } = props;
  const [formType, setformType] = useState(null);

  //store bool of ternary operator
  const formTypeConditional = formType === 'login' ? true : false;

  useEffect(() => {
    if (type === 'login') setformType('login');
  }, [type]);

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
