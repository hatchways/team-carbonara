import React, { useEffect, useState } from 'react';
import { Paper, Typography, Divider, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import useStylesCalendar from './stylesCalendar';
import { useParams } from 'react-router-dom';
import handleFetchErrors from '../../utils/handleFetchErrors';
import Calendar from 'react-calendar';
import { FaClock } from 'react-icons/fa';
import TimeSlotsContainer from '../../Components/TimeSlotsContainer/TimeSlotsContainer';
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
function CalendarPage() {
  const classes = useStylesCalendar();
  const [clientTz, setClientTz] = useState(moment.tz.guess());
  const today = moment.tz(clientTz);
  const [calendarVal, setCalendarVal] = useState(null);
  const [strDate, setDate] = useState(null); //timeslot header display
  const [userName, setUserName] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [meeting, setMeeting] = useState('');
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [currMonth, setCurrMonth] = useState(today.month());

  let { eventDuration, url } = useParams();

  useEffect(() => {
    //fetch user data
    fetch(`/api/user/${url}/${eventDuration}`)
      .then(handleFetchErrors)
      .then((res) => res.json())
      .then((data) => {
        data.family_name ? setUserName(data.given_name + ' ' + data.family_name) : setUserName(data.given_name);

        //find specific meeting type
        const meeting = data.meetings.filter((meeting) => meeting.duration === parseInt(eventDuration));
        setMeeting(meeting[0]);
      })
      .catch((e) => console.log('Error ' + e));
  }, [url, eventDuration]);

  useEffect(() => {
    // function fetchAvailableDays
    fetch(`/api/availability/days?month=${currMonth}&meetTime=${eventDuration}&clientTz=${clientTz}&uniqueurl=${url}`)
      .then((res) => res.json())
      .then((data) => {
        setAvailableDays(data.days);
        setShowTimeSlots(false);
        setCalendarVal(null);
      });
  }, [clientTz, currMonth, eventDuration, url]);

  function setMaxDate() {
    const date = new Date();
    const maxDate = new Date(date.setMonth(date.getMonth() + 3, 31));
    return maxDate;
  }

  function setMinDate() {
    const minDate = new Date(moment().tz(clientTz).format());
    return minDate;
  }

  function fetchAvailableTimeSlots(date, month) {
    fetch(
      `/api/availability/timeslots?month=${month}&day=${date}&meetTime=${eventDuration}&clientTz=${clientTz}&uniqueurl=${url}`,
    )
      // .then(handleFetchErrors)
      .then((res) => res.json())
      .then((data) => {
        setTimeSlots(data.slots);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function handleClick(value) {
    const date = value.getDate();
    const month = value.getMonth();
    const strDay = getDayOfWeek(value.getDay());
    const strMonth = getMonth(value.getMonth());
    setCalendarVal(value);
    setDate(`${strDay}, ${strMonth} ${date}`);
    setShowTimeSlots(true);
    setLoading(true);
    fetchAvailableTimeSlots(date, month);
  }

  function handleMonth(event) {
    setCurrMonth(event.activeStartDate.getMonth());
  }

  function tileDisabled(activeStartDate) {
    const day = activeStartDate.date.getDate();
    if (availableDays.indexOf(day) < 0) return true;
  }

  function tileContent(date) {
    if (date.date.getMonth() === today.month() && date.date.getDate() === today.date()) {
      return <div id="today">*</div>;
    } else return null;
  }
  return (
    <Paper elevation={6} className={classes.calendarContainer}>
      <div className={classes.eventInfo}>
        <Typography variant="h6">{userName}</Typography>
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
            tileContent={tileContent}
            minDate={setMinDate()}
            maxDate={setMaxDate()}
            onClickDay={handleClick}
            value={calendarVal}
            tileDisabled={tileDisabled}
          />
          <Autocomplete
            id="timezone-field"
            disableClearable={true}
            className={classes.timezone}
            value={clientTz}
            options={moment.tz.names()}
            getOptionLabel={(option) => option.replace('_', ' ') + ' (GMT' + moment.tz(option).format('Z') + ')'}
            renderInput={(params) => <TextField {...params} label="Type a city or zone" variant="outlined" />}
            onChange={(e, v) => setClientTz(v)}
          />
        </div>
        {showTimeSlots ? (
          <TimeSlotsContainer
            userName={userName}
            meeting={meeting}
            availableTimes={timeSlots}
            date={strDate}
            isLoading={isLoading}
            clientTz={clientTz}
          />
        ) : null}
      </div>
    </Paper>
  );
}

export default CalendarPage;
