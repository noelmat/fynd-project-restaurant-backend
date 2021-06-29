const express = require('express');
const {getCart, updateCart} = require('../controllers/cart');
// const { checkOrGetCookie } = require('../middlewares/session');

const router = express.Router();

router.get('/',  getCart);
router.patch('/:id', updateCart);
module.exports = router;