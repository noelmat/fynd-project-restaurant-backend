const mongoose = require('mongoose');

const MenuItem = mongoose.model('MenuItem');

const addMenuItem = async (req, res, next) =>{
    const item = req.body;
    if(!item || Object.keys(item).length === 0){
        const error = new Error('Menu Item Details not provided');
        error.status = 400;
        return next(error);
    }

    try{
        const menuItem = await MenuItem.create(item);
        res.status(200).json(menuItem);
    }catch (error){
        next(error);
    }
}

const updateMenuItem = async (req, res, next) => {
    const id = req.params.id;
    const item = req.body;

    if(!item || Object.keys(item).length === 0){
        const error = new Error('Menu Item Details not provided');
        error.status = 400;
        return next(error);
    }

    try{
        const updatedItem = await MenuItem
                                    .findByIdAndUpdate(id, 
                                            item,
                                            {runValidators:true, upsert:true}
                                            );
        if(!updatedItem){
            const error = new Error("Menu Item not found");
            error.status = 404;
            return next(error);
        }
        res.status(200).json(updatedItem);
    }catch(error){
        next(error);
    }
}


const deleteMenuItem = async (req, res, next) => {
    const id = req.params.id;

    try{
        const deletedItem = await MenuItem
                                    .findByIdAndDelete(id);
        if(!deletedItem){
            const error = new Error("Menu Item not found");
            error.status = 404;
            return next(error);
        }
        res.status(200).json(deletedItem);
    }catch(error){
        next(error);
    }
}

module.exports = {
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
}