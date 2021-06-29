const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const RestaurantUser = mongoose.model('RestaurantUser');

const register = async (req, res, next) => {
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

const login = async (req, res, next) => {
    const creds = req.body;

    if (!creds){
        const error = new Error('Login Details not received');
        error.status = 400;
        return next( error ); 
    }

    if (!creds.username || !creds.password){
        const error = new Error('Login Details not received');
        error.status = 400;
        return next( error );
    } 

    try{
        const user = await RestaurantUser.findOne({ username: creds.username });
        if(!user){
            const error = new Error('No matching credentials');
            error.status = 404;
            return next(error);
        }

        user.checkPassword( creds.password, (err, isMatch)=>{
            if (err){
                const error = new Error('No matching credentials');
                error.status = 404;
                return next(error);
            }

            if (!isMatch){
                const error = new Error('No matching credentials');
                error.status = 404;
                return next(error);
            }

            const claims = {
                name: user.name,
                role: user.role
            };

            jwt.sign(claims, process.env.JWT_SERVER_SECRET, (err, token)=> {
                if(err){
                    err.status = 500;
                    return next( err );
                }
                res.json({
                    name: user.name,
                    token: token,
                    username: user.username,
                    role: user.role
                });
            });
        });
    }catch( error) {
        return next(error);
    }
}

module.exports = {
    register, login
}

