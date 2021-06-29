const mongoose = require('mongoose');

const Menu = mongoose.model('Menu');

const getMenus = async (req, res, next) => {
    try{
        const menus = await Menu.find().populate('menuItems');
        res.status(200).json(menus);
    }catch( error ){
        next(error);
    }
}
const getMenu = async (req, res, next) => {
    const id = req.params.id;
    if(!id){
        const error = new Error('Id not in request');
        error.status = 400;
        return next(error);
    }
    try{
        const menu = await Menu.findById(id).populate('menuItems');
        res.status(200).json(menu);
    }catch( error ){
        next(error);
    }
}
const addMenu = async (req, res, next) => {
    const menuDetails = req.body;
    
    if(!menuDetails || Object.keys(menuDetails).length === 0){
        const error = new Error("Menu Details not received");
        error.status = 400;
        return next(error);
    }
    try{
        const menu = await Menu.create(menuDetails)
        res.status(200).json(menu);
    }catch(error){
        next(error);
    }
}

const updateMenu = async (req, res, next) => {
    let menuDetails = req.body;
    const menuId = req.params.id;
    const action = req.query.action;

    if(!menuDetails || Object.keys(menuDetails).length === 0){
        const error = new Error('Menu Details not received');
        error.status = 400;
        return next(error);
    }
    if(action && action==='add_menu_item'){
        // menu details will have menuItem Id to be added to the array
        if(menuDetails.menuItem === undefined){
            const error = new Error('Menu Details not received');
            error.status = 400;
            return next(error);
        }
        menuDetails = {
            $addToSet : {
                menuItems : menuDetails.menuItem,
            }
        }
    }
    if(action && action=='remove_menu_item'){
        if(menuDetails.menuItem === undefined){
            const error = new Error('Menu Details not received');
            error.status = 400;
            return next(error);
        }
        menuDetails = {
            $pull : {
                menuItems : menuDetails.menuItem,
            }
        }
    }

    try{
        const updatedMenu = await Menu.findByIdAndUpdate(menuId,
                menuDetails,
                {runValidators: true});
        if(!updatedMenu){
            const error = new Error('Menu not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json(updatedMenu);
    }catch(error){
        next(error);
    }
}

const deleteMenu = async (req, res, next) => {
    const menuId = req.params.id;

    try{
        const deletedMenu = await Menu.findByIdAndDelete(menuId);
        if(!deletedMenu){
            const error = new Error('Menu not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json(deletedMenu);
    }catch(error){
        next(error);
    }
}
module.exports = {
    getMenus,
    getMenu,
    addMenu,
    updateMenu,
    deleteMenu
}