import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';
import stylesOnBoarding from '../../Pages/OnBoarding/stylesOnBoarding';
import StyledButton from '../StyledButton/StyledButton';

const OrangeCheckbox = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.light,
    '&$checked': {
      color: theme.palette.primary.main,
    },
  },
  checked: {},
}))((props) => <Checkbox color="default" {...props} />);

function AvailabilitySetup({ classes, setHours, hoursField, setDays, days, btnText, submitForm }) {
  const handleDays = (e) => {
    setDays({ ...days, [e.target.name]: e.target.checked });
  };

  const handleHours = (e) => {
    if (!e || !e.target.value) {
      setHours({ ...hoursField, [e.target.name]: e.target.value, error: true, errorText: 'Hours are required' });

      return;
    } else {
      setHours({ ...hoursField, [e.target.name]: e.target.value, error: false, errorText: '' });
    }
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
            value={hoursField.start}
            error={hoursField.error}
            helperText={hoursField.errorText}
            variant="outlined"
            type="time"
            name="start"
            onChange={handleHours}
            required={true}
          />
          <span>-</span>
          <TextField
            id="end-hours-field"
            value={hoursField.end}
            error={hoursField.error}
            helperText={hoursField.errorText}
            variant="outlined"
            type="time"
            name="end"
            onChange={handleHours}
            required={true}
          />
        </div>
      </div>

      <div>
        <div>Available Days: </div>
        <FormGroup row className={classes.checkBoxGroup}>
          {renderCheckBoxes(days)}
        </FormGroup>
      </div>
      <StyledButton text={btnText} submitForm={submitForm} />
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
