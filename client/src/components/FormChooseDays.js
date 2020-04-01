import React from 'react';
import { orange } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    display: 'flex',
    '& div': {
      border: '1px solid #ccc',
      'border-radius': '5px',
      '& label': {
        width: '70px',
        margin: 'auto',
        'border-right': '1px solid #eee',
      },
    },
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

function FormChooseDays(props) {
  const { classes, setDays, days } = props;

  const handleChange = (e) => {
    setDays({ ...days, [e.target.name]: e.target.checked });
  };

  return (
    <div className={classes.root}>
      <FormGroup row>
        <FormControlLabel
          control={<OrangeCheckbox checked={days.sunday} onChange={handleChange} name="sunday" />}
          label="Sundays"
          labelPlacement="bottom"
        />
        <FormControlLabel
          control={<OrangeCheckbox checked={days.monday} onChange={handleChange} name="monday" />}
          label="Mondays"
          labelPlacement="bottom"
        />
        <FormControlLabel
          control={<OrangeCheckbox checked={days.tuesday} onChange={handleChange} name="tuesday" />}
          label="Tuesdays"
          labelPlacement="bottom"
        />
        <FormControlLabel
          control={<OrangeCheckbox checked={days.wednesday} onChange={handleChange} name="wednesday" />}
          label="Wednesdays"
          labelPlacement="bottom"
        />
        <FormControlLabel
          control={<OrangeCheckbox checked={days.thursday} onChange={handleChange} name="thursday" />}
          label="Thursdays"
          labelPlacement="bottom"
        />
        <FormControlLabel
          control={<OrangeCheckbox checked={days.friday} onChange={handleChange} name="friday" />}
          label="Fridays"
          labelPlacement="bottom"
        />
        <FormControlLabel
          control={<OrangeCheckbox checked={days.saturday} onChange={handleChange} name="saturday" />}
          label="Saturdays"
          labelPlacement="bottom"
        />
      </FormGroup>
    </div>
  );
}

export default withStyles(styles)(FormChooseDays);
