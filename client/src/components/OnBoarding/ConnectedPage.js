import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

const pageStyle = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& div': {
      padding: theme.spacing(2),
      flexGrow: 1,
    },
  },
});

const email = 'hello@gmail.com';

function ConnectedPage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <h3>Here's how CalendApp will work with {email}: </h3>
      <Divider />
      <div>1. We will check {email} for conflicts.</div>
      <Divider />
      <div>2. We will add event to {email}.</div>
    </div>
  );
}

export default withStyles(pageStyle)(ConnectedPage);
