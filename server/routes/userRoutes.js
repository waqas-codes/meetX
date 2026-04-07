const express = require('express');
const router = express.Router();
const { createOrUpdateUser, getUserByUid } = require('../controllers/userController');

router.post('/', createOrUpdateUser);
router.get('/:uid', getUserByUid);

module.exports = router;
