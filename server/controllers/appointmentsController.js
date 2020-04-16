const Appointment = require('../models/Appointment');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const create = (req, res) => {
  console.log(req.body);
  const { guestName, guestEmail, guestComment, guestTz, meetingName, meetTime, apptTime } = req.body;
  const newAppointment = new Appointment({
    guestName: guestName,
    guestEmail: guestEmail,
    guestComment: guestComment,
    guestTz: guestTz,
    meetingName: meetingName,
    meetTime: meetTime,
    apptTime: apptTime,
  });

  try {
    const appt = newAppointment.save();
    res.status(201).send(appt);
  } catch (error) {
    res.status(400).json(error);
  }

  // const msg = {
  //   to: userEmail,
  //   from: process.env.SENDER_EMAIL_ADDRESS,
  //   templateId: 'd-6125845abb24432b8af269d996fac682',
  //   dynamic_template_data: {
  //     name: userName,
  //     guest: {
  //       name: guestName,
  //       email: guestEmail,
  //       timezone: timezone,
  //       comments: guestComments,
  //     },
  //     meetingName: meetingName,
  //     eventTime: '09:00am - Wednesday, May 20, 2020 (America/New York GMT-4:00)',
  //   },
  // };
  // try {
  //   sgMail.send(msg);
  // } catch (error) {
  //   console.error(error);
  //
  //   if (error.response) {
  //     console.error(error.response.body);
  //   }
  // }
  res.send('Done');
};

const index = (req, res) => {
  Appointment.find({ user: req.params.user_id })
    .then((appointments) => res.json(appointments))
    .catch((err) => res.status(404).json({ noappointmentsfound: 'No appointments found from that user' }));
};

module.exports = { create, index };
