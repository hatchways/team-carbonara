import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Divider } from '@material-ui/core';
import { TextField, InputAdornment } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import * as moment from 'moment-timezone';

const styles = {
  paper: {
    width: '80%',
    height: '500px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: '0 auto',
    padding: '1.5rem',
  },
  meetingInfo: {
    flex: '0 0 30%',
  },
  confirmForm: {
    flex: '0 0 70%',
  },
};

function Confirm(props) {
  const { classes, setUrl, setTimeZone } = props;

  return (
    <Paper elevation={6} className={classes.paper}>
      <div className={classes.meetingInfo}>
        <div>Back button?</div>
        <h4>Meeting with: name</h4>
        <h1>Meeting name (30min meeting)</h1>
        <div>Clock icon, 30min</div>
        <div>Schedule icon, 9:00am - 9:45am, Wednesday, May 13, 2020</div>
        <div>World icon Eastern Time - US & Canada</div>
      </div>
      <Divider orientation="vertical" />
      <div className={classes.confirmForm}>
        <div>Name Field</div>
        <div>Email Field</div>
        <div>Comments Textarea</div>
        <div>Schedule Event Button</div>
      </div>
    </Paper>
  );
}

Confirm.propTypes = {
  classes: PropTypes.object.isRequired,
  setUrl: PropTypes.func.isRequired,
  setTimeZone: PropTypes.func.isRequired,
};

export default withStyles(styles)(Confirm);
