import React, { useState, useEffect } from 'react';
import handleFetchErrors from '../../utils/handleFetchErrors';
import auth from '../../auth';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as moment from 'moment-timezone';
import AppointmentsPanel from './AppointmentsPanel';

const styles = (theme) => ({
  paper: {
    width: '80%',
    height: '400px',
  },
});

function DisplayAppointments({ classes, timezone, user }) {
  const [value, setValue] = useState(0);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    //fetch user's appointment info
    fetch(`http://localhost:3001/api/appointments/${user}`)
      .then(handleFetchErrors)
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
      })
      .catch((e) => {
        console.error('Error: ' + e);
      });
  }, [user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //display in user timezone
  console.log(appointments, timezone);
  return (
    <Paper elevation={6} className={classes.paper}>
      <div>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
          <Tab label="Upcoming" />
          <Tab label="Past" />
        </Tabs>
        <AppointmentsPanel value={value} index={0}>
          Upcoming ApointmentsPanel
        </AppointmentsPanel>
        <AppointmentsPanel value={value} index={1}>
          Past ApointmentsPanel
        </AppointmentsPanel>
      </div>
    </Paper>
  );
}

DisplayAppointments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisplayAppointments);
