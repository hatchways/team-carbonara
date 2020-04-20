const express = require('express');
const router = express.Router();
const subscriptionControllers = require('../controllers/subscriptionController');

router.post('/:id', subscriptionControllers.subscription);

router.get('/remove/:id', subscriptionControllers.unsubscribe);

module.exports = router;
