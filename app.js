require('./data/init');

const express = require('express');
const userManagement = require('./routes/auth');
const customerAuth = require('./routes/customerAuth');
const restaurantRouter = require('./routes/restaurant');
const cartRouter = require('./routes/cart');
const { pageNotFoundHandler, errorHandler } = require('./middlewares/error-handlers');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded( { extended: false }));
app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
app.use('/auth/usermanagement', userManagement);
app.use('/auth/customer', customerAuth);
app.use('/restaurant', restaurantRouter);
app.use('/cart', cartRouter);

app.use(pageNotFoundHandler);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, (error)=> {
    if(error){
        return console.log(error.message);
    }
    console.log(`Server started on http://localhost:${PORT}`);
});