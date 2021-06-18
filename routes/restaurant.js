const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const { registerRestaurant } = require('../controllers/restaurantManagement/restaurant');
const { addMenu, updateMenu, deleteMenu} = require('../controllers/restaurantManagement/menu');
const router = express.Router();

router.post('/',authenticate, authorize, registerRestaurant);
/**
 *  Menu will have a restaurant ID
 *  1. Create Menu
 *  2. Update Menu
 *  3. Delete Menu
 * 
 */
router.post('/menu', authenticate, authorize, addMenu);
router.patch('/menu/:id', authenticate, authorize, updateMenu);
router.delete('/menu/:id', authenticate, authorize, deleteMenu);


/**
 *  MenuItem will have a restaurant ID
 *  1. Create MenuItem
 *  2. Update MenuItem
 *  3. Delete MenuItem
 */
// router.post('/menuitem', authenticate, authorize, addMenuItem);
// router.patch('/menuitem/:id', authenticate, authorize, updateMenuItem);
// router.delete('/menuitem/:id', authenticate, authorize, deleteMenuItem);




module.exports = router;
