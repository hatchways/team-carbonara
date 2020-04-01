import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import OnBoardButton from '../../components/OnBoardButton';
import ProgressBar from '../../components/ProgressBar';

import FormCreateUrl from '../../components/FormCreateUrl';
import FormTimeZone from '../../components/FormTimeZone';
import FormChooseHours from '../../components/FormChooseHours';
import FormChooseDays from '../../components/FormChooseDays';

const moment = require('moment-timezone');

const profileSetupStyle = (theme) => ({
  root: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    border: '1px solid grey',
    width: '500px',
  },
});
// typography header text
// case 1:
//   return 'Your Google calendar is connected!';
// case 2:
//   return 'Set your availability';
// default:
//   return 'Unknown step';

function OnBoarding(props) {
  const [url, setUrl] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [hours, setHours] = useState({ start: '', end: '' });
  const [days, setDays] = useState({
    sunday: false,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
  });

  const [activeStep, setActiveStep] = React.useState(0);
  console.log(activeStep);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
            <div>
              Create Your CalendApp URL: <FormCreateUrl setUrl={setUrl} />
            </div>
            <div>
              Select your time zone: <FormTimeZone setTimeZone={setTimeZone} />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div>Here's how CalendApp will work with [email]</div>
            <div>- We will check [email] for conflicts.</div>
            <div>- We will add event to [email].</div>
          </>
        );
      case 2:
        return (
          <>
            <div>
              Available Hours: <FormChooseHours setHours={setHours} hours={hours} />
            </div>
            <div>
              Available Days: <FormChooseDays setDays={setDays} days={days} />
            </div>
          </>
        );
      default:
        return 'Unknown step';
    }
  }

  const handleStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const submitForm = () => {
    handleStep();
    console.log('submit:', {
      url: url,
      timeZone: timeZone, //'America/New_York'
      offset: moment.tz(timeZone).format('Z'), //'-4:00'
      //can send utc offset or timezone string to backend
    });
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

  const { classes } = props;
  return (
    //when active step changes, change header message, form components
    //keep button and progress bar
    //if activestep = 2, redirect to finish?
    <div className={classes.root}>
      {/* typography component, map to corret message per step */}
      <div>
        Welcome to CalendApp! onboarding
        <ProgressBar activeStep={activeStep} setActiveStep={setActiveStep} />
      </div>

      {getStepContent(activeStep)}

      <OnBoardButton submitForm={submitForm} />
    </div>
  );
}

export default withStyles(profileSetupStyle)(OnBoarding);
