import React, { useState } from 'react';
import useStylesTimeSlots from './stylesTimeSlots';
import TimeSlot from '../TimeSlot/TimeSlot';

function TimeSlotsContainer({ availableTimes, date }) {
  const [activeBtn, setActiveBtn] = useState(null);

  //each button has it's own state
  //when clicking on different button
  //change state from previous button and set state on new button
  function onActive(setActiveCb) {
    console.log('cb exec');
  }

  const classes = useStylesTimeSlots();
  return (
    <div className={classes.timeSlotContainer}>
      <p>{date}</p>
      <div className={classes.btns}>
        {availableTimes.map((time, index) => (
          <TimeSlot onActive={onActive} key={index} timeObj={time} />
        ))}
      </div>
    </div>
  );
}

export default TimeSlotsContainer;
