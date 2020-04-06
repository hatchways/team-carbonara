const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetingsController');

router.post('/meeting', meetingsController.create);

router.get('/meetings/:user_id', meetingsController.index);

module.exports = router;
