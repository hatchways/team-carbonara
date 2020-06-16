import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaRegCalendarCheck, FaGlobeAmericas } from 'react-icons/fa';
import { Paper, Typography, Divider } from '@material-ui/core';
import useStylesConfirmed from './stylesConfirmed';

function ConfirmedAppointment() {
  const classes = useStylesConfirmed();
  const location = useLocation();

  useEffect(() => {
    if (location.state.url === 'demo') {
      alert('Meeting was not scheduled. Thank you for visiting!');
    }
  }, [location.state.url]);

  return (
    <Paper elevation={4} className={classes.paper}>
      <div className={classes.headerText}>
        <Typography align="center" variant="h4">
          Confirmed
        </Typography>
        <Typography align="center" variant="body1">
          You are scheduled with {location.state.name}
        </Typography>
        <Divider />
      </div>
      <div className={classes.textContainer}>
        <div className={classes.durationContainer}>
          <div className={classes.meetingIcon}></div>
          <Typography variant="h5">{location.state.meetingName}</Typography>
        </div>
        <div className={classes.apptContainer}>
          <FaRegCalendarCheck size={23} />
          <Typography variant="h6">{location.state.apptTime}</Typography>
        </div>
        <div className={classes.timezone}>
          <FaGlobeAmericas size={23} />
          <Typography variant="h6">{location.state.timezone}</Typography>
        </div>
      </div>
      <Typography align="center" variant="body1">
        A calendar invitation has been sent to your email address.
      </Typography>
    </Paper>
  );
}

export default ConfirmedAppointment;
