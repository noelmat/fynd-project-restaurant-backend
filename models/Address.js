const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
    },
    city:{
        type: String,
        required: true
    },
    landmark: {
        type: String,
    },
    primaryContact: {
        type: String,
        required: true
    }
})

mongoose.model('Address', addressSchema);