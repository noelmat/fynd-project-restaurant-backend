const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "CartItem"}],
        default: []
    }
})

mongoose.model('Cart', cartSchema);