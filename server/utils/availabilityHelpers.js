const moment = require('moment-timezone');

// { Jan: 0 , Feb: 1 , ... }
const months = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

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

function getStartDate(queryMonth) {
  //use client start date? //moment.tz.date
  const today = new Date();
  return queryMonth === today.getMonth() ? moment().date() : 1;
}

function recursIsDayAvail(freebusy, busyIndex, availEnd, meetTime, availStart) {
  //if day is valid weekday, but has some busy blocks in it
  //returns [bool, int, moment]
  console.log('entered recurs');
  console.log('args', freebusy, busyIndex, availEnd.format(), meetTime, availStart.format());
  let currBusy = freebusy[busyIndex];
  let nextBusy = freebusy[busyIndex + 1];

  if (!nextBusy || moment(nextBusy.start).isSameOrAfter(availEnd)) {
    if (availStart.isAfter(currBusy.end)) {
      return Math.abs(availStart.diff(availEnd, 'minutes')) >= meetTime
        ? [true, busyIndex, availEnd.add(meetTime, 'm')]
        : [false, busyIndex];
    }
    return Math.abs(moment(currBusy.end).diff(availEnd, 'minutes')) >= meetTime
      ? [true, busyIndex, moment(currBusy.end).add(meetTime, 'm')]
      : [false, busyIndex];
  }
  if (availStart.isAfter(currBusy.end)) {
    if (Math.abs(availStart.diff(moment(nextBusy.start), 'minutes') >= meetTime)) {
      return [true, busyIndex, availStart.add(meetTime, 'm')];
    } else if (moment(nextBusy.end).isSameOrAfter(availEnd)) {
      return [false, busyIndex];
    } else {
      return recursIsDayAvail(freebusy, busyIndex, availEnd, meetTime, availStart);
    }
  }
  if (Math.abs(moment(currBusy.end).diff(moment(nextBusy.start), 'minutes')) >= meetTime) {
    return [true, busyIndex, moment(currBusy.end).add(meetTime, 'm')];
  } else if (moment(nextBusy.end).isSameOrAfter(availEnd)) {
    return [false, busyIndex];
  } else {
    return recursIsDayAvail(freebusy, busyIndex, availEnd, meetTime, availStart);
  }
}

function availDays(freebusy, userAvail, userTz, clientTz, reqYear, reqMonth, reqMeet) {
  //return available days in user timezone, checks for booked days -> make arr of available blocks
  const clientDayStart = moment.tz('12:00am', 'h:mma', clientTz).tz(userTz);
  const sigTzOffset = clientDayStart.isBetween(
    moment.tz(`${userAvail.hours.start.hour}:${userAvail.hours.start.minute}`, 'h:mm', userTz),
    moment.tz(`${userAvail.hours.start.hour}:${userAvail.hours.start.minute}`, 'h:mm', userTz),
  ); //and there is time for a meeting in either block, assume true for meeting < 60min
  console.log('clientinfo', clientTz, clientDayStart.format(), sigTzOffset);

  const monthNum = months[reqMonth];
  const numDays = moment([reqYear, 0, 31]).month(monthNum).date();
  //edge case: client month starts before user month starts -> some mo/1 may not render
  //use client month to fetch freebusy
  let day = getStartDate(monthNum); //1 or current day of month (no past days)
  let b = 0;
  let avail = [];
  console.log('num', numDays, day, freebusy[b]);

  while (day <= numDays) {
    console.log('enter while', reqYear, monthNum, day, userAvail);
    let block = freebusy[b];
    let start = moment.tz(
      `${reqYear}/${monthNum}/${day} ${userAvail.hours.start.hour}:${userAvail.hours.start.minute}`,
      `YYYY/MM/DD hh:mm`,
      userTz,
    );
    let end = moment.tz(
      `${reqYear}/${monthNum}/${day} ${userAvail.hours.end.hour}:${userAvail.hours.end.minute}`,
      `YYYY/MM/DD hh:mm`,
      userTz,
    );
    let busyStart;
    let busyEnd;

    console.log(block, start.format(), end.format(), day, numDays);

    if (!userAvail.days[weekdays[start.day()]]) {
      //invalid weekday
      day++;
      console.log('invalid weekday go to', day);
    } else if (!block) {
      //valid weekday, no more busy blocks
      avail.push(start.format());
      day++;
      console.log('no more busy', start.format(), day, numDays);
    } else {
      busyStart = moment(block.start);
      busyEnd = moment(block.end);
      if (busyStart.isSameOrBefore(start)) {
        console.log('entered here');
        if (busyEnd.isSameOrBefore(start)) {
          b++;
          console.log('nextblock', b, block, !freebusy[b], day, numDays);
        } else if (busyEnd.isSameOrAfter(end)) {
          console.log('skip day, busy');
          day++;
        } else if (busyEnd.isBefore(end)) {
          let x = recursIsDayAvail(freebusy, b, end, reqMeet, start);
          b = x[1];
          if (x[0]) {
            avail.push(x[2].format()); //meeting start time
            if (clientDayStart.year(reqYear).month(reqMonth).date(day).isAfter(x[2])) {
              x = recursIsDayAvail(freebusy, b, end, reqMeet, clientDayStart.year(reqYear).month(reqMonth).date(day));
              b = x[1];
              if (x[0]) avail.push(x[2].format());
            }
            day++;
          }
        }
      } else if (busyStart.isAfter(start)) {
        console.log(
          'busystart after start',
          start.format(),
          busyStart.format(),
          Math.abs(start.diff(busyStart, 'minutes')),
        );
        if (Math.abs(start.diff(busyStart, 'minutes')) > reqMeet) {
          console.log('meet btwn start and block');
          avail.push(start.format());
          day++;
        } else if (busyEnd.isSameOrAfter(end)) {
          day++;
        } else if (busyEnd.isBefore(end)) {
          let x = recursIsDayAvail(freebusy, b, end, reqMeet, start);
          b = x[1];
          if (x[0]) {
            avail.push(x[2].format());
            if (clientDayStart.year(reqYear).month(reqMonth).date(day).isAfter(x[2])) {
              x = recursIsDayAvail(freebusy, b, end, reqMeet, clientDayStart.year(reqYear).month(reqMonth).date(day));
              b = x[1];
              if (x[0]) avail.push(x[2].format());
            }
            day++;
          }
        }
      }
    }
  }
  console.log('finish loop');

  let clientAvail = avail.map((time) => moment.tz(time, clientTz).date());
  //remove duplicate dates if any
  return clientAvail;
}

