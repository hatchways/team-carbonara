import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Divider,
  Typography,
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from '@material-ui/core';
import { MdExpandMore } from 'react-icons/md';

import PropTypes from 'prop-types';
import * as moment from 'moment-timezone';

const styles = (theme) => ({
  appointment: {
    width: '100%',
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

function Appointment({ classes, appointment }) {
  return (
    <div className={classes.appointment}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<MdExpandMore />} aria-controls="panel1c-content" id="panel1c-header">
          <div className={classes.column}>
            <Typography className={classes.heading}>{appointment.apptTime}</Typography>
          </div>
          <div className={classes.column}>
            {/* <Typography className={classes.secondaryHeading}>Select trip destination</Typography> */}
            <Typography>{appointment.guestName}</Typography>
            <Typography>{appointment.meetingName}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <Button variant="outlined" color="primary">
              Cancel
            </Button>
          </div>
          <div className={classes.column}>
            <Typography>Email</Typography>
            <Typography>{appointment.guestEmail}</Typography>
            <Typography>Invitee Timezone</Typography>
            <Typography>{appointment.guestTz}</Typography>
          </div>
          <div className={classes.column}></div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

Appointment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Appointment);
