import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import OnBoardButton from '../../components/OnBoardButton';
import FormCreateUrl from '../../components/FormCreateUrl';
import FormTimeZone from '../../components/FormTimeZone';
import ProgressBar from '../../components/ProgressBar';

const moment = require('moment-timezone');

const profileSetupStyle = (theme) => ({
  root: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    border: '1px solid grey',
    width: '500px',
  },
});

function ProfileSetup(props) {
  const [url, setUrl] = useState('');
  const [timeZone, setTimeZone] = useState('');
  // console.log('changed:', url, timeZone);

  const submitForm = () => {
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
    <div className={classes.root}>
      <div>Welcome to CalendApp!</div>
      <ProgressBar />
      <div>
        Create Your CalendApp URL: <FormCreateUrl setUrl={setUrl} />
      </div>
      <div>
        Select your time zone: <FormTimeZone setTimeZone={setTimeZone} />
      </div>
      <OnBoardButton router={Link} link="/connected" submitForm={submitForm} />
    </div>
  );
}

export default withStyles(profileSetupStyle)(ProfileSetup);
