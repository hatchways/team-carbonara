import React, { useState } from 'react';
import useStylesTimeSlot from './stylesTimeSlot';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

function addTimeToDate(time, dateObj) {
  const timeMoment = moment(time, 'h:mma');
  const hour = timeMoment.hour();
  const minute = timeMoment.minute();

  const newDate = dateObj.hour(hour).minutes(minute).format();
  return newDate;
}

function TimeSlot({ time, userName, meeting, dateObj, clientTz }) {
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
        date: addTimeToDate(time, dateObj), //ISOstring
        time,
        clientTz,
      },
    });
  }

  return (
    <div className={classes.container}>
      <button onClick={handleClick} className={classes.button}>
        {time}
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
  dateObj: PropTypes.object.isRequired,
  clientTz: PropTypes.string.isRequired,
};

export default TimeSlot;
