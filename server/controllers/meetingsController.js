const Meeting = require('../models/Meeting');

const create = (req, res) => {
  const newMeeting = new Meeting({
    user_id: req.user.id,
    duration: req.body.duration,
  });

  newMeeting
    .save()
    .then(() => res.status(200).json('Meeting saved'))
    .catch((err) => res.status(400).json(error));
};

const index = (req, res) => {
  Meeting.find({ user: req.params.user_id })
    .then((meetings) => res.json(meetings))
    .catch((err) => res.status(404).json({ nomeetingsfound: 'No meetings found from that user' }));
};

module.exports = { create, index };
