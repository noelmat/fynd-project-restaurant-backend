const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    cartId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }
})

mongoose.model('Session', sessionSchema);