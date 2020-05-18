const moment = require('moment-timezone');
const weekdays = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

//day is valid weekday, but has some busy blocks btwn dayStart, dayEnd
//check for at least one valid meeting time
//returns [bool, int, moment]
function recursIsDayAvail(freebusy, busyIndex, start, end, reqMeet, userStart, userEnd, userTz) {
  let busy = freebusy[busyIndex];
  let curr = moment(start);
  const dayEnd = moment(end);

  if (curr.isSameOrAfter(dayEnd)) {
    return [false, busyIndex + 1];
  }
  if (busy && curr.isBetween(busy.start, busy.end, null, '[)')) {
    //currTime is in busy block, move currTime forward.
    //'[)' -> includes busyStart, excludes busyEnd since meetings can start when busy period ends.
    curr = moment(busy.end);
    return recursIsDayAvail(freebusy, busyIndex + 1, curr, dayEnd, reqMeet, userStart, userEnd);
  }
  if (busy && curr.isSameOrAfter(busy.end)) {
    //if busy.end is before curr, go to next busy
    return recursIsDayAvail(freebusy, busyIndex + 1, curr, dayEnd, reqMeet, userStart, userEnd);
  }
  if (userEnd.isBefore(userStart) && (curr.isBefore(userEnd) || curr.isSameOrAfter(userStart))) {
    //time is valid dayStart->userEnd...userStart->dayEnd
    if (curr.isBefore(userEnd)) {
      if (busy && moment(busy.start).isBefore(userEnd)) {
        //dayStart->curr->busy.start->userEnd, check for meet before busy
        if (Math.abs(curr.diff(busy.start, 'minutes')) >= reqMeet) {
          return [true, busyIndex, curr.format()];
        } else {
          //if no available meeting, move currTime and busyIndex forward
          curr = moment(busy.end);
          return recursIsDayAvail(freebusy, busyIndex + 1, curr, dayEnd, reqMeet, userStart, userEnd);
        }
      } else {
        //dayStart->curr->userEnd (->busy.start), check for meet before userEnd
        if (Math.abs(curr.diff(userEnd, 'minutes')) >= reqMeet) {
          return [true, busyIndex, curr.format()];
        } else {
          //userEnd->userStart is invalid, move curr to userStart
          curr = moment(userStart);
          return recursIsDayAvail(freebusy, busyIndex, curr, dayEnd, reqMeet, userStart, userEnd);
        }
      }
    } else {
      //curr is after userStart, before dayEnd (valid time)
      if (busy && moment(busy.start).isBefore(dayEnd)) {
        //userStart->curr->busy.start->dayEnd, check for meeting before busy
        if (Math.abs(curr.diff(busy.start, 'minutes')) >= reqMeet) {
          return [true, busyIndex, curr.format()];
        } else {
          curr = moment(busy.end);
          return recursIsDayAvail(freebusy, busyIndex + 1, curr, dayEnd, reqMeet, userStart, userEnd);
        }
      } else {
        //userStart->curr->dayEnd (->busy)
        return Math.abs(curr.diff(dayEnd, 'minutes')) >= reqMeet
          ? [true, busyIndex, curr.format()]
          : [false, busyIndex];
      }
    }
  } else if (userStart.isBefore(userEnd) && curr.isBetween(userStart, userEnd, null, '[)')) {
    //valid time for dayStart...userStart->userEnd...dayEnd
    //meeting can start at userStart, cannot start at userEnd
    if (busy && moment(busy.start).isBefore(userEnd)) {
      //userStart->curr->busy->userEnd, check for meet before busy
      if (Math.abs(curr.diff(busy.start, 'minutes')) >= reqMeet) {
        return [true, busyIndex, curr];
      } else {
        curr = moment(busy.end);
        return recursIsDayAvail(freebusy, busyIndex + 1, curr, dayEnd, reqMeet, userStart, userEnd);
      }
    } else {
      //userStart->curr->userEnd (->busy)
      return Math.abs(curr.diff(dayEnd, 'minutes')) >= reqMeet ? [true, busyIndex, curr.format()] : [false, busyIndex];
    }
  } else {
    //time is invalid...
    if (curr.isBefore(userStart)) {
      // console.log('go to userstart');
      curr = userStart;
      return recursIsDayAvail(freebusy, busyIndex, curr, dayEnd, reqMeet, userStart, userEnd);
    } else {
      return [false, busyIndex];
    }
  }
}

