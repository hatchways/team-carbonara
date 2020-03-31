import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    // margin: theme.spacing.unit * 2,
    // border: "2px solid black",
    width: '100%',
  },
};

function ProgressBar(props) {
  const { classes } = props;
  return <div className={classes.root}>progress bar</div>;
}

export default withStyles(styles)(ProgressBar);
