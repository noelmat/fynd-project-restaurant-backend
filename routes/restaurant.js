const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const { registerRestaurant } = require('../controllers/restaurant');

const router = express.Router();

router.post('/',authenticate, authorize, registerRestaurant);



module.exports = router;
