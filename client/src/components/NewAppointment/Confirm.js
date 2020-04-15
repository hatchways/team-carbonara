import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Divider } from '@material-ui/core';
import { TextField, TextareaAutosize, Button, IconButton } from '@material-ui/core';
import { FiClock, FiArrowLeftCircle } from 'react-icons/fi';
import { FaRegCalendarCheck, FaGlobeAmericas } from 'react-icons/fa';
import PropTypes from 'prop-types';
import * as moment from 'moment-timezone';

const styles = {
  paper: {
    width: '80%',
    height: '600px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: '0 auto',
    marginBottom: '200px',
  },
  meetingInfo: {
    flex: '0 0 30%',
    padding: '1.5rem',
    borderRight: '1px solid #eee',
  },
  confirmForm: {
    flex: '0 0 70%',
    padding: '1.5rem',
    flexDirection: 'column',
  },
};

function Confirm(props) {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May'];
  const clientTz = moment.tz.guess();

  const [nameField, setName] = useState({ name: '', error: false, errorText: '' });
  const [emailField, setEmail] = useState({ email: '', error: false, errorText: '' });

  const handleName = async (e) => {
    e.target.value === ''
      ? setName({ name: '', error: true, errorText: 'Name is required.' })
      : setName({ name: e.target.value, error: false, errorText: '' });
  };

  const handleEmail = async (e) => {
    e.target.value === ''
      ? setEmail({ email: '', error: true, errorText: 'Email is required.' })
      : setEmail({ email: e.target.value, error: false, errorText: '' });
  };
  console.log(nameField, emailField);

  const { classes, user, meetingName, meetTime, apptTime } = props;
  const appt = moment(apptTime);
  return (
    <Paper elevation={6} className={classes.paper}>
      <div className={classes.meetingInfo}>
        <IconButton aria-label="back-to-scheduler">
          <FiArrowLeftCircle />
        </IconButton>
        <h4>Meeting with {user}</h4>
        <h1>{meetingName}</h1>
        <div>
          <FiClock /> {meetTime}min
        </div>
        <div>
          <FaRegCalendarCheck /> {appt.format('hh:mma')} - {appt.add(meetTime, 'm').format('hh:mma')},{' '}
          {weekdays[appt.day()]}, {months[appt.month()]} {appt.date()}, {appt.year()}
        </div>
        <div>
          <FaGlobeAmericas /> {clientTz + ' (GMT' + moment.tz(clientTz).format('Z') + ')'}
        </div>
      </div>

      <Divider orientation="vertical" />

      <div className={classes.confirmForm}>
        <h2>Enter Details</h2>
        <div>
          <div>Name:</div>
          <TextField
            required
            error={nameField.error}
            helperText={nameField.errorText}
            id="name-field"
            variant="outlined"
            name="name"
            onChange={handleName}
          />
        </div>
        <div>
          <div>Email: </div>
          <TextField
            required
            error={emailField.error}
            helperText={emailField.errorText}
            id="email-field"
            variant="outlined"
            name="email"
            onChange={handleEmail}
          />
        </div>

        <div>Meeting Notes: </div>
        <div>
          <TextareaAutosize
            className={classes.texarea}
            aria-label="meeting-comments"
            rowsMin={7}
            placeholder="Minimum 3 rows"
          />
        </div>
        <Button variant="contained" color="primary">
          Schedule Event
        </Button>
      </div>
    </Paper>
  );
}

Confirm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Confirm);
