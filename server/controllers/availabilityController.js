// const _ = require('lodash');
const User = require('../models/User');
const moment = require('moment');
const { google } = require('googleapis');
const calendar = google.calendar('v3');
const { availDays, availSlots } = require('../utils/availabilityHelpers.js');

//get available days for a req month
const daysAvailable = async (req, res) => {
  const oauth2client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, `postmessage`);

  //send from /uniqueurl/meeting
  const reqYear = 2020; //req.params.year;
  const reqMonth = req.query.month;
  const reqMeet = 60; //req.params.meetTime; //minutes
  const clientTz = 'US/Central'; //req.params.clientTz;
  const uniqueurl = req.params.uniqueurl;
  //get current_user from session
  const user = await User.findOne({ url: uniqueurl });

  //if access_token expired
  //getRefreshToken(current_user) -> set to session?

  oauth2client.setCredentials({
    access_token: process.env.ACCESS_TOKEN, //temporary, use access token from session
  });

  //freebusy request
  const freebusy = calendar.freebusy
    .query({
      auth: oauth2client,
      resource: {
        items: [{ id: 'primary' }],
        timeMin: new Date(2020, 3, 1).toISOString(),
        //use client month/date start times
        timeMax: new Date(2020, 4, 30).toISOString(),
      },
    })
    .then((resp) => resp.data.calendars.primary)
    .catch((err) => console.log('ERROR HERE', err));
  //
  // console.log('log', freebusy);
  console.log('args', mayBusy, userAvail, reqYear, req.query.month, reqMeet);
  const resp = availDays(freebusy, userAvail, userAvail.timeZone, clientTz, reqYear, reqMonth, reqMeet);

  console.log('testDays', resp);
  console.log('aftertest');
  res.status(200).send({ days: resp });
};

//get available slots for a req day
const timeslotsAvailable = (req, res) => {
  const reqMeet = 60; //minutes
  const reqYear = 2020;
  const reqMonth = 4;
  const date = [reqYear, reqMonth, req.query.day];
  //client will hold availability for days
  //freebusy( 12am.date.isoStr.clientTz, 12am.date+1.isoStr.clientTz)
  const may13th = [{ start: '2020-05-20T14:00:00Z', end: '2020-05-20T18:00:00Z' }];
  console.log('pie before test');
  console.log(req.query);
  console.log(
    'testTimeSlots',
    availSlots(date, userAvail.hours, userAvail.timeZone, may13th, reqMeet, clientTz.timeZone),
  );
  console.log('pie');
  res.status(200).send('testing');
};

module.exports = { daysAvailable, timeslotsAvailable };

const userAvail = {
  days: {
    Sunday: false,
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: false,
  },
  //change data input format?
  hours: {
    start: {
      hour: 9,
      minute: 0,
    },
    end: {
      hour: 17,
      minute: 0,
    },
  },
  timeZone: 'America/New_York',
  offset: '-04:00',
};

const clientTz = {
  timeZone: 'US/Central',
  offset: '-5:00',
};

const busyData = [
  //resp.data.calendars.primary.busy
  // Z is UTC time
  {
    start: '2020-04-01T04:00:00Z',
    end: '2020-05-03T04:00:00Z',
  },
  {
    start: '2020-05-13T00:00:00Z',
    end: '2020-05-13T01:00:00Z',
  },
  {
    start: '2020-05-20T14:00:00Z',
    end: '2020-05-20T18:00:00Z',
  },
];

const aprilBusy = { start: '2020-04-01T04:00:00Z', end: '2020-05-03T04:00:00Z' };
const mayBusy = [
  { start: '2020-04-01T04:00:00Z', end: '2020-05-03T04:00:00Z' },
  { start: '2020-05-13T00:00:00Z', end: '2020-05-13T01:00:00Z' },
  { start: '2020-05-20T14:00:00Z', end: '2020-05-20T18:00:00Z' },
];
