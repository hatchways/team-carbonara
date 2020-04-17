import React from 'react';
import useStylesTimeSlots from './stylesTimeSlots';
import TimeSlot from '../TimeSlot/TimeSlot';
import PropTypes from 'prop-types';

function TimeSlotsContainer({ availableTimes, date, givenName, familyName, meeting, dateObj }) {
  const classes = useStylesTimeSlots();

  return (
    <div className={classes.timeSlotContainer}>
      <p>{date}</p>
      <div className={classes.btns}>
        {availableTimes.map((time, index) => (
          <TimeSlot
            dateObj={dateObj}
            givenName={givenName}
            meeting={meeting}
            familyName={familyName}
            key={index}
            timeObj={time}
          />
        ))}
      </div>
    </div>
  );
}

TimeSlotsContainer.propTypes = {
  date: PropTypes.string.isRequired,
  givenName: PropTypes.string.isRequired,
  familyName: PropTypes.string.isRequired,
  meeting: PropTypes.object.isRequired,
  availableTimes: PropTypes.array.isRequired,
};

export default TimeSlotsContainer;
