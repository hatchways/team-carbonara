const { google } = require('googleapis');
const calendar = google.calendar('v3');
const oauth2client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, `postmessage`);

async function getFreebusy(token, startISO, endISO) {
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
}

async function insertEvent(token, startISO, endISO, timeZone, meetingName, guestEmail, guestName, guestComment) {
  oauth2client.setCredentials({
    access_token: token,
  });
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
      auth: oauth2client,
      calendarId: 'primary',
      sendUpdates: 'all',
      resource: event,
    });
  } catch (err) {
    throw Error(err);
  }
}

module.exports = { getFreebusy, insertEvent };
