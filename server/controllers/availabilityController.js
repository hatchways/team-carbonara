// const _ = require('lodash');
const moment = require('moment');
const { google } = require('googleapis');
const calendar = google.calendar('v3');
const { availDays } = require('../utils/availabilityHelpers.js');

const daysAvailable = (req, res) => {
  console.log('AVAILABILITY CONTROLLER');

  const oauth2client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, `postmessage`);

  //get current_user from session

  //if session.access_token expired
  //getRefreshToken(current_user) -> set to session

  oauth2client.setCredentials({
    access_token: process.env.ACCESS_TOKEN, //temporary, use access token from session
  });
  // console.log('avail', req.session);
  // console.log('oauth creds', oauth2client);

  //freebusy request
  const resp = calendar.freebusy
    .query({
      auth: oauth2client,
      resource: {
        items: [{ id: 'primary' }],
        timeMin: new Date(2020, 3, 1).toISOString(),
        //use client month/date start times
        timeMax: new Date(2020, 4, 30).toISOString(),
      },
    })
    .then((resp) => ('RESPONSE HERE', res.send(resp.data.calendars.primary)))
    .catch((err) => console.log('ERROR HERE', err));
  console.log('log', resp);
  //--------------------------------------------------------

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

  console.log('ALGORITHM TESTING AND VARS BELOW, DUMMY DATA ABOVE -------------------');
  //send from /uniqueurl/meeting
  const reqYear = 2020;
  // reqMonth = req.query.month
  const reqMeet = 60; //minutes
  //clientTz

  // console.log('args', mayBusy, userAvail, reqYear, req.query.month, reqMeet);
  console.log(
    'testfn',
    availDays(mayBusy, userAvail, userAvail.timeZone, clientTz.timeZone, reqYear, req.query.month, reqMeet),
  );
  console.log('aftertest');

  res.status(200).send('testing');

  function returnSlots(day, busy) {}

  // let day = returnDays(userAvail, busyData)[0];
  // console.log(returnSlots(day, busyData));
};

const timeslotsAvailable = (req, res) => {
  console.log('pie');
  res.status(200).send('testing');

  //client will hold availability for day
  //pass in start and end times?
  //cut up in to slots to return
};
// access google avail for day
// use primary cal
// If {busy} appears on day
//   Stop rendering buttons for busy times
//   Cut up time block based on meeting
//   Stop when busy.start is past meeting.end
//   Start at busy.end
// Else cut up time block based on meeting

module.exports = { daysAvailable, timeslotsAvailable };
