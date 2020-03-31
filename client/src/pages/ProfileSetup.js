import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import OnBoardButton from '../components/OnBoardButton';
import FormCreateUrl from '../components/FormCreateUrl';
import FormTimeZone from '../components/FormTimeZone';
import ProgressBar from '../components/ProgressBar';

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
  // const [timeZone, setTimeZone] = useState('');
  console.log(url);

  const submitForm = () => {
    console.log({
      url: url,
      // timezone: timezone
    });
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
    //     setResult(res.response);
    //     if (status === 200) props.incrementStep();
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
      <FormCreateUrl setUrl={setUrl} />
      <FormTimeZone />
      <OnBoardButton submitForm={submitForm} />
    </div>
  );
}

export default withStyles(profileSetupStyle)(ProfileSetup);
