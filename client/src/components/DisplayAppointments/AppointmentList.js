import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Appointment from './Appointment';
const moment = require('moment-timezone');

const styles = {
  root: {},
  date: {
    padding: '.5rem 1rem',
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
  },
};

function AppointmentList({ classes, appointments, date, type }) {
  console.log(appointments, type);
  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.date}>
        {moment(appointments[0].apptTime).tz(appointments[0].userTz).format('dddd, MMMM Do YYYY')}
      </Typography>
      {appointments ? appointments.map((appointment) => <Appointment appointment={appointment} />) : ''}
    </div>
  );
}

AppointmentList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppointmentList);
