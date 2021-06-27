const mongoose = require('mongoose');

const RestaurantUser = mongoose.model('RestaurantUser');
const getAllUsers = async (req, res, next) =>{
    try {
        const users = await RestaurantUser.find().select('-password');
        res.status(200).json(users);
    } catch(error){
        next(error);
    }
}
const patchUser = async (req, res, next) => {
    const id = req.params.id;
    const userDetails = req.body;
    if(Object.keys(userDetails).length === 0){
        const error = new Error('user Details not in request');
        error.status = 400;
        return next(error);
    }
    if(userDetails.password === undefined){
        try{
            const updatedUser = await RestaurantUser.findByIdAndUpdate( id, userDetails).select('-password');
            if(Object.keys(updatedUser).length === 0){
                const error = new Error('user not found');
                error.status = 404;
                return next(error);
            }
            res.status(200).json(updatedUser);
        }catch(error){
            next(error);
        }
    }else{
        try{
            const user = await RestaurantUser.findById(id);            
            user.password = userDetails.password;
            if(userDetails.name !== undefined){
                user.name = userDetails.name;
            }
            if(userDetails.role !== undefined){
                user.role = userDetails.role;
            }
            await user.save();
            res.status(204).json({})
        }catch(error){
            next(error);
        }
    }
    
    
}

module.exports = {
    getAllUsers,
    patchUser
}