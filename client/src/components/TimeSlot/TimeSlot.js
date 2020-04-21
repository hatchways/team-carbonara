import React, { useState } from 'react';
import useStylesTimeSlot from './stylesTimeSlot';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

function addTimeToDate(time, dateObj) {
  const timeHoursArr = time.split(':');
  const hours = parseInt(timeHoursArr[0]);
  const minutes = parseInt(timeHoursArr[1]);

  const newDate = moment(dateObj).add(hours, 'h').add(minutes, 'm').toDate();
  return newDate;
}

function TimeSlot({ time, givenName, familyName, meeting, dateObj }) {
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
        name: `${givenName} ${familyName}`,
        meeting,
        date: addTimeToDate(time, dateObj),
        time,
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
  givenName: PropTypes.string.isRequired,
  familyName: PropTypes.string.isRequired,
  meeting: PropTypes.object.isRequired,
  time: PropTypes.string.isRequired,
  dateObj: PropTypes.object.isRequired,
};

export default TimeSlot;
