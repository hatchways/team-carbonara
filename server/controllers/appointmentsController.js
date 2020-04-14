const Appointment = require('../models/Appointment');

const create = (req, res) => {
  const newAppointment = new Appointment({
    meeting_id: req.body.meeting_id,
    name: req.body.name,
    email: req.body.email,
    time: req.body.time,
    timezone: req.body.timezone,
  });

  newAppointment
    .save()
    .then(() => res.status(200).json('Appointment saved'))
    .catch((err) => res.status(400).json(error));
};

const index = (req, res) => {
  Appointment.find({ user: req.params.user_id })
    .then((appointments) => res.json(appointments))
    .catch((err) => res.status(404).json({ noappointmentsfound: 'No appointments found from that user' }));
};

module.exports = { create, index };
