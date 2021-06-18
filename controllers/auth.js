const mongoose = require('mongoose');
const RestaurantUser = mongoose.model('RestaurantUser');

const postUser = async (req, res, next) => {
    const userDetails = req.body;

    if(!userDetails || Object.keys(userDetails).length === 0){
        const error = new Error('User Details invalid');
        error.status = 400;
        return next(error);
    }
    try{
        await RestaurantUser.create(userDetails)
        res.status(204).send('User Created');
    }catch( error ){
        error.status = 400
        next(error);
    }
}

module.exports = {
    postUser
}

