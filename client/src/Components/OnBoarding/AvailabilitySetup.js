import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';
import stylesOnBoarding from './stylesOnBoarding';
import OnBoardButton from './OnBoardButton';

const OrangeCheckbox = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.light,
    '&$checked': {
      color: theme.palette.primary.main,
    },
  },
  checked: {},
}))((props) => <Checkbox color="default" {...props} />);

function AvailabilitySetup({ classes, setHours, hours, setDays, days, btnText, submitForm }) {
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
          id={day + '-checkbox-field'}
          classes={{ root: classes.checkBoxLabel, label: classes.checkBoxLabelLabel }}
          key={day}
          control={<OrangeCheckbox checked={days[day]} onChange={handleDays} name={day} />}
          label={day + 's'}
          labelPlacement="bottom"
        />
      );
    });
  }

  return (
    <React.Fragment>
      <div>
        <div>Available Hours: </div>
        <div className={classes.hoursRow}>
          <TextField
            id="start-hours-field"
            value={hours.start}
            variant="outlined"
            type="time"
            name="start"
            onChange={handleHours}
          />
          <span>-</span>
          <TextField
            id="end-hours-field"
            value={hours.end}
            variant="outlined"
            type="time"
            name="end"
            onChange={handleHours}
          />
        </div>
      </div>

      <div>
        <div>Available Days: </div>
        <FormGroup row className={classes.checkBoxGroup}>
          {renderCheckBoxes(days)}
        </FormGroup>
      </div>
      <OnBoardButton text={btnText} submitForm={submitForm} />
    </React.Fragment>
  );
}

AvailabilitySetup.propTypes = {
  classes: PropTypes.object.isRequired,
  setHours: PropTypes.func.isRequired,
  hours: PropTypes.object.isRequired,
  setDays: PropTypes.func.isRequired,
  days: PropTypes.object.isRequired,
  btnText: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired,
};

export default withStyles(stylesOnBoarding)(AvailabilitySetup);
