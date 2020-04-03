import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    background: 'orange',
    width: '100px',
    alignSelf: 'center',
  },
};

function OnBoardButton(props) {
  const { classes, submitForm, router, link, text } = props;
  return (
    <Button className={classes.root} onClick={submitForm} component={router} to={link}>
      {text}
    </Button>
  );
}

export default withStyles(styles)(OnBoardButton);
