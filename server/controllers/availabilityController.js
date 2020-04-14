const User = require('../models/User');
const moment = require('moment');
const { google } = require('googleapis');
const calendar = google.calendar('v3');
const { availDays, availSlots } = require('../utils/availabilityHelper.js');

const getFreebusy = async (token, startISO, endISO) => {
  const oauth2client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, `postmessage`);

  oauth2client.setCredentials({
    access_token: token,
  });
  const resp = await calendar.freebusy
    .query({
      auth: oauth2client,
      resource: {
        items: [{ id: 'primary' }],
        timeMin: startISO,
        timeMax: endISO,
      },
    })
    .then((resp) => resp.data.calendars.primary.busy)
    .catch((err) => console.log('ERROR HERE', err));

  return resp;
};

//get available days for a req month
const daysAvailable = async (req, res) => {
  //send from /uniqueurl/meeting
  const reqMonth = parseInt(req.query.month); //0-index
  const reqMeet = 60; //req.query.meetTime; //minutes
  const clientTz = 'US/Central'; //req.query.clientTz;
  const uniqueurl = req.query.uniqueurl;

  const year = reqMonth < moment().month() ? moment().year() + 1 : moment().year();
  let day = reqMonth === moment().month() ? moment().date() : 1; //1 or current day of month (no past days)

  const user = await User.findOne({ url: uniqueurl });
  //.catch res.send("Error: User not found, denied access")

  //if access_token expired
  //getRefreshToken() -> save token and expire time to db

  const startISO = moment.tz([year, reqMonth, day], clientTz).format();
  const endISO = moment.tz([year, 0, 31], clientTz).month(reqMonth).format();

  console.log(reqMonth, startISO, endISO);

  const freebusy = await getFreebusy(process.env.ACCESS_TOKEN, startISO, endISO);
  console.log(freebusy);
  const resp = availDays(reqMonth, freebusy, user.availability, user.timezone, clientTz, reqMeet);

  res.status(200).send({ days: resp });
};

//get available slots for a req day
const timeslotsAvailable = async (req, res) => {
  //send from /uniqueurl/meeting
  const reqMonth = 4; //req.query.month; //0-index
  const reqDay = parseInt(req.query.day); //1-index
  const reqMeet = 60; //req.query.meetTime; //minutes
  const clientTz = 'US/Central'; //req.query.clientTz;
  const uniqueurl = req.query.uniqueurl;

  const year = reqMonth < moment().month() ? moment().year() + 1 : moment().year();
  const date = [year, reqMonth, reqDay];

  const user = await User.findOne({ url: uniqueurl });
  //.catch res.send("Error: User not found, denied access")

  //if access_token expired
  //getRefreshToken() -> save token and expire time to db

  const startISO = moment.tz([year, reqMonth, reqDay], clientTz).format();
  const endISO = moment.tz([year, reqMonth, reqDay + 1], clientTz).format();

  const freebusy = await getFreebusy(process.env.ACCESS_TOKEN, startISO, endISO);

  const resp = availSlots(date, freebusy, user.availability.hours, user.timeZone, clientTz, reqMeet);
  res.status(200).send({ slots: resp });
};

module.exports = { daysAvailable, timeslotsAvailable };
