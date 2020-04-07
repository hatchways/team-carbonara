const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

//need text middleware to parse plain text token
router.post('/login', express.text(), usersController.userLogin);

router.get('/users/:id/is_unique?url=', usersController.isUnique);

router.put('users/:id', usersController.update);

module.exports = router;
