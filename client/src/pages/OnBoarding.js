import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import stylesOnBoarding from '../components/OnBoarding/stylesOnBoarding';
import { Paper, Divider } from '@material-ui/core';
import ProgressBar from '../components/OnBoarding/ProgressBar';
import ProfileSetup from '../components/OnBoarding/ProfileSetup';
import ConnectedPage from '../components/OnBoarding/ConnectedPage';
import AvailabilitySetup from '../components/OnBoarding/AvailabilitySetup';
import OnBoardButton from '../components/OnBoarding/OnBoardButton';
import PropTypes from 'prop-types';

const moment = require('moment-timezone');

function OnBoarding(props) {
  const [activeStep, setActiveStep] = React.useState(props.activeStep);
  const [url, setUrl] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [hours, setHours] = useState({ start: '', end: '' });
  const [days, setDays] = useState({
    Sunday: false,
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: false,
  });

  let next;
  function getStepContent(type) {
    if (type === 'profile') {
      next = '/confirm';
      return <ProfileSetup setUrl={setUrl} setTimeZone={setTimeZone} />;
    }
    if (type === 'confirm') {
      next = '/availability';
      return <ConnectedPage />;
    }
    if (type === 'availability') {
      next = '/profile_settings'; //go to dashboard later
      return <AvailabilitySetup setHours={setHours} setDays={setDays} days={days} />;
    } else {
      return 'Unknown step';
    }
  }

  const handleStep = () => {
    setActiveStep((prevStep) => prevStep + 50);
  };

  const submitForm = () => {
    handleStep();
    console.log(
      'submit:',
      {
        url: url,
        timeZone: timeZone, //'America/New_York'
        offset: moment.tz(timeZone).format('Z'),
      },
      { days: days, hours: hours }, //'-4:00'
      //can send utc offset or timezone string to backend
    );
    // validate url unique/not empty and timeZone presence
    // let status;
    // fetch('/update-user', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ url: url , timezone: timezone}),
    // })
    //   .then((res) => {
    //     status = res.status;
    //     if (status < 500) return res.json();
    //     else throw Error('Server error');
    //   })
    //   .then((res) => {
    //     if (status === 200) {
    //       //do something, go to "connected" onboard display
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  };

  const text = {
    profile: {
      header: 'Welcome to CalendApp!',
      button: 'Continue',
      // submit: submitForm,
    },
    confirm: {
      header: 'Your Google calendar is connected!',
      button: 'Continue',
    },
    availability: {
      header: 'Set your availability',
      button: 'Finish',
    },
  };

  const { classes, type } = props;
  return (
    <Paper elevation={6} className={classes.paper}>
      <div className={classes.headRow}>
        <div className={classes.headContent}>
          <h2>{text[type].header}</h2>
          <ProgressBar activeStep={activeStep} />
        </div>
        <Divider className={classes.divider} />
      </div>

      {getStepContent(type)}

      <OnBoardButton submitForm={submitForm} router={Link} link={next} text={text[type].button} />
    </Paper>
  );
}

ProfileSetup.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  activeStep: PropTypes.number.isRequired,
};

export default withStyles(stylesOnBoarding)(OnBoarding);
