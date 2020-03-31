import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, FormControl, FormLabel, InputAdornment } from '@material-ui/core';

const styles = {
  root: {
    // margin: theme.spacing.unit * 2,
    // border: "2px solid black",
    display: 'inline-block',
    width: '100%',
    '& p': {
      width: '105px',
      'border-right': '1px solid #eee',
    },
  },
};

function FormCreateUrl(props) {
  const { classes, setUrl } = props;

  return (
    <>
      <FormControl>
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
