const { google } = require('googleapis');
const calendar = google.calendar('v3');
const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, `postmessage`);
oauth2Client.generateAuthUrl({ access_type: 'offline' });

async function getFreebusy(token, startISO, endISO) {
  // oauth2Client.setCredentials({
  //   access_token: token,
  //   refresh_token: process.env.CODE,
  // });

  const resp = await calendar.freebusy
    .query({
      auth: oauth2Client,
      resource: {
        items: [{ id: 'primary' }],
        timeMin: startISO,
        timeMax: endISO,
      },
    })
    .then((resp) => resp.data.calendars.primary.busy)
    .catch((err) => console.log('ERROR HERE', err));

  return resp;
}

async function insertEvent(token, startISO, endISO, timeZone, meetingName, guestEmail, guestName, guestComment) {
  // oauth2Client.setCredentials({
  //   access_token: token,
  //   refresh_token: process.env.CODE,
  // });
  console.log('IM FIRST', oauth2Client);

  oauth2Client.on('tokens', (tokens) => {
    console.log(tokens);
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      console.log(tokens.refresh_token);
    }
    console.log(tokens.access_token);
  });

  try {
    const { tokens } = await oauth2Client.getToken(process.env.CODE);
    await oauth2Client.setCredentials(tokens);
    console.log(oauth2Client.credentials);
  } catch (err) {
    console.log('AUTH ERR', err);
  }

  console.log('HHEEEERE', oauth2Client);

  var event = {
    summary: meetingName,
    start: {
      dateTime: startISO,
      timeZone: timeZone,
    },
    end: {
      dateTime: endISO,
      timeZone: timeZone,
    },
    attendees: [{ email: guestEmail, displayName: guestName, comment: guestComment }],
    reminders: {
      useDefault: true,
    },
  };
  try {
    await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      sendUpdates: 'all',
      resource: event,
    });
  } catch (err) {
    throw Error(err);
  }
}

module.exports = { getFreebusy, insertEvent };
