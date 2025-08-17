const User = require('../models/User');
const moment = require('moment');
const { availDays, availSlots } = require('../utils/availabilityHelper.js');
const { getFreebusy } = require('../utils/gcalHelper.js');

//get available days for a req month
const daysAvailable = async (req, res) => {
  //send from /uniqueurl/meeting
  const reqMonth = parseInt(req.query.month); //0-index
  const reqMeet = parseInt(req.query.meetTime); //minutes
  const clientTz = req.query.clientTz;
  const uniqueurl = req.query.uniqueurl;

  const year = reqMonth < moment().month() ? moment().year() + 1 : moment().year();
  let day = reqMonth === moment().month() ? moment().tz(clientTz).date() : 1; //1 or current day of month (no past days)

  try {
    const user = await User.findOne({ url: uniqueurl });
    try {
      const startISO = moment.tz([year, reqMonth, day], clientTz).format();
      const endISO = moment.tz([year, 0, 31], clientTz).month(reqMonth).add(1, 'day').format();

      let freebusy;
      if (user.sub === 'demo') {
        // Sample freebusy data for demo accounts
        freebusy = [
          {
            start: moment.tz([year, reqMonth, day], clientTz).add(2, 'days').startOf('day').format(),
            end: moment.tz([year, reqMonth, day], clientTz).add(2, 'days').endOf('day').format(),
          },
          {
            start: moment.tz([year, reqMonth, day], clientTz).add(5, 'days').hour(13).minute(0).format(),
            end: moment.tz([year, reqMonth, day], clientTz).add(5, 'days').hour(15).minute(0).format(),
          },
        ];
      } else {
        freebusy = await getFreebusy(user.access_token, user.refresh_token, startISO, endISO, uniqueurl);
      }
      // const freebusy = await getFreebusy(user.access_token, user.refresh_token, startISO, endISO, uniqueurl);

      const availableDays = availDays(
        [year, reqMonth, day],
        freebusy,
        user.availability,
        user.timezone,
        clientTz,
        reqMeet,
      );
      res.status(200).send({ days: availableDays });
    } catch (err) {
      res.status(500).send('Internal server error.');
    }
  } catch (err) {
    res.status(400).send('Error: User not found, denied access');
  }
};

//get available slots for a req day
const timeslotsAvailable = async (req, res) => {
  //send from /uniqueurl/meeting
  const reqMonth = parseInt(req.query.month); //0-index
  const reqDay = parseInt(req.query.day); //1-index
  const reqMeet = parseInt(req.query.meetTime); //minutes
  const clientTz = req.query.clientTz;
  const uniqueurl = req.query.uniqueurl;

  const year = reqMonth < moment().month() ? moment().year() + 1 : moment().year();
  const date = [year, reqMonth, reqDay];
  try {
    const user = await User.findOne({ url: uniqueurl });
    try {
      const startISO = moment.tz([year, reqMonth, reqDay], clientTz).format();
      const endISO = moment.tz([year, reqMonth, reqDay], clientTz).add(1, 'day').format();
      let freebusy;
      if (user.sub === 'demo') {
        // Sample freebusy data for demo accounts
        freebusy = [
          {
            start: moment.tz([year, reqMonth, reqDay], clientTz).hour(10).minute(0).format(),
            end: moment.tz([year, reqMonth, reqDay], clientTz).hour(11).minute(0).format(),
          },
          {
            start: moment.tz([year, reqMonth, reqDay], clientTz).hour(14).minute(0).format(),
            end: moment.tz([year, reqMonth, reqDay], clientTz).hour(15).minute(0).format(),
          },
        ];
      } else {
        freebusy = await getFreebusy(user.access_token, user.refresh_token, startISO, endISO, uniqueurl);
      }
      // const freebusy = await getFreebusy(user.access_token, user.refresh_token, startISO, endISO, uniqueurl);

      const availableSlots = availSlots(
        date,
        freebusy,
        user.availability.hours,
        user.availability.days,
        user.timezone,
        clientTz,
        reqMeet,
      );

      res.status(200).send({ slots: availableSlots });
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error.');
    }
  } catch (err) {
    res.status(400).send('Error: User not found, denied access');
  }
};

module.exports = { daysAvailable, timeslotsAvailable };
