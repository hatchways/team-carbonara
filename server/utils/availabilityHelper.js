const moment = require('moment-timezone');

function recursIsDayAvail(freebusy, busyIndex, start, end, reqMeet, userStart, userEnd, userTz) {
  //if day is valid weekday, but has some busy blocks btwn dayStart, dayEnd
  //returns [bool, int, moment]
  let busy = freebusy[busyIndex];
  let curr = moment(start);
  const dayEnd = moment(end);

  if (curr.isSameOrAfter(dayEnd)) {
    return [false, busyIndex + 1];
  }
  if (busy && curr.isBetween(busy.start, busy.end, null, '[)')) {
    curr = moment(busy.end);
    return recursIsDayAvail(freebusy, busyIndex + 1, curr, dayEnd, reqMeet, userStart, userEnd);
  }
  if (busy && curr.isSameOrAfter(busy.end)) {
    return recursIsDayAvail(freebusy, busyIndex + 1, curr, dayEnd, reqMeet, userStart, userEnd);
  }
  if (userEnd.isBefore(userStart) && (curr.isBefore(userEnd) || curr.isSameOrAfter(userStart))) {
    //time is valid ds->ue us->de , check if meeting valid
    if (curr.isBefore(userEnd)) {
      if (busy && moment(busy.start).isBefore(userEnd)) {
        //curr->busy.start->userEnd
        if (Math.abs(curr.diff(busy.start, 'minutes')) >= reqMeet) {
          return [true, busyIndex, curr.format()];
        } else {
          curr = moment(busy.end);
          return recursIsDayAvail(freebusy, busyIndex + 1, curr, dayEnd, reqMeet, userStart, userEnd);
        }
      } else {
        //curr -> userEnd (->busy.start)
        if (Math.abs(curr.diff(userEnd, 'minutes')) >= reqMeet) {
          return [true, busyIndex, curr.format()];
        } else {
          curr = moment(userStart);
          return recursIsDayAvail(freebusy, busyIndex, curr, dayEnd, reqMeet, userStart, userEnd);
        }
      }
    } else {
      //curr is after userStart, before dayEnd (valid time)
      if (busy && moment(busy.start).isBefore(dayEnd)) {
        //curr->busy.start->dayEnd
        if (Math.abs(curr.diff(busy.start, 'minutes')) >= reqMeet) {
          return [true, busyIndex, curr.format()];
        } else {
          curr = moment(busy.end);
          return recursIsDayAvail(freebusy, busyIndex + 1, curr, dayEnd, reqMeet, userStart, userEnd);
        }
      } else {
        //curr->dayend (->busy)
        return Math.abs(curr.diff(dayEnd, 'minutes')) >= reqMeet
          ? [true, busyIndex, curr.format()]
          : [false, busyIndex];
      }
    }
  } else if (userStart.isBefore(userEnd) && curr.isBetween(userStart, userEnd, null, '[)')) {
    //valid time for us->ue(->de)
    if (busy && moment(busy.start).isBefore(userEnd)) {
      //userStart->curr->busy->userEnd
      if (Math.abs(curr.diff(busy.start, 'minutes')) >= reqMeet) {
        return [true, busyIndex, curr];
      } else {
        curr = moment(busy.end);
        return recursIsDayAvail(freebusy, busyIndex + 1, curr, dayEnd, reqMeet, userStart, userEnd);
      }
    } else {
      //curr->userEnd (->busy)
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

function availDays(reqMonth, freebusy, userAvail, userTz, clientTz, reqMeet) {
  //return available days in user timezone, checks for booked days -> make arr of available blocks
  // { 0: 'Sunday' , ... }
  const weekdays = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  const year = reqMonth < moment().month() ? moment().year() + 1 : moment().year();
  const startDay = reqMonth === moment().month() ? moment().date() : 1; //1 or current day of month (no past days)

  let b = 0;
  let block, start, end, busyStart, busyEnd, userStart, userEnd, x;
  const avail = [];

  //used clientTz month to fetch freebusy
  const currDay = moment.tz([year, reqMonth, startDay], clientTz);
  const monthEnd = moment.tz([year, 0, 31], clientTz).month(reqMonth);

  while (currDay.isBefore(monthEnd)) {
    block = freebusy[b];
    start = moment.tz(currDay.format(), userTz); //same as currDay
    end = moment(start.format()).add(1, 'day');

    //invalid weekday
    if (!userAvail.days[weekdays[start.day()]]) {
      currDay.add(1, 'day');
    } else if (!block) {
      //valid weekday, no more busy blocks
      avail.push(start.format());
      currDay.add(1, 'day');
    } else {
      //valid weekday w/ busy blocks
      busyStart = moment(block.start);
      busyEnd = moment(block.end);
      if (start.isSameOrAfter(busyEnd)) {
        // console.log('start after busyend, go to next busy ');
        b++;
      } else if (busyStart.isSameOrAfter(end)) {
        // console.log('busystart after dayend, add day');
        avail.push(start.format());
        currDay.add(1, 'day');
      } else if (busyStart.isSameOrBefore(start) && busyEnd.isSameOrAfter(end)) {
        // console.log('day fully busy, go to next day');
        currDay.add(1, 'day');
      } else {
        userStart = moment(start.format()).hour(userAvail.hours.start.hour).minute(userAvail.hours.start.minute);
        userEnd = moment(start.format()).hour(userAvail.hours.end.hour).minute(userAvail.hours.end.minute);
        if (userStart.isBefore(start)) userStart.add(1, 'day');
        // console.log(start.format(), start.isSameOrBefore(end), start.format('hhmm'), end.format());
        x = recursIsDayAvail(freebusy, b, start.format(), end.format(), reqMeet, userStart, userEnd, userTz);
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

function availSlots(date, freebusy, userHours, userTz, clientTz, reqMeet) {
  const slots = [];
  const slotTime = reqMeet > 15 ? 30 : 15;
  let b = 0;

  //client date -> usertz -> set to userhours times
  let busyStart, busyEnd, busy;
  let curr = moment.tz(date, clientTz).tz(userTz);
  const end = moment(curr.format()).add(1, 'day');
  const userStart = moment(curr.format()).hour(userHours.start.hour).minute(userHours.start.minute);
  const userEnd = moment(curr.format()).hour(userHours.end.hour).minute(userHours.end.minute);

  const endFirst = userStart.isBefore(curr);
  if (endFirst) userStart.add(1, 'day');

  while (curr.isBefore(end)) {
    if (Math.abs(curr.diff(end, 'minutes')) < reqMeet) {
      break;
    }
    busy = freebusy[b];
    if (busy) {
      busyStart = moment(busy.start);
      busyEnd = moment(busy.end);
    }

    if (busyEnd.isSameOrBefore(curr)) {
      curr = busyEnd;
      b++;
    }
    if (endFirst && curr.isBefore(userEnd)) {
      if (busy && busyStart.isBefore(userEnd)) {
        addToSlots(curr, busyStart, reqMeet, slotTime, slots);
        curr = busyEnd;
        b++;
      } else {
        addToSlots(curr, userEnd, reqMeet, slotTime, slots);
        curr = userStart;
      }
    } else if (endFirst && curr.isSameOrAfter(userStart)) {
      if (busy && busyStart.isBefore(end)) {
        addToSlots(curr, busyStart, reqMeet, slotTime, slots);
        curr = busyEnd;
        b++;
      } else {
        addToSlots(curr, end, reqMeet, slotTime, slots);
        curr = end;
      }
    } else if (!endFirst && curr.isBetween(userStart, userEnd, null, '[)')) {
      if (busy && busyStart.isBefore(userEnd)) {
        addToSlots(curr, busyStart, reqMeet, slotTime, slots);
        curr = busyEnd;
        b++;
      } else {
        addToSlots(curr, userEnd, reqMeet, slotTime, slots);
        curr = end;
      }
    } else {
      if (curr.isBefore(userStart)) {
        curr = userStart;
      } else break;
    }
  }
  let clientSlots = slots.map((time) => moment.tz(time, clientTz).format());
  return clientSlots;
}

module.exports = { availDays, availSlots };
