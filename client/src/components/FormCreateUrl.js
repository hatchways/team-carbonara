import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, FormControl, FormLabel, InputAdornment } from '@material-ui/core';

const styles = {
  root: {
    // margin: theme.spacing.unit * 2,
    // border: "2px solid black",
    display: 'inline',
    width: '100%',
    '& p': {
      width: '110px',
      'border-right': '1px solid grey',
    },
  },
};

function FormCreateUrl(props) {
  const { classes, setUrl } = props;

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="my-input">Unique Link:</FormLabel>
        <TextField
          className={classes.root}
          id="outlined-basic"
          variant="outlined"
          onChange={(e) => setUrl(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">calendapp.com/</InputAdornment>,
          }}
        />
      </FormControl>
    </>
  );
}

export default withStyles(styles)(FormCreateUrl);