function addToSlots(blockStart, blockEnd, hoursEnd, reqMeet, slotTime, slots) {
  while (blockStart.isBefore(hoursEnd)) {
    console.log('entered here', blockStart.format(), blockEnd.format());
    if (Math.abs(blockStart.diff(blockEnd, 'minutes')) >= reqMeet) {
      slots.push(blockStart.format());
      blockStart.add(slotTime, 'm');
    } else {
      break;
    }
  }
  return slots;
}

function availSlots(date, userHours, userTz, busy, reqMeet, clientTz) {
  //need freebusy for 1 client day
  //compare with user avail hours -> may be busy.start , end , unavail, start, busy.end
  //translate into clientTz
  // const sigTzOffset = clientDayStart.isBetween(
  //   moment.tz(`${userHours.start.hour}:${userHours.start.minute}`, 'h:mm', userTz),
  //   moment.tz(`${userHours.start.hour}:${userHours.start.minute}`, 'h:mm', userTz),
  // );
  const slots = [];
  const slotTime = reqMeet > 15 ? 30 : 15;
  let b = 0;
  //if no significant offset

  //client date -> usertz -> set to userhours times
  let curr = moment(date).hour(userHours.start.hour).minute(userHours.start.minute);
  let end = moment(date).hour(userHours.end.hour).minute(userHours.end.minute);

  while (busy[b] && curr.isBefore(end)) {
    if (Math.abs(curr.diff(end, 'minutes')) < reqMeet) {
      break;
    }
    let busyStart = moment(busy[b].start);
    let busyEnd = moment(busy[b].end);

    if (busyEnd.isSameOrBefore(curr)) {
      b++;
      console.log(b, busy[b], !busy[b]);
    } else {
      if (busyStart.isAfter(curr)) {
        if (busyStart.isAfter(end)) {
          addToSlots(curr, end, end, reqMeet, slotTime, slots);
        } else {
          addToSlots(curr, busyStart, end, reqMeet, slotTime, slots);
          curr = busyEnd;
          b++;
        }
      }
    }
  }
  if (!busy[b]) {
    addToSlots(curr, end, end, reqMeet, slotTime, slots);
  }
  return slots;
}

module.exports = { availDays, recursIsDayAvail, availSlots };
