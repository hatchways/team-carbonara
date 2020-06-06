import React, { useState, useEffect } from 'react';
import handleFetchErrors from '../../utils/handleFetchErrors';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab } from '@material-ui/core';
import PropTypes from 'prop-types';
import AppointmentsPanel from './AppointmentsPanel';
import AppointmentList from './AppointmentList';

const styles = (theme) => ({
  paper: {
    width: '100%',
    minHeight: '400px',
    marginTop: '50px',
    marginBottom: '100px',
  },
});

function DisplayAppointments({ classes, timezone, user }) {
  const [value, setValue] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    // fetch user's appointment info
    const fetchAppts = async () => {
      await fetch(`/api/appointments/${user}?timezone=${timezone}`)
        .then(handleFetchErrors)
        .then((res) => res.json())
        .then((data) => {
          setAppointments(data);
          setUpdate(false);
        })
        .catch((e) => {
          console.error('Error: ' + e);
        });
    };
    if (user) fetchAppts();
  }, [timezone, user, update]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderAppts = (appts) => {
    if (appts) {
      return Object.keys(appts).map((key) => (
        <AppointmentList appointments={appts[key]} key={key} setUpdate={setUpdate} />
      ));
    }
  };
  return (
    <Paper elevation={6} className={classes.paper}>
      <div>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
          <Tab label="Upcoming" />
          <Tab label="Past" />
        </Tabs>
        <AppointmentsPanel value={value} index={0}>
          {renderAppts(appointments.upcoming)}
        </AppointmentsPanel>
        <AppointmentsPanel value={value} index={1}>
          {renderAppts(appointments.past)}
        </AppointmentsPanel>
      </div>
    </Paper>
  );
}

DisplayAppointments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisplayAppointments);
