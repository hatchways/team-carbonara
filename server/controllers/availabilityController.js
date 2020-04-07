const _ = require('lodash');
const { google } = require('googleapis');
const calendar = google.calendar('v3');

const daysAvailable = (req, res) => {
  console.log('AVAILABILITY CONTROLLER');

  const oauth2client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, `postmessage`);

  oauth2client.setCredentials({
    access_token: process.env.ACCESS_TOKEN, //temporary
  });
  console.log('avail', req.session);
  console.log('oauth creds', oauth2client);

  const resp = calendar.freebusy
    .query({
      auth: oauth2client,
      resource: {
        items: [{ id: 'primary' }],
        timeMin: new Date(2020, 3, 1).toISOString(),
        timeMax: new Date(2020, 4, 30).toISOString(),
      },
    })
    .then((resp) => ('RESPONSE HERE', res.send(resp.data.calendars.primary)))
    .catch((err) => ('ERROR HERE', err));
  console.log('log', resp);
};
// access user availabilirty
// access google avail for month
//use primary cal
// remove blocked/booked days
//return available days

const timeslotsAvailable = (req, res) => {
  console.log('pie');
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
