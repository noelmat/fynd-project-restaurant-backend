const mongoose = require('mongoose');

const CustomerUser = mongoose.model('CustomerUser');

const getCustomerDetails = async(req, res, next)=>{
    const claims = res.locals.claims;
    try{
        const customerUser = await CustomerUser.findOne({email: claims.email}).populate('address');
        if(!customerUser){
            const error = new Error();
            error.status = 404;
            return next(error);
        }
        res.status(200).json(customerUser);
    }catch(error){
        next(error);
    }
}

module.exports = {
    getCustomerDetails
}