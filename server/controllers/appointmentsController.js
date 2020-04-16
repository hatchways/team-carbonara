const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { emailUserNewAppt } = require('../utils/emailHelper.js');

const create = async (req, res) => {
  console.log(req.body);
  const { guestName, guestEmail, guestComment, guestTz, meetingName, meetTime, apptTime, url } = req.body;

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

    const appt = await newAppointment.save();
    res.status(201).send(appt);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

  //find user
  //send appt to gcal

  // emailUserNewAppt(user.email, user.given_name, guestName, guestEmail, guestTz, guestComment, meetingName);
};

const index = (req, res) => {
  Appointment.find({ user: req.params.user_id })
    .then((appointments) => res.json(appointments))
    .catch((err) => res.status(404).json({ noappointmentsfound: 'No appointments found from that user' }));
};

module.exports = { create, index };
