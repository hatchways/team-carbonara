import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  root: {
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    color: '#eee',
    width: '8rem',
    height: '2.5rem',
    alignSelf: 'center',
    margin: '0 0 0.5rem 0',
  },
});

function OnBoardButton(props) {
  const { classes, submitForm, router, link, text } = props;
  return (
    <Button className={classes.root} onClick={submitForm} component={router} to={link}>
      {text}
    </Button>
  );
}

export default withStyles(styles)(OnBoardButton);
