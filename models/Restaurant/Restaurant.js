const mongoose = require('mongoose');
const timeSchema = require('../TimeSchema');
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    openTime: {
        type: timeSchema,
        required: true,
        _id: false,
    },
    closeTime: {
        type: timeSchema,
        required: true,
        _id: false,
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'closed'
    }
});

mongoose.model('Restaurant', restaurantSchema);