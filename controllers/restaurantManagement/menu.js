const mongoose = require('mongoose');

const Menu = mongoose.model('Menu');

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
    const menuDetails = req.body;
    const menuId = req.params.id;

    if(!menuDetails || Object.keys(menuDetails).length === 0){
        const error = new Error('Menu Details not received');
        error.status = 400;
        return next(error);
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
    addMenu,
    updateMenu,
    deleteMenu
}