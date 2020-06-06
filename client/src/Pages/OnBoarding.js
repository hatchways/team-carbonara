import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import stylesOnBoarding from '../Components/OnBoarding/stylesOnBoarding';
import { Paper, Divider } from '@material-ui/core';
import ProgressBar from '../Components/OnBoarding/ProgressBar';
import ProfileSetup from '../Components/OnBoarding/ProfileSetup';
import ConnectedPage from '../Components/OnBoarding/ConnectedPage';
import AvailabilitySetup from '../Components/OnBoarding/AvailabilitySetup';
import handleFetchErrors from '../utils/handleFetchErrors';
import PropTypes from 'prop-types';
import auth from '../auth';

const text = {
  profile: {
    header: 'Welcome to CalendApp!',
    btnText: 'Continue',
  },
  confirm: {
    header: 'Your Google Calendar is connected!',
    btnText: 'Continue',
  },
  availability: {
    header: 'Set your availability',
    btnText: 'Finish',
  },
};

function OnBoarding({ classes, type, activeStep }) {
  const [url, setUrl] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [hours, setHours] = useState({ start: '09:00', end: '17:00' });
  const [days, setDays] = useState({
    Sunday: false,
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: false,
  });

  let history = useHistory();

  function getStepContent(type) {
    if (type === 'profile') {
      return (
        <ProfileSetup
          handleProfileSubmit={handleProfileSubmit}
          btnText={text[type].btnText}
          url={url}
          timeZone={timeZone}
          setUrl={setUrl}
          setTimeZone={setTimeZone}
        />
      );
    }
    if (type === 'confirm') {
      const email = auth.getEmail();
      return <ConnectedPage btnText={text[type].btnText} handleConfirmSubmit={handleConfirmSubmit} email={email} />;
    }
    if (type === 'availability') {
      return (
        <AvailabilitySetup
          btnText={text[type].btnText}
          submitForm={submitForm}
          hours={hours}
          setHours={setHours}
          setDays={setDays}
          days={days}
        />
      );
    }
  }

  const handleConfirmSubmit = () => {
    history.push('/availability');
  };

  const handleProfileSubmit = () => {
    //prevents going to next form until url is unique & timezone + url is not empty
    //TODO: needs error handling. No message displayed for errors
    if (url === '' || timeZone === '') {
      return;
    }

    fetch(`/api/user/uniqueUrl?url=${url}`)
      .then(handleFetchErrors)
      .then((res) => res.json())
      .then((data) => {
        if (!data.isUnique) {
          return;
        }
        history.push('/confirm');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submitForm = () => {
    const profileInfo = {
      url,
      timeZone,
      hours,
      days,
    };
    const sub = auth.getSub();

    fetch(`/api/user/profile/${sub}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileInfo),
    })
      .then(handleFetchErrors)
      .then((res) => {
        if (res.status !== 200) return;
        history.push('/dashboard');
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
    </Paper>
  );
}

OnBoarding.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  activeStep: PropTypes.number.isRequired,
};

export default withStyles(stylesOnBoarding)(OnBoarding);
