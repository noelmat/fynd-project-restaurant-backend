const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const CustomerUser = mongoose.model('CustomerUser');
const Cart = mongoose.model('Cart');
const Address = mongoose.model('Address');
const register = async (req, res, next) =>{
    const userDetails = req.body;

    if(!userDetails || Object.keys(userDetails).length === 0){
        const error = new Error('User details invalid');
        error.status = 400;
        return next(error);
    }
    try{

        const address = await Address.create(userDetails.address);
        userDetails.address = [address._id];
        // const cart = await Cart.create({});
        try{
            await CustomerUser.create(userDetails);
            res.status(204).send('Customer Created');
        }catch(error){
            // await Cart.findByIdAndDelete(cart);
            throw error;
        }        
        
    }catch(error){
        return next(error);
    }
}

const login = async (req, res, next) =>{
    const creds = req.body;

    if(!creds || Object.keys(creds).length === 0){
        const error = new Error('Login Details not received');
        error.status = 400;
        return next( error ); 
    }
    if (!creds.email || !creds.password){
        const error = new Error('Login Details not received');
        error.status = 400;
        return next( error );
    } 

    try{
        const user = await CustomerUser.findOne({email: creds.email});
        if(!user){
            const error = new Error('No matching credentials');
            error.status = 404;
            return next(error);
        }

        user.checkPassword(creds.password, (err, isMatch)=> {
            if(err){
                const error = new Error('No matching credentials');
                error.status = 404;
                return next(error);    
            }
            if(!isMatch){
                const error = new Error('No matching credentials');
                error.status = 404;
                return next(error);    
            }

            const claims = {
                name: user.name,
                email: user.email,
            };

            jwt.sign(claims, process.env.JWT_CUSTOMER_SECRET, (err,token)=> {
                if(err){
                    err.status = 500;
                    return next(err);
                }
                res.json({
                    name: user.name,
                    token,
                    email: user.email
                });
            });
        });
    }catch(error){
        return next(error);
    }

}

module.exports = {
    register, login
}