import React, { useEffect, useState } from 'react';
import { Paper, Typography, Divider } from '@material-ui/core';
import useStylesCalendar from './stylesCalendar';
import { useParams } from 'react-router-dom';
import handleFetchErrors from '../../utils/handleFetchErrors';
import Calendar from 'react-calendar';
import { FaClock } from 'react-icons/fa';
import TimeSlotsContainer from '../../components/TimeSlotsContainer/TimeSlotsContainer';
import './CalendarComponent.css';
import moment from 'moment-timezone';

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
  const maxDate = new Date(date.setMonth(date.getMonth() + 3, 31));
  return maxDate;
}

function setMinDate() {
  const minDate = new Date(moment().format());
  return minDate;
}

function parseISOstr(slotsObj) {
  const parsedSlots = slotsObj.map((timeStr) => moment(timeStr).format('h:mm'));
  return parsedSlots;
}

function CalendarPage() {
  const classes = useStylesCalendar();
  const [clientTz, setClientTz] = useState(moment.tz.guess());
  const [dateObj, setDateObj] = useState(null);
  const [strDate, setDate] = useState(null);
  const [user, setUser] = useState({
    unavailableDays: [],
  });
  const [isLoading, setLoading] = useState(false);
  const [meeting, setMeeting] = useState('');
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);

  let { eventDuration, url } = useParams();

  useEffect(() => {
    const today = new Date();

    // function fetchAvailableDays
    fetch(
      `http://localhost:3001/api/availability/days?month=${today.getMonth()}&meetTime=${eventDuration}&clientTz=${clientTz}&uniqueurl=${url}`,
    )
      .then((res) => res.json())
      .then((data) => setAvailableDays(data.days));

    //fetch user data
    fetch(`http://localhost:3001/api/user/${url}/${eventDuration}`)
      .then(handleFetchErrors)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);

        //find specific meeting type
        const meeting = data.meetings.filter((meeting) => meeting.duration === parseInt(eventDuration));
        setMeeting(meeting[0]);
      })
      .catch((e) => console.log('Error ' + e));
  }, [url, eventDuration, clientTz]);

  function fetchAvailableTimeSlots(date, month) {
    fetch(
      `http://localhost:3001/api/availability/timeslots?month=${
        month - 1
      }&day=${date}&meetTime=${eventDuration}&clientTz=${clientTz}&uniqueurl=${url}`,
    )
      // .then(handleFetchErrors)
      .then((res) => res.json())
      .then((data) => {
        const timeSlots = parseISOstr(data.slots);
        setTimeSlots(timeSlots);
        setLoading(false);
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
    setLoading(true);
    fetchAvailableTimeSlots(date, month);
  }

  function handleMonth(event) {
    console.log(event.activeStartDate.getMonth());
    fetch(
      `http://localhost:3001/api/availability/days?month=${event.activeStartDate.getMonth()}&meetTime=${eventDuration}&clientTz=${clientTz}&uniqueurl=${url}`,
    )
      .then((res) => res.json())
      .then((data) => setAvailableDays(data.days));
  }

  function tileDisabled(activeStartDate) {
    const day = activeStartDate.date.getDate();

    if (availableDays.indexOf(day) < 0) {
      return true;
    }
  }
  // console.log(availableDays, meeting);
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
            onActiveStartDateChange={handleMonth}
            onViewChange={() => console.log('month')}
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
            isLoading={isLoading}
          />
        ) : null}
      </div>
    </Paper>
  );
}

export default CalendarPage;
