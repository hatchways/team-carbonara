const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//need text middleware to parse plain text token
router.post('/login', express.text(), userController.userLogin);

module.exports = router;
