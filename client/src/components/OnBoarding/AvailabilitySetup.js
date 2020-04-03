import React from 'react';
import { orange } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { TextField, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

const onBoardPageStyle = (theme) => ({
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
    },
  },
  pie: {
    display: 'flex',
    '& div': {
      border: '1px solid #ccc',
      'border-radius': '5px',
      '& label': {
        margin: 'auto',
        'border-right': '1px solid #eee',
      },
    },
  },
  label: {
    fontSize: '0.7rem',
    flexGrow: 1,
  },
});

const OrangeCheckbox = withStyles({
  root: {
    color: orange[400],
    '&$checked': {
      color: orange[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function AvailabilitySetup(props) {
  const { classes, setHours, hours, setDays, days } = props;

  const handleDays = (e) => {
    setDays({ ...days, [e.target.name]: e.target.checked });
  };

  const handleHours = (e) => {
    setHours({ ...hours, [e.target.name]: e.target.value });
  };

  function renderCheckBoxes(days) {
    return Object.keys(days).map((day) => {
      return (
        <FormControlLabel
          classes={{ label: classes.label }}
          key={day}
          control={<OrangeCheckbox checked={days[day]} onChange={handleDays} name={day} />}
          label={day + 's'}
          labelPlacement="bottom"
        />
      );
    });
  }

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <div>Available Hours: </div>
        <TextField variant="outlined" type="time" name="start" onChange={handleHours} />
        <span> - </span>
        <TextField variant="outlined" type="time" name="end" onChange={handleHours} />
      </div>
      <div className={classes.row}>
        <div>Available Days: </div>
        <div className={classes.pie}>
          <FormGroup row>{renderCheckBoxes(days)}</FormGroup>
        </div>
      </div>
    </div>
  );
}

export default withStyles(onBoardPageStyle)(AvailabilitySetup);
