import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  panelContainer: {
    background: theme.palette.secondary.light,
    fontSize: '1.1rem',
    flex: '1 1 auto',
  },
});

function AppointmentsPanel({ value, index, classes, children }) {
  return (
    <div hidden={value !== index} className={classes.panelContainer}>
      {children}
    </div>
  );
}

export default withStyles(styles)(AppointmentsPanel);
