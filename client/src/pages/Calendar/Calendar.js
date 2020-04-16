import React, { useEffect, useState } from 'react';
import { Paper, Typography, Divider } from '@material-ui/core';
import useStylesCalendar from './stylesCalendar';
import { useParams } from 'react-router-dom';
import handleFetchErrors from '../../utils/handleFetchErrors';
import Calendar from 'react-calendar';
import { FaClock } from 'react-icons/fa';
import TimeSlots from '../../components/TimeSlotsContainer/TimeSlotsContainer';
import './CalendarComponent.css';

function getDayOfWeek(index) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[index];
}

function getMonth(index) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[index];
}

function setMaxDate() {
  const date = new Date();
  const maxDate = new Date(date.setMonth(date.getMonth() + 3, 0));
  return maxDate;
}

function setMinDate() {
  const date = new Date();
  const minDate = new Date(date.setMonth(date.getMonth() - 2, 1));
  return minDate;
}

function parseDayAvailbility(daysAvailableObj) {
  let daysUnavailable = [];
  const dayAvailability = Object.entries(daysAvailableObj);
  dayAvailability.filter((day) => {
    //day[1] is bool of weekday
    if (day[1] === false) {
      daysUnavailable.push(day[0]);
      return true;
    }
    return false;
  });

  return daysUnavailable;
}

function CalendarPage() {
  const classes = useStylesCalendar();
  const [strDate, setDate] = useState(null);
  const [user, setUser] = useState({
    unavailableDays: [],
  });
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  //mock data
  const [timeSlots, setTimeSlots] = useState([
    { time: '9:00' },
    { time: '9:30' },
    { time: '10:00' },
    { time: '10:30' },
    { time: '11:00' },
    { time: '11:30' },
    { time: '12:00' },
    { time: '12:00' },
    { time: '12:00' },
    { time: '12:00' },
    { time: '12:00' },
    { time: '12:00' },
  ]);

  let { eventDuration, url } = useParams();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    const unavailableDays = parseDayAvailbility(data.availability['days']);
    data.unavailableDays = unavailableDays;
    setUser(data);
  }, []);

  function fetchAvailableTimeSlots(date, month) {
    fetch(
      `http://localhost:3001/api/availability/timeslots?month=${month}&day=${date}&meetTime=${eventDuration}&clientTz=${user.timezone}&uniqueurl=${url}`,
    )
      .then(handleFetchErrors)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  function handleClick(value, event) {
    const date = value.getDate();
    const month = value.getMonth() + 1;
    const strDay = getDayOfWeek(value.getDay());
    const strMonth = getMonth(value.getMonth());
    setDate(`${strDay}, ${strMonth} ${date}`);
    setShowTimeSlots(true);

    // fetchAvailableTimeSlots(date, month);
  }

  function tileDisabled(activeStartDate) {
    const currentDate = new Date();
    const day = getDayOfWeek(activeStartDate.date.getDay());

    //blocks users unavailable days & days before current date
    if (currentDate >= activeStartDate.date || user.unavailableDays.includes(day)) {
      return true;
    }
  }

  return (
    <Paper elevation={6} className={classes.calendarContainer}>
      <div className={classes.eventInfo}>
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="h4">{eventDuration} Minute Meeting</Typography>
        <div className={classes.duration}>
          <FaClock size={20} />
          <Typography variant="body1">{eventDuration} min</Typography>
        </div>
      </div>
      <Divider orientation="vertical" />
      <div className={classes.selectDay}>
        <div className={classes.calendar}>
          <Typography variant="h5">Select a Date & Time</Typography>
          <Calendar
            minDate={setMinDate()}
            maxDate={setMaxDate()}
            onClickDay={handleClick}
            tileDisabled={tileDisabled}
          />
        </div>
        {showTimeSlots ? <TimeSlots availableTimes={timeSlots} date={strDate} /> : null}
      </div>
    </Paper>
  );
}

export default CalendarPage;
