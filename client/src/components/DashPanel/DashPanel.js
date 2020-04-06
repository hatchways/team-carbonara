import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import useStylesDashPanel from './stylesDashPanel';

function DashboardPanel(props) {
  const classes = useStylesDashPanel();

  return (
    <div hidden={props.value !== props.index} className={classes.panelContainer}>
      {props.children}
    </div>
  );
}

export default withTheme(DashboardPanel);
