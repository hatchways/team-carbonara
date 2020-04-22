import React from 'react';
import useStylesTimeSlots from './stylesTimeSlots';
import TimeSlot from '../TimeSlot/TimeSlot';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

function TimeSlotsContainer({ isLoading, availableTimes, date, userName, meeting, dateObj }) {
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
            <TimeSlot dateObj={dateObj} userName={userName} meeting={meeting} key={index} time={time} />
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
};

export default TimeSlotsContainer;
