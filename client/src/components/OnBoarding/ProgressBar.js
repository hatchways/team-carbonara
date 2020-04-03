import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  pie: {
    // margin: theme.spacing.unit * 2,
    maxWidth: 400,
    flex: '1 0 50%',
    alignSelf: 'center',
  },
  root: {
    borderRadius: 5,
    width: '100%',
    height: '0.5rem',
  },
  colorPrimary: {
    backgroundColor: '#ccc',
  },
  barColorPrimary: {
    backgroundColor: 'orange',
  },
};

function ProgressBar(props) {
  const { classes, activeStep } = props;

  return (
    <div className={classes.pie}>
      <LinearProgress
        classes={{
          root: classes.root,
          colorPrimary: classes.colorPrimary,
          barColorPrimary: classes.barColorPrimary,
        }}
        variant="determinate"
        value={activeStep}
      />
    </div>
  );
}

export default withStyles(styles)(ProgressBar);
