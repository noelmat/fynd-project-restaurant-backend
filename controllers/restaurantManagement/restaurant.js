const mongoose = require('mongoose');

const Address = mongoose.model('Address');
const Restaurant = mongoose.model('Restaurant');

const registerRestaurant = async (req, res, next) => {
    /**
     * Assumption: The user is a authorized to register a restaurant.
     * Reason: Authorize middleware
     * 
     * 
     * 1. if restaurant entry exists in the database, report error and exit.
     * 2. get the restaurant details from the request body
     * 3. validate the details
     * 4. create restaurant
     */

    try{
        const dbEntryCount = await Restaurant.count();
        if(dbEntryCount > 0){
            const error = new Error('Restaurant Exists. Cannot Register');
            error.status = 409
            return next(error);
        }

        const data = req.body;

        const address = await Address.create(data.address);
        data.address = address._id;

        const restaurant = await Restaurant.create(data);
        res.status(200).json({restaurant});
    }catch(error){
        error.status = 400;
        next( error );
    }
    
}
const getRestaurant = async (req, res, next)=>{
    try{
        const restaurant = await Restaurant.findOne().populate('address');
        res.status(200).json(restaurant);
    }catch(error){
        next(error);
    }
}
module.exports = {
    registerRestaurant,
    getRestaurant
}