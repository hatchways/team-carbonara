import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';

const styles = {
  root: {
    // margin: theme.spacing.unit * 2,
    // border: "2px solid black",
    // display: 'inline',
    maxWidth: 400,
    flexGrow: 1,
    progress: {
      width: '100%',
    },
  },
};

function ProgressBar(props) {
  const { classes, activeStep } = props;

  return (
    <MobileStepper className={classes.root} variant="progress" steps={3} position="static" activeStep={activeStep} />
  );
}

export default withStyles(styles)(ProgressBar);
