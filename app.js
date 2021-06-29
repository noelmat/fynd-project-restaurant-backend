require('./events/onSave');
require('dotenv').config();
require('./data/init');

const path = require('path');
const express = require('express');
const userManagement = require('./routes/auth');
const customerAuth = require('./routes/customerAuth');
const customerRouter = require('./routes/customer');
const restaurantRouter = require('./routes/restaurant');
const cartRouter = require('./routes/cart');
const omsRouter = require('./routes/oms');

const { pageNotFoundHandler, errorHandler } = require('./middlewares/error-handlers');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
if(process.env.NODE_ENV === 'development'){
    console.log("DEV MODE");
    app.use(cors({origin:"http://localhost:8080", credentials: true}));
}


app.use(express.static(path.join( process.cwd(), 'public' )));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded( { extended: false }));

app.use('/api/auth/usermanagement', userManagement);
app.use('/api/auth/customer', customerAuth);
app.use('/api/customer', customerRouter);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/cart', cartRouter);
app.use('/api/oms', omsRouter);
app.use('/api',pageNotFoundHandler);
app.use('/api',errorHandler);


app.use(function (req, res,next){
    res.sendFile( path.join(process.cwd(), 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error)=> {
    if(error){
        return console.log(error.message);
    }
    console.log(`Server started on http://localhost:${PORT}`);
});