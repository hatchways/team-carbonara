import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import OnBoardButton from "../components/OnBoardButton";

const profileSetupPageStyle = (theme) => ({
  root: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    border: "1px solid grey",
    width: "300px",
  },
});

class ProfileSetup extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>Message</div>
        <div>Progress Bar</div>
        <div>choose url-form</div>
        <div>time-zone-form</div>
        <OnBoardButton />
      </div>
    );
  }
}

export default withStyles(profileSetupPageStyle)(ProfileSetup);
