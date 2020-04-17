import React from 'react';
import useStylesEvent from './stylesEvent';
import { Paper, Typography, Button } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import { MdSettings } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Event({ duration, meetingName, url, user }) {
  const classes = useStylesEvent();

  let color = null;

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
          {/* target=_blank opens route in new tab */}
          <Link
            target="_blank"
            to={{
              pathname: `/${url}/${duration}`,
            }}
          >
            {duration} min
          </Link>
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
