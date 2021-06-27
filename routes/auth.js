const express = require('express');
const { register, login } = require('../controllers/auth.js');
const { getAllUsers,patchUser } = require('../controllers/users');
const { authenticate, authorize } = require('../middlewares/auth.js');

const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.get('/',authenticate,getAllUsers)
router.patch('/users/:id',authenticate, authorize,patchUser)

module.exports = router;