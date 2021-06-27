const mongoose = require('mongoose');

const cartItem = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
        required: true,
    },
    total:{
        type: Number,
        min: 0
    }
})

mongoose.model('CartItem', cartItem);