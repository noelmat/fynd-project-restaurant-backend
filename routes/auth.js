const express = require('express');
const { postUser, login } = require('../controllers/auth.js');


const router = express.Router();


router.post('/register', postUser);
router.post('/login', login);

module.exports = router;