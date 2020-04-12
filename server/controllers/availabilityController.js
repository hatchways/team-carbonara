// const _ = require('lodash');
const User = require('../models/User');
const moment = require('moment');
const { google } = require('googleapis');
const calendar = google.calendar('v3');
const { availDays, availSlots } = require('../utils/availabilityHelpers.js');

const getFreebusy = async (token, startISO, endISO) => {
  const oauth2client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, `postmessage`);

  oauth2client.setCredentials({
    access_token: token,
  });
  const resp = calendar.freebusy
    .query({
      auth: oauth2client,
      resource: {
        items: [{ id: 'primary' }],
        timeMin: startISO,
        timeMax: endISO,
      },
    })
    .then((resp) => resp.data.calendars.primary)
    .catch((err) => console.log('ERROR HERE', err));

  return resp;
};

//get available days for a req month
const daysAvailable = async (req, res) => {
  //send from /uniqueurl/meeting
  const reqMonth = req.query.month; //0-index
  const reqMeet = 60; //req.params.meetTime; //minutes
  const clientTz = 'US/Central'; //req.params.clientTz;
  const uniqueurl = req.params.uniqueurl;

  const year = reqMonth === 0 && moment().month() !== 0 ? moment().year() + 1 : moment().year();
  const user = await User.findOne({ url: uniqueurl });

  //if access_token expired
  //getRefreshToken() -> set to session?

  const startISO = moment.tz([year, 0, 31], clientTz).month(reqMonth).format();
  const endISO = moment.tz([year, 0, 31], clientTz).month(reqMonth).format();

  const freebusy = await getFreebusy(process.env.ACCESS_TOKEN, startISO, endISO);

  const resp = availDays(reqMonth, freebusy, user.availability, user.timezone, clientTz, reqMeet);

  res.status(200).send({ days: resp });
};

//get available slots for a req day
const timeslotsAvailable = async (req, res) => {
  //send from /uniqueurl/meeting
  const reqMonth = req.query.month; //0-index
  const reqDay = req.query.day; //1-index
  const reqMeet = 60; //req.params.meetTime; //minutes
  const clientTz = 'US/Central'; //req.params.clientTz;
  const uniqueurl = req.params.uniqueurl;

  const year = reqMonth === 0 && moment().month() !== 0 ? moment().year() + 1 : moment().year();
  const date = [year, reqMonth, req.query.day];

  const user = await User.findOne({ url: uniqueurl });

  //refresh token if expired

  const startISO = moment.tz([year, reqMonth, reqDay], clientTz);
  const endISO = moment.tz([year, reqMonth, reqDay + 1], clientTz);

  const freebusy = await getFreebusy(process.env.ACCESS_TOKEN, startISO, endISO);

  const resp = availSlots(date, freebusy, user.availability, user.timezone, clientTz, reqMeet);
  res.status(200).send({ slots: resp });
};

module.exports = { daysAvailable, timeslotsAvailable };
