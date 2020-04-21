import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import Appointment from './Appointment';

const styles = {
  root: {},
};

function AppointmentList({ classes, appointments, date, type }) {
  console.log(appointments, type);
  return (
    <div className={classes.root}>
      <div>Wednesday, May 20, 2020</div>
      {appointments ? appointments.map((appointment) => <Appointment appointment={appointment} />) : ''}
    </div>
  );
}

AppointmentList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppointmentList);
