const mongoose = require('mongoose');


require('../models/Address');
require('../models/Menu/MenuItem');
require('../models/Menu/Menu');
require('../models/Restaurant/Restaurant');
require('../models/UserManagement/RestaurantUser');
require('../models/UserManagement/UserRole');
require('../models/CustomerManagement/CustomerUser');
require('../models/CustomerManagement/Cart');
require('../models/CustomerManagement/CartItem');
require('../models/CustomerManagement/Session');



const uri = "mongodb://localhost:27017/restaurantDB";

mongoose.set( 'useFindAndModify' , false );
mongoose.set( 'returnOriginal' , false );

mongoose.connect( uri , { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on( 'open' , () => {
    console.log('Connection to DB has been established');
});

mongoose.connection.on( 'error' , ()=> {
    console.log(err.message);
})