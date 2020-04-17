import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import stylesConfirm from './stylesConfirm';
import { Paper, TextField, TextareaAutosize, Button, IconButton, Typography } from '@material-ui/core';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { FaRegCalendarCheck, FaGlobeAmericas, FaClock } from 'react-icons/fa';
import PropTypes from 'prop-types';
import * as moment from 'moment-timezone';

function Confirm({ classes }) {
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
  const location = useLocation();
  const { url } = useParams();
  const appt = moment(location.state.date.toISOString());

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
    }

    const appointmentInfo = {
      guestName: nameField.name,
      guestEmail: emailField.email,
      guestComment: comment,
      guestTz: clientTz,
      meetingName: location.meeting.meetingName,
      meetTime: location.meeting.duration,
      apptTime: appt,
      url,
    };
    console.log(appointmentInfo);
    fetch('http://localhost:3001/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentInfo),
    }).then((res) => {
      console.log('fetched');
      if (res.status !== 201) {
        history.push('/login'); //go back to scheduler, error alert?
      } else {
        history.push('/finish');
      }
    });
  };

  return (
    <Paper elevation={6} className={classes.paper}>
      <div className={classes.meetingInfo}>
        <IconButton className={classes.backButton} aria-label="back-to-scheduler" onClick={handleBackButton}>
          <FiArrowLeftCircle size={45} />
        </IconButton>
        <Typography variant="h6" className={classes.name}>
          {location.state.name}
        </Typography>
        <Typography variant="h4" className={classes.meetingName}>
          {location.state.meeting.meetingName}
        </Typography>
        <div className={classes.eventDetails}>
          <div className={classes.meetingDuration}>
            <FaClock size={23} />
            <span>{location.state.meeting.duration} min</span>
          </div>
          <div className={classes.eventTime}>
            <FaRegCalendarCheck size={23} />{' '}
            <span>
              {appt.format('hh:mma')} - {appt.add(location.state.meeting.duration, 'm').format('hh:mma')},{' '}
              {weekdays[appt.day()]}, {months[appt.month()]} {appt.date()}, {appt.year()}
            </span>
          </div>
          <div className={classes.timeZone}>
            <FaGlobeAmericas size={23} />
            <span>{clientTz.replace('_', ' ') + ' (GMT' + moment.tz(clientTz).format('Z') + ')'}</span>
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
};

export default withStyles(stylesConfirm)(Confirm);
