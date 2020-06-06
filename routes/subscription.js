const express = require('express');
const router = express.Router();
const subscriptionControllers = require('../controllers/subscriptionController');

router.post('/:id', subscriptionControllers.subscription);

router.delete('/unsubscribe/:id', subscriptionControllers.unsubscribe);

module.exports = router;
