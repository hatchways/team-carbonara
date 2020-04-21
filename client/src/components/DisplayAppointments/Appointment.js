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
import { FaRegCalendarCheck, FaRegTrashAlt } from 'react-icons/fa';

import PropTypes from 'prop-types';
import * as moment from 'moment-timezone';

const styles = (theme) => ({
  appointment: {
    width: '100%',
  },
  expansionSummary: {
    '&:hover': {
      backgroundColor: '#f7f7f7',
    },
  },
  time: {
    verticalAlign: 'bottom',
    fontSize: '0.8rem',
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
    width: '300px',
    padding: '0 5rem 0 3rem',
  },
  button: {
    width: '90%',
    textTransform: 'none',
    fontSize: '0.8rem',
  },
});

function Appointment({ classes, appointment }) {
  return (
    <div className={classes.appointment}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<MdExpandMore />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          className={classes.expansionSummary}
        >
          <div className={classes.column}>
            <FaRegCalendarCheck size={23} className={classes.icon} />{' '}
            <span className={classes.time}>
              {moment(appointment.apptTime).tz(appointment.userTz).format('hh:mma')} -
              {moment(appointment.apptTime).tz(appointment.userTz).add(appointment.meetTime, 'm').format('hh:mma')}
            </span>
          </div>
          <div>
            <Typography variant="subtitle1">{appointment.guestName}</Typography>
            <Typography>{appointment.meetingName}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              startIcon={<FaRegTrashAlt size={15} />}
            >
              Cancel
            </Button>
          </div>
          <div>
            <Typography variant="subtitle1">Email</Typography>
            <Typography gutterBottom="true">{appointment.guestEmail}</Typography>
            <Typography variant="subtitle1">Invitee Timezone</Typography>
            <Typography gutterBottom="true">{appointment.guestTz.replace('_', ' ')}</Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider />
      </ExpansionPanel>
    </div>
  );
}

Appointment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Appointment);
