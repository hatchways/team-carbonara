import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    // margin: theme.spacing.unit * 2,
    // border: "2px solid black",
    background: "orange",
    width: "50px",
  },
};

function OnBoardButton(props) {
  const { classes } = props;
  return <Button className={classes.root}>Continue</Button>;
}

export default withStyles(styles)(OnBoardButton);
