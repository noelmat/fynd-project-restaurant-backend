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
require('../models/OrderManagement/Order');
require('../models/OrderManagement/OrderItem');

const {NODE_ENV,DB_HOST,DB_NAME,DB_PORT, DB_USER, DB_PASSWORD } = process.env;

const uri = NODE_ENV === 'development' ? `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.set( 'useFindAndModify' , false );
mongoose.set( 'returnOriginal' , false );

mongoose.connect( uri , { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on( 'open' , () => {
    console.log('Connection to DB has been established');
});

mongoose.connection.on( 'error' , (err)=> {
    console.log(err.message);
})