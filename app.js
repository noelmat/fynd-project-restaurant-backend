require('./data/init');

const express = require('express');
const userManagement = require('./routes/auth');
const customerAuth = require('./routes/customerAuth');
const restaurantRouter = require('./routes/restaurant');
const { pageNotFoundHandler, errorHandler } = require('./middlewares/error-handlers');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: false }));
app.use(cors());

app.use('/auth/usermanagement', userManagement);
app.use('/auth/customer', customerAuth);
app.use('/restaurant', restaurantRouter);


app.use(pageNotFoundHandler);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, (error)=> {
    if(error){
        return console.log(error.message);
    }
    console.log(`Server started on http://localhost:${PORT}`);
});