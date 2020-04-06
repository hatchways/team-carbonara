import React from 'react';
import useStylesEvent from './stylesEvent';
import { Paper, Typography, Button } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import { FaRegClock } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';

function Event(props) {
  const classes = useStylesEvent();

  let color = null;

  switch (props.meetingType) {
    case 15:
      color = 'darkmagenta';
      break;
    case 30:
      color = 'olivedrab';
      break;
    case 60:
      color = 'darkorange';
      break;
  }

  const stripeCSS = {
    borderTop: `8px solid ${color}`,
    borderRadius: '1rem',
    margin: '0 -2rem',
  };

  return (
    <Paper elevation={6} className={classes.eventsContainer}>
      <div style={stripeCSS}></div>
      <div>
        <MdSettings className={classes.settingsIcon} size={30} />
      </div>
      <div className={classes.eventDesc}>
        <h3>{props.meetingType} minute meeting</h3>
        <Typography variant="subtitle1">One-on-one</Typography>
      </div>
      <div className={classes.linksContainer}>
        <div>
          <FaRegClock size={16} />
          <span>{props.meetingType} min</span>
        </div>
        <Button className={classes.linkButton} variant="outlined">
          Copy Link
        </Button>
      </div>
    </Paper>
  );
}

export default withTheme(Event);
