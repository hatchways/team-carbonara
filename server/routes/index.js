const express = require('express');
const router = express.Router();

//quick test insertion on db
const User = require('../models/user.model');

router.post('/add', function(req, res, next) {
  const newUser = new User({ email: 'raymond@hotmail.com' });

  newUser
    .save()
    .then(() => res.status(200).json('Added'))
    .catch(err => res.status(400).json(error));
});

module.exports = router;
