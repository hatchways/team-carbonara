import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  root: {
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    color: '#eee',
    textTransform: 'none',
    width: '8rem',
    height: '2.5rem',
    alignSelf: 'center',
    margin: '1rem 0 0.5rem 0',
  },
});

function OnBoardButton({ classes, submitForm, text }) {
  return (
    <Button className={classes.root} onClick={submitForm}>
      {text}
    </Button>
  );
}

export default withStyles(styles)(OnBoardButton);
