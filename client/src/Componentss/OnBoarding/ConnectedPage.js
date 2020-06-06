import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import stylesOnBoarding from './stylesOnBoarding';
import OnBoardButton from './OnBoardButton';

function ConnectedPage({ btnText, handleConfirmSubmit, classes, email }) {
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
      <OnBoardButton text={btnText} submitForm={handleConfirmSubmit} />
    </div>
  );
}

ConnectedPage.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  handleConfirmSubmit: PropTypes.func.isRequired,
};

export default withStyles(stylesOnBoarding)(ConnectedPage);
