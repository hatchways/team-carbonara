const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

//need text middleware to parse plain text token
router.post('/login', express.text(), usersController.userLogin);

router.get('/:id/is_unique?url=', usersController.isUnique);

//gets user info by id
router.get('/:id', usersController.getUser);

router.put('/:id', usersController.updateUser);

//possible TODO: update meetings arr inside update user if possible
router.post('/meetings/:id', usersController.updateMeetings);

module.exports = router;
