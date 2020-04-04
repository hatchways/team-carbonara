import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = (theme) => ({
  root: {
    flex: '0 0 40%',
    alignSelf: 'center',
    height: '0.5rem',
    borderRadius: '5px',
  },
  colorPrimary: {
    backgroundColor: '#ccc',
  },
  barColorPrimary: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '5px',
  },
});

function ProgressBar(props) {
  const { classes, activeStep } = props;

  return (
    <LinearProgress
      classes={{
        root: classes.root,
        colorPrimary: classes.colorPrimary,
        barColorPrimary: classes.barColorPrimary,
      }}
      variant="determinate"
      value={activeStep}
    />
  );
}

export default withStyles(styles)(ProgressBar);
