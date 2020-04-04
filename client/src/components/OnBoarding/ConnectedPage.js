import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import stylesOnBoarding from './stylesOnBoarding';

const email = 'hello@gmail.com';

function ConnectedPage(props) {
  const { classes } = props;

  return (
    <div className={classes.connectedPage}>
      <h3>
        Here's how CalendApp will work with <span>{email}</span>:
      </h3>
      <Divider />
      <div>
        1. We will check "<span>{email}</span>" for conflicts
      </div>
      <Divider />
      <div>
        2. We will add event to "<span>{email}</span>"
      </div>
      <Divider />
    </div>
  );
}

ConnectedPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(stylesOnBoarding)(ConnectedPage);
