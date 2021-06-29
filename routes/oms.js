const express = require("express");
const {createOrder, updateOrderStatus, activeOrders} = require('../controllers/orderManagement/orders');
const { authenticate } = require('../middlewares/customerAuth');
// const { getSessionId } = require('../controllers/session');
const adminAuth = require('../middlewares/auth').authenticate; 
const router = express.Router();

router.post('/',authenticate,createOrder);
router.patch('/:id', adminAuth, updateOrderStatus);
router.get('/active', activeOrders);
module.exports = router;