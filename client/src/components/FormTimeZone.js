import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core/';

const styles = {
  root: {
    // margin: theme.spacing.unit * 2,
    // border: "2px solid black",
    width: '100%',
  },
};

function FormTimeZone(props) {
  const { classes } = props;
  return <div className={classes.root}>time zone form</div>;
}

export default withStyles(styles)(FormTimeZone);
