import React from 'react';
import useStylesTimeSlots from './stylesTimeSlots';
import TimeSlot from '../TimeSlot/TimeSlot';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

function TimeSlotsContainer({ isLoading, availableTimes, date, userName, meeting, clientTz }) {
  const classes = useStylesTimeSlots();
  return (
    <div className={classes.timeSlotContainer}>
      <p>{date}</p>
      <div className={classes.btns}>
        {isLoading ? (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        ) : (
          availableTimes.map((time, index) => (
            <TimeSlot userName={userName} meeting={meeting} key={index} time={time} clientTz={clientTz} />
          ))
        )}
      </div>
    </div>
  );
}

TimeSlotsContainer.propTypes = {
  date: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  meeting: PropTypes.object.isRequired,
  availableTimes: PropTypes.array.isRequired,
  clientTz: PropTypes.string.isRequired,
};

export default TimeSlotsContainer;
