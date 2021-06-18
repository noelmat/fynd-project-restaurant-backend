const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
    hours: {
        type: Number,
        min: 0,
        max: 23,
        required: true
    },
    minutes: {
        type: Number,
        min: 0,
        max: 59,
        required: true
    }
})

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
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