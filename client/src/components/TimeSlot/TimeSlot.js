import React, { useState } from 'react';
import useStylesTimeSlot from './stylesTimeSlot';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

function TimeSlot({ time, userName, meeting, clientTz }) {
  const classes = useStylesTimeSlot();
  const [active, setActive] = useState(false);

  let history = useHistory();
  let { eventDuration, url } = useParams();

  function handleClick() {
    setActive(!active);
  }

  function handleConfirm() {
    history.push({
      pathname: `/${url}/${eventDuration}/confirm`,
      state: {
        name: userName,
        meeting,
        time, //ISOstring
        clientTz,
      },
    });
  }

  return (
    <div className={classes.container}>
      <button onClick={handleClick} className={classes.button}>
        {moment.tz(time, clientTz).format('h:mma')}
      </button>
      {active ? (
        <button onClick={handleConfirm} className={classes.confirmBtn}>
          Confirm
        </button>
      ) : null}
    </div>
  );
}

TimeSlot.propTypes = {
  userName: PropTypes.string.isRequired,
  meeting: PropTypes.object.isRequired,
  time: PropTypes.string.isRequired,
  clientTz: PropTypes.string.isRequired,
};

export default TimeSlot;
