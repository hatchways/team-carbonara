import React from 'react';
import useStylesEvent from './stylesEvent';
import { Paper, Typography, Button } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import { FaRegClock } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import PropTypes from 'prop-types';

function Event({ duration, meetingName }) {
  const classes = useStylesEvent();

  let color = null;

  //might remove this
  switch (duration) {
    case 15:
      color = 'darkmagenta';
      break;
    case 30:
      color = 'olivedrab';
      break;
    case 60:
      color = 'darkorange';
      break;
    default:
      color = 'crimson';
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
        <h3>{meetingName}</h3>
        <Typography variant="subtitle1">One-on-one</Typography>
      </div>
      <div className={classes.linksContainer}>
        <div>
          <FaRegClock size={16} />
          <span>{duration} min</span>
        </div>
        <Button className={classes.linkButton} variant="outlined">
          Copy Link
        </Button>
      </div>
    </Paper>
  );
}

Event.propTypes = {
  meetingName: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};

export default withTheme(Event);
