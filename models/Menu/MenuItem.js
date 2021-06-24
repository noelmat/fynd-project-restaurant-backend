const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    spiceLevel: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: false,
        min: 0,
        max: 5
    },
    inStock: {
        type: Boolean,
        required: false,
        default: true
    },
    special: {
        type: Boolean, 
        required: false,
        default: false
    }
})


mongoose.model('MenuItem', menuItemSchema);
