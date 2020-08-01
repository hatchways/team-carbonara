import React from 'react';
import moment from 'moment-timezone';
import { withStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import stylesOnBoarding from '../../Pages/OnBoarding/stylesOnBoarding';
import StyledButton from '../StyledButton/StyledButton';
import handleFetchErrors from '../../utils/handleFetchErrors';

function ProfileSetup({ classes, urlField, setUrl, setTimeZone, btnText, handleProfileSubmit }) {
  const handleUrl = (e) => {
    if (!e || !e.target.value) {
      setUrl({ url: '', error: true, errorText: 'Url is required' });
      return;
    } else {
      setUrl({ url: e.target.value, error: false, errorText: '' });
    }
    const url = e.target.value;
    fetch(`/api/user/uniqueUrl?url=${url}`)
      .then(handleFetchErrors)
      .then((res) => res.json())
      .then((data) => {
        if (!data.isUnique) {
          setUrl({ url: url, error: true, errorText: 'Url is not unique' });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={4}>
        <div>Create Your CalendApp URL: </div>
      </Grid>

      <Grid item xs={8}>
        <TextField
          className={classes.urlField}
          error={urlField.error}
          helperText={urlField.errorText}
          id="url-field"
          variant="outlined"
          value={urlField.url}
          onChange={handleUrl}
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
          disableClearable={true}
          options={moment.tz.names()}
          value={moment.tz.guess()}
          getOptionLabel={(option) => option + ' (GMT' + moment.tz(option).format('Z') + ')'}
          renderInput={(params) => <TextField {...params} label="Type a city or zone" variant="outlined" />}
          onChange={(e, v) => setTimeZone(v)}
        />
      </Grid>
      <div className={classes.btnContainer}>
        <StyledButton text={btnText} clickFn={handleProfileSubmit} />
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
