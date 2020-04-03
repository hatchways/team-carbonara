import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const moment = require('moment-timezone');

const profileSetupStyle = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& div': {
      flexGrow: 1,
      //add adornment border/line
      // 'border-right': '1px solid #eee',
    },
    autocomplete: {
      width: '500px',
    },
  },
});

function ProfileSetup(props) {
  const { classes, setUrl, setTimeZone } = props;

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <div>Create Your CalendApp URL: </div>
        <TextField
          className={classes.root}
          error={false}
          id="outlined-basic"
          variant="outlined"
          onChange={(e) => setUrl(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">calendapp.com/</InputAdornment>,
          }}
        />
      </div>
      <div className={classes.row}>
        <div>Select your time zone: </div>
        <Autocomplete
          classes={{ root: classes.autocomplete }}
          options={moment.tz.names()}
          getOptionLabel={(option) => option + ' (GMT' + moment.tz(option).format('Z') + ')'}
          renderInput={(params) => <TextField {...params} label="Type a city or zone" variant="outlined" />}
          onChange={(e, v) => setTimeZone(v)}
        />
      </div>

      {/* <OnBoardButton submitForm={submitForm} router={Link} link="/confirm" /> */}
    </div>
  );
}

export default withStyles(profileSetupStyle)(ProfileSetup);
