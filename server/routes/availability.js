const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');

//need text middleware to parse plain text token
// router.post('/login', express.text(), availabilityController.userLogin);

router.get('/days', availabilityController.daysAvailable);

router.get('/timeslots?day=', availabilityController.timeslotsAvailable);

module.exports = router;
