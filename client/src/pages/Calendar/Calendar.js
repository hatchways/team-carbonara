import React, { useEffect, useState } from 'react';
import { Paper, Typography, Divider } from '@material-ui/core';
import useStylesCalendar from './stylesCalendar';
import { useParams } from 'react-router-dom';
import handleFetchErrors from '../../utils/handleFetchErrors';
import Calendar from 'react-calendar';
import { FaClock } from 'react-icons/fa';
import TimeSlotsContainer from '../../components/TimeSlotsContainer/TimeSlotsContainer';
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
  const [dateObj, setDateObj] = useState(null);
  const [strDate, setDate] = useState(null);
  const [user, setUser] = useState({
    unavailableDays: [],
  });
  const [meeting, setMeeting] = useState('');
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
    //fetch user data
    fetch(`http://localhost:3001/api/user/${url}/${eventDuration}`)
      .then(handleFetchErrors)
      .then((res) => res.json())
      .then((data) => {
        const unavailableDays = parseDayAvailbility(data.availability['days']);
        data.unavailableDays = unavailableDays;
        setUser(data);

        //find specific meeting type
        const meeting = data.meetings.filter((meeting) => {
          if (meeting.duration == eventDuration) {
            return true;
          }
          return false;
        });
        setMeeting(meeting[0]);
      })
      .catch((e) => console.log('Error ' + e));
  }, [url, eventDuration]);

  function fetchAvailableTimeSlots(date, month) {
    fetch(
      `http://localhost:3001/api/availability/timeslots?month=${
        month - 1
      }&day=${date}&meetTime=${eventDuration}&clientTz=${user.timezone}&uniqueurl=${url}`,
    )
      // .then(handleFetchErrors)
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
    setDateObj(value);
    setDate(`${strDay}, ${strMonth} ${date}`);
    setShowTimeSlots(true);

    fetchAvailableTimeSlots(date, month);
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
        <Typography variant="h6">{`${user.given_name} ${user.family_name}`}</Typography>
        <Typography className={classes.meetingName} variant="h4">
          {meeting.meetingName}
        </Typography>
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
        {showTimeSlots ? (
          <TimeSlotsContainer
            givenName={user.given_name}
            familyName={user.family_name}
            meeting={meeting}
            availableTimes={timeSlots}
            date={strDate}
            dateObj={dateObj}
          />
        ) : null}
      </div>
    </Paper>
  );
}

export default CalendarPage;
