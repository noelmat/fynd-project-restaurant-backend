const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const { registerRestaurant,getRestaurant } = require('../controllers/restaurantManagement/restaurant');
const { getMenus, getMenu, addMenu, updateMenu, deleteMenu} = require('../controllers/restaurantManagement/menu');
const { addMenuItem, updateMenuItem, deleteMenuItem} = require('../controllers/restaurantManagement/menuItem');
const router = express.Router();

router.post('/',authenticate, authorize, registerRestaurant);
router.get('/', getRestaurant);
router.get('/menu', getMenus);
router.get('/menu/:id', getMenu);
router.post('/menu', authenticate, authorize, addMenu);
router.patch('/menu/:id', authenticate, authorize, updateMenu);
router.delete('/menu/:id', authenticate, authorize, deleteMenu);


router.post('/menuitem', authenticate, authorize, addMenuItem);
router.patch('/menuitem/:id', authenticate, authorize, updateMenuItem);
router.delete('/menuitem/:id', authenticate, authorize, deleteMenuItem);




module.exports = router;
