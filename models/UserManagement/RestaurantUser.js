const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const restaurantUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin','employee'],
        required: true
    }   
})

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

restaurantUserSchema.path('password').validate(
    password => passwordRegex.test( password ),
    'Invalid password format - Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 numeric character, and one special character'
);

const SALT_FACTOR = 10;
restaurantUserSchema.pre('save', function(done){
    const user = this;

    if(!user.isModified('password')){
        return done();
    }

    bcrypt.genSalt(SALT_FACTOR, (err, salt)=> {
        if(err){
            return done( err );
        }

        bcrypt.hash( user.password, salt, (err, hashedPassword )=>{
            if( err ){
                return done( err );
            }

            user.password = hashedPassword;
            done();
        });
    });
});

restaurantUserSchema.methods.checkPassword = function( password, done ){
    bcrypt.compare( password, this.password, ( err, isMatch ) => {
        done( err, isMatch );
    });
};

mongoose.model('RestaurantUser', restaurantUserSchema);