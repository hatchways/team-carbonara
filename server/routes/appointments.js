const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');

router.post('/', appointmentsController.create);

router.get('/:user_id', appointmentsController.userIndex);

module.exports = router;