//return available days in client timezone, checks for booked/unavailable days -> return arr of ints of valid days
function availDays(startDate, freebusy, userAvail, userTz, clientTz, reqMeet) {
  let b = 0;
  let block, start, end, busyStart, busyEnd, userStart, userEnd, x;
  const avail = [];

  //used clientTz month to fetch freebusy
  const currDay = moment.tz(startDate, clientTz); //12am client time

  const monthEnd = moment.tz([startDate[0], 0, 31], clientTz).month(startDate[1]);

  userStart = moment
    .tz(currDay.format(), userTz)
    .hour(userAvail.hours.start.split(':')[0])
    .minute(userAvail.hours.start.split(':')[1]);
  userEnd = moment
    .tz(currDay.format(), userTz)
    .hour(userAvail.hours.end.split(':')[0])
    .minute(userAvail.hours.end.split(':')[1]);

  const endFirst = userStart.isBefore(currDay); //bool, client 12am occurs between userAvailable userHours
  //userStart for user's following day falls within this client day (if endFirst use userStart for next day)
  //client 12am -> userEnd...user 12am...userStart -> client 12am

  while (currDay.isSameOrBefore(monthEnd)) {
    block = freebusy[b];
    start = moment.tz(currDay.format(), userTz); //same as currDay, use userTz for available hours comparison
    end = moment(start.format()).add(1, 'day');

    //if day is today
    if (start.date() === moment().date() && start.month() === moment().month()) {
      start = moment.tz(userTz);
      start.second(0).millisecond(0);
    }

    //set correct date for weekday comparison if initial date in previous month
    if (userEnd.month() !== start.month()) {
      userStart.year(start.year()).month(start.month()).date(start.date());
      userEnd.year(start.year()).month(start.month()).date(start.date());
    }

    if (
      (!endFirst && !userAvail.days[weekdays[start.day()]]) ||
      (endFirst &&
        !userAvail.days[weekdays[start.day()]] &&
        !userAvail.days[weekdays[userStart.date(start.date()).add(1, 'day').day()]])
    ) {
      //console.log('invalid weekday, if endFirst both days are invalid')
      currDay.add(1, 'day');
    } else if (!block) {
      // console.log('valid weekday, no more busy blocks');
      avail.push(start.format());
      currDay.add(1, 'day');
    } else {
      //valid weekday w/ busy blocks
      busyStart = moment(block.start);
      busyEnd = moment(block.end);
      if (start.isSameOrAfter(busyEnd)) {
        // console.log('start after current busyEnd, go to next busy ');
        b++;
      } else if (busyStart.isSameOrBefore(start) && busyEnd.isSameOrAfter(end)) {
        // console.log('day fully busy, go to next day');
        currDay.add(1, 'day');
      } else {
        //set month too in case userStart changed in weekday check
        userStart.month(start.month()).date(start.date());
        userEnd.month(start.month()).date(start.date());

        if (endFirst) userStart.add(1, 'day');

        //if endfirst, check if either day is unavailable for user
        if (endFirst && !userAvail.days[weekdays[userEnd.day()]]) {
          //check only userStart->dayEnd
          x = recursIsDayAvail(freebusy, b, userStart.format(), end.format(), reqMeet, userStart, userEnd, userTz);
        } else if (endFirst && !userAvail.days[weekdays[userStart.day()]]) {
          //check only dayStart->userEnd
          x = recursIsDayAvail(freebusy, b, start.format(), userEnd.format(), reqMeet, userStart, userEnd, userTz);
        } else {
          x = recursIsDayAvail(freebusy, b, start.format(), end.format(), reqMeet, userStart, userEnd, userTz);
        }
        if (x[0]) avail.push(x[2]);
        b = x[1];
        currDay.add(1, 'day');
      }
    }
  }

  let clientAvail = avail.map((time) => moment.tz(time, clientTz).date());
  clientAvail = clientAvail.filter((el, i) => clientAvail.indexOf(el) === i);
  //remove duplicate dates if any
  return clientAvail;
}

