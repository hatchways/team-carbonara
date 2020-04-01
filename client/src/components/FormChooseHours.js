import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, FormControl, FormLabel } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    // margin: theme.spacing.unit * 2,
    // border: "2px solid black",
    display: 'inline',
    padding: theme.spacing(2),
    width: '100%',
  },
});

function FormChooseHours(props) {
  const { classes, setHours, hours } = props;

  const handleChange = (e) => {
    setHours({ ...hours, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* <FormControl> */}
      <TextField className={classes.root} variant="outlined" type="time" name="start" onChange={handleChange} />
      <TextField className={classes.root} variant="outlined" type="time" name="end" onChange={handleChange} />
      {/* </FormControl> */}
    </>
  );
}

export default withStyles(styles)(FormChooseHours);
