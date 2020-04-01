import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import OnBoardButton from '../../components/OnBoardButton';
import ProgressBar from '../../components/ProgressBar';
import FormChooseHours from '../../components/FormChooseHours';
import FormChooseDays from '../../components/FormChooseDays';

const moment = require('moment-timezone');

const onBoardPageStyle = (theme) => ({
  root: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    border: '1px solid grey',
    width: '500px',
  },
});

function AvailabilitySetup(props) {
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
  // console.log('changed', hours, days);

  const submitForm = () => {
    console.log('submit', { days: days, hours: hours });
    //hours: {start: "09:00", end: "17:00"}
    // validate availability
    // let status;
    // fetch('/update-user', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(
    //     { times, days }
    //   ),
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
        Available Hours: <FormChooseHours setHours={setHours} hours={hours} />
      </div>
      <div>
        Available Days: <FormChooseDays setDays={setDays} days={days} />
      </div>
      <OnBoardButton router={Link} link="/home" submitForm={submitForm} />
    </div>
  );
}

export default withStyles(onBoardPageStyle)(AvailabilitySetup);
