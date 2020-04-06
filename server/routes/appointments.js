const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');

router.post('/appointment', appointmentsController.create);

router.get('/appointments/:user_id', appointmentsController.index);

module.exports = router;
