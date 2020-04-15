import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import stylesConfirm from './stylesConfirm';
import { Paper, TextField, TextareaAutosize, Button, IconButton } from '@material-ui/core';
import { FiClock, FiArrowLeftCircle } from 'react-icons/fi';
import { FaRegCalendarCheck, FaGlobeAmericas } from 'react-icons/fa';
import PropTypes from 'prop-types';
import * as moment from 'moment-timezone';

function Confirm(props) {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const clientTz = moment.tz.guess();

  const [nameField, setName] = useState({ name: '', error: false, errorText: '' });
  const [emailField, setEmail] = useState({ email: '', error: false, errorText: '' });
  const [comment, setComment] = useState('');

  const handleName = (e) => {
    !e || !e.target.value
      ? setName({ name: '', error: true, errorText: 'Name is required.' })
      : setName({ name: e.target.value, error: false, errorText: '' });
  };

  const handleEmail = (e) => {
    !e || !e.target.value
      ? setEmail({ email: '', error: true, errorText: 'Email is required.' })
      : setEmail({ email: e.target.value, error: false, errorText: '' });
  };

  let history = useHistory();
  const handleBackButton = () => {
    // history.push('/uniqueurl/meeting'); //back to scheduler
  };

  const submitForm = () => {
    if (!nameField.name || !emailField.email) {
      handleName();
      handleEmail();
      return;
    } else {
      //send nameField.name, emailField.email, comment to backend to make appointment
      //include meeting name, duration, event time (client), timezone(client),
      //attach to user (id/sub/url)
      //send to gcal to add to user calendar
      //send emails
      //if be success history.push('/finish'); //event created dialog
      //else error, return to scheduler?
    }
  };

  const { classes, user, meetingName, meetTime, apptTime } = props;
  const appt = moment(apptTime);
  return (
    <Paper elevation={6} className={classes.paper}>
      <div className={classes.meetingInfo}>
        <IconButton className={classes.backButton} aria-label="back-to-scheduler" onClick={handleBackButton}>
          <FiArrowLeftCircle />
        </IconButton>
        <h4>Meeting with {user}</h4>
        <h1>{meetingName}</h1>
        <div className={classes.eventDetails}>
          <div>
            <FiClock /> {meetTime}min
          </div>
          <div className={classes.eventTime}>
            <FaRegCalendarCheck /> {appt.format('hh:mma')} - {appt.add(meetTime, 'm').format('hh:mma')},{' '}
            {weekdays[appt.day()]}, {months[appt.month()]} {appt.date()}, {appt.year()}
          </div>
          <div>
            <FaGlobeAmericas /> {clientTz.replace('_', ' ') + ' (GMT' + moment.tz(clientTz).format('Z') + ')'}
          </div>
        </div>
      </div>

      <div className={classes.confirmForm}>
        <h2>Enter Details</h2>
        <form className={classes.form}>
          <div>Name:</div>
          <TextField
            required
            className={classes.textField}
            error={nameField.error}
            helperText={nameField.errorText}
            id="name-field"
            variant="outlined"
            name="name"
            onChange={handleName}
          />
          <div>Email: </div>
          <TextField
            required
            className={classes.textField}
            error={emailField.error}
            helperText={emailField.errorText}
            id="email-field"
            variant="outlined"
            name="email"
            onChange={handleEmail}
          />

          <div>Meeting Notes: </div>
          <TextareaAutosize
            className={classes.textArea}
            aria-label="meeting-comments"
            rowsMin={7}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button className={classes.button} variant="contained" color="primary" onClick={submitForm}>
            Schedule Event
          </Button>
        </form>
      </div>
    </Paper>
  );
}

Confirm.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  meetingName: PropTypes.string.isRequired,
  meetTime: PropTypes.number.isRequired,
  apptTime: PropTypes.string.isRequired,
};

export default withStyles(stylesConfirm)(Confirm);
