import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import stylesOnBoarding from './stylesOnBoarding';
import moment from 'moment-timezone';
import OnBoardButton from './OnBoardButton';

function ProfileSetup({ classes, url, setUrl, setTimeZone, btnText, handleProfileSubmit }) {
  return (
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={4}>
        <div>Create Your CalendApp URL: </div>
      </Grid>

      <Grid item xs={8}>
        <TextField
          className={classes.urlField}
          id="url-field"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment className={classes.adornment} position="start" component="div">
                calendapp.com/
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={4}>
        <div>Select your time zone: </div>
      </Grid>

      <Grid item xs={8}>
        <Autocomplete
          id="timezone-field"
          options={moment.tz.names()}
          getOptionLabel={(option) => option + ' (GMT' + moment.tz(option).format('Z') + ')'}
          renderInput={(params) => <TextField {...params} label="Type a city or zone" variant="outlined" />}
          onChange={(e, v) => setTimeZone(v)}
        />
      </Grid>
      <div className={classes.btnContainer}>
        <OnBoardButton text={btnText} submitForm={handleProfileSubmit} />
      </div>
    </Grid>
  );
}

ProfileSetup.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
  setTimeZone: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired,
  handleProfileSubmit: PropTypes.func.isRequired,
};

export default withStyles(stylesOnBoarding)(ProfileSetup);