//in a block of available time, add valid timeslots
//checks for meeting every {slotTime} minutes
function addToSlots(currStart, availEnd, reqMeet, slotTime, slots) {
  while (currStart.isBefore(availEnd)) {
    if (Math.abs(currStart.diff(availEnd, 'minutes')) >= reqMeet) {
      slots.push(currStart.format());
      currStart.add(slotTime, 'm');
    } else {
      break;
    }
  }
  return slots;
}

//takes in freebusy for client 12am-12am, finds and returns available time slots
function availSlots(date, freebusy, userHours, userDays, userTz, clientTz, reqMeet) {
  const slots = [];

  //check for a meeting every 30min for any length meeting. (15min for 15min meeting)
  const slotTime = reqMeet > 15 ? 30 : 15;

  let b = 0;
  let busyStart, busyEnd, busy;

  //12am client time -> userTz (same moment)
  //all comparisons in userTz
  let curr = moment.tz(date, clientTz).tz(userTz);

  const dayStartISO = curr.format(); //end time must not depend on curr moment
  const end = moment(dayStartISO).add(1, 'day'); //12am next day

  const userStart = moment(dayStartISO).hour(userHours.start.split(':')[0]).minute(userHours.start.split(':')[1]);
  const userEnd = moment(dayStartISO).hour(userHours.end.split(':')[0]).minute(userHours.end.split(':')[1]);

  //if dayStart is between userHours, userStart will end up before dayStart when setting hour
  const endFirst = userStart.isBefore(curr); //bool
  if (endFirst) userStart.add(1, 'day');

  //if userStart becomes an invalid user weekday, add 1 more day (userStart now after day end)
  if (!userDays[weekdays[userStart.day()]]) userStart.add(1, 'day');

  //if userEnd is an invalid weekday (endFirst)
  if (!userDays[weekdays[userEnd.day()]]) curr = userStart;

  //if day is today
  if (curr.date() === moment().date() && curr.month() === moment().month()) {
    curr = moment.tz(userTz);
    //only allow appointment at least 1 hour from current time
    curr.add(2, 'hour');
    curr.minute(0).second(0).millisecond(0);
  }

  while (curr.isBefore(end)) {
    if (Math.abs(curr.diff(end, 'minutes')) < reqMeet) {
      //no meetings before dayEnd, break loop
      break;
    }
    busy = freebusy[b];
    if (busy) {
      busyStart = moment(busy.start);
      busyEnd = moment(busy.end);
    }

    if (busy && busyEnd.isSameOrBefore(curr)) {
      //busyStart must always be same or after curr
      b++;
      continue;
    }

    //valid times for significant difference timezone (12am between user hours)
    if (endFirst && curr.isBefore(userEnd)) {
      //dayStart->curr->userEnd...userStart->dayEnd
      if (busy && busyStart.isBefore(userEnd)) {
        addToSlots(curr, busyStart, reqMeet, slotTime, slots);
        curr = busyEnd;
        b++;
      } else {
        addToSlots(curr, userEnd, reqMeet, slotTime, slots);
        curr = userStart;
      }
    } else if (endFirst && curr.isSameOrAfter(userStart)) {
      //dayStart->userEnd...userStart->curr->dayEnd
      if (busy && busyStart.isBefore(end)) {
        addToSlots(curr, busyStart, reqMeet, slotTime, slots);
        curr = busyEnd;
        b++;
      } else {
        addToSlots(curr, end, reqMeet, slotTime, slots);
        curr = end;
      }

      //valid times for other timezones (12am outside user hours)
    } else if (!endFirst && curr.isBetween(userStart, userEnd, null, '[)')) {
      //dayStart...userStart->curr->userEnd...dayEnd
      //meeting can start at userStart time, inclusive
      if (busy && busyStart.isBefore(userEnd)) {
        addToSlots(curr, busyStart, reqMeet, slotTime, slots);
        curr = busyEnd;
        b++;
      } else {
        addToSlots(curr, userEnd, reqMeet, slotTime, slots);
        curr = end;
      }

      //current time not during user available hours (invalid)
    } else {
      if (curr.isBefore(userStart)) {
        curr = userStart;
      } else break; //break loop if current time passes user hours (userStart-> userEnd) and doesn't reach dayEnd
    }
  }

  return slots.map((time) => moment.tz(time, clientTz).format());
}

module.exports = { availDays, availSlots };
