import React from 'react';
import { withStyles, useTheme, makeStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';

const styles = {
  root: {
    // margin: theme.spacing.unit * 2,
    // border: "2px solid black",
    // display: 'inline',
    maxWidth: 400,
    flexGrow: 1,
  },
};

function ProgressBar(props) {
  const { classes, activeStep, setActiveStep } = props;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <div className={classes.root}>
      <MobileStepper variant="progress" steps={3} position="static" activeStep={activeStep} className={classes.root} />
    </div>
  );
}

export default withStyles(styles)(ProgressBar);
