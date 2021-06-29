const express = require('express');
const { getCustomerDetails } = require('../controllers/customer.js');
const { authenticate, authorize } = require('../middlewares/customerAuth');
const router = express.Router();

router.get('/',authenticate,getCustomerDetails)

module.exports = router;