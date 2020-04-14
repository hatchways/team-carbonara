const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');

//need text middleware to parse plain text token
// router.post('/login', express.text(), availabilityController.userLogin);

router.get('/days', availabilityController.daysAvailable);
//use number 0-index ?month=

router.get('/timeslots', availabilityController.timeslotsAvailable);

module.exports = router;
