const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { emailUserNewAppt } = require('../utils/emailHelper.js');
const { insertEvent } = require('../utils/gcalHelper.js');
const moment = require('moment-timezone');

const create = async (req, res) => {
  const { guestName, guestEmail, guestComment, guestTz, meetingName, meetTime, apptTime, url } = req.body;
  const endTime = moment(apptTime).add(meetTime, 'm').format();

  try {
    const user = await User.findOne({ url });

    const newAppointment = new Appointment({
      user: user._id,
      guestName: guestName,
      guestEmail: guestEmail,
      guestComment: guestComment,
      guestTz: guestTz,
      meetingName: meetingName,
      meetTime: meetTime,
      apptTime: apptTime,
    });
    const eventTime = `${moment(apptTime).tz(user.timezone).format('h:mma - dddd, MMMM Do YYYY')}
    (${user.timezone.replace('_', ' ')} GMT${moment.tz(user.timezone).format('Z')})`;
    try {
      await insertEvent(
        user.access_token,
        user.refresh_token,
        apptTime,
        endTime,
        user.timezone,
        meetingName,
        guestEmail,
        guestName,
        guestComment,
        url,
      );
      await newAppointment.save();

      await emailUserNewAppt(
        user.email,
        user.given_name,
        guestName,
        guestEmail,
        guestTz.replace('_', ' '),
        guestComment,
        meetingName,
        eventTime,
      );

      res.status(201).send('New event created');
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

const userIndex = async (req, res) => {
  try {
    const resp = await Appointment.find({ user: req.params.user_id });
    //sort resp by apptTime
    // resp.sort((a, b) => {
    //   return a.apptTime - b.apptTime;
    // });
    const parsed = { upcoming: {}, past: {} };
    const curr = moment().tz(req.params.timezone).format();
    for (const appt of resp) {
      const time = moment(appt.apptTime);
      if (time.isAfter(curr)) {
        if (parsed.upcoming[time.format('MMDDYYYY')]) {
          parsed.upcoming[time.format('MMDDYYYY')].push(appt);
        } else {
          parsed.upcoming[time.format('MMDDYYYY')] = [appt];
        }
      } else {
        if (parsed.past[time.format('MMDDYYYY')]) {
          parsed.past[time.format('MMDDYYYY')].push(appt);
        } else {
          parsed.past[time.format('MMDDYYYY')] = [appt];
        }
      }
    }
    res.status(200).json(parsed);
  } catch (err) {
    res.status(400).json({ Error: 'User does not exist' });
  }
};

module.exports = { create, userIndex };
