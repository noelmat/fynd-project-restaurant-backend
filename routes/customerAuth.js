const express = require('express');
const { register, login } = require('../controllers/customerAuth.js');
const { getSessionId } = require('../controllers/session.js')
const { checkOrGetCookie } = require('../middlewares/session');
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.get('/session', checkOrGetCookie ,getSessionId);

module.exports = router;