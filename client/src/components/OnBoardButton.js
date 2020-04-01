import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    background: 'orange',
    width: '100px',
  },
};

function OnBoardButton(props) {
  const { classes, submitForm, router, link } = props;
  return (
    <Button className={classes.root} onClick={submitForm} component={router} to={link}>
      Continue
    </Button>
  );
}

export default withStyles(styles)(OnBoardButton);
