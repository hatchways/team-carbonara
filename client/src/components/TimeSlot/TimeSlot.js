import React, { useState } from 'react';
import useStylesTimeSlot from './stylesTimeSlot';

function TimeSlot({ timeObj }) {
  const classes = useStylesTimeSlot();
  const [active, setActive] = useState(false);

  function handleClick() {
    setActive(!active);
  }

  function handleConfirm() {}

  return (
    <div className={classes.container}>
      <button onClick={handleClick} className={classes.button}>
        {timeObj.time}
      </button>
      {active ? (
        <button onClick={handleClick} className={classes.confirmBtn}>
          Confirm
        </button>
      ) : null}
    </div>
  );
}

export default TimeSlot;
