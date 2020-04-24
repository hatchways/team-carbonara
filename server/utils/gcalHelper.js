const User = require('../models/User');
const { google } = require('googleapis');
const calendar = google.calendar('v3');
const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, `postmessage`);
oauth2Client.generateAuthUrl({ access_type: 'offline' });

async function getFreebusy(access, refresh, startISO, endISO, url) {
  oauth2Client.setCredentials({
    access_token: access,
    refresh_token: refresh,
  });

  oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      const user = User.findOne({ url });
      user.refresh_token = tokens.refresh_token;
      user.save();
    }
  });
  try {
    const resp = await calendar.freebusy.query({
      auth: oauth2Client,
      resource: {
        items: [{ id: 'primary' }],
        timeMin: startISO,
        timeMax: endISO,
      },
    });

    return resp.data.calendars.primary.busy;
  } catch (err) {
    throw ('Error at gcal freebusy', err);
  }
}

async function insertEvent(
  access,
  refresh,
  startISO,
  endISO,
  timeZone,
  meetingName,
  guestEmail,
  guestName,
  guestComment,
  url,
) {
  oauth2Client.setCredentials({
    access_token: access,
    refresh_token: refresh,
  });

  oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      const user = User.findOne({ url });
      user.refresh_token = tokens.refresh_token;
      user.save();
    }
  });

  const event = {
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
    const googleEvent = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      sendUpdates: 'all',
      resource: event,
    });
    return googleEvent.data;
  } catch (err) {
    throw ('Error at gcal insert', err);
  }
}

async function deleteEvent(access, refresh, eventId) {
  oauth2Client.setCredentials({
    access_token: access,
    refresh_token: refresh,
  });

  oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      const user = User.findOne({ refresh_token: refresh });
      user.refresh_token = tokens.refresh_token;
      user.save();
    }
  });

  try {
    await calendar.events.delete({
      auth: oauth2Client,
      calendarId: 'primary',
      eventId: eventId,
      sendUpdates: 'all',
    });
    console.log('success');
  } catch (err) {
    throw ('Error at gcal insert', err);
  }
}
module.exports = { getFreebusy, insertEvent, deleteEvent };
