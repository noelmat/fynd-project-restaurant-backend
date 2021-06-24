const mongoose = require('mongoose');
const timeSchema = require('../TimeSchema');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    menuItems: {
        type: [ {type: mongoose.Schema.Types.ObjectId, ref:'MenuItem'} ],
        default: []
    },
    availability: {
        type: [Boolean],
        default: [true, true, true, true, true, true, true],
        validate: [val=> val.length === 7, 'Input for 7 days required.'],
    },
    openTime : {
        type: timeSchema, 
        required: true,
        _id: false
    },
    closeTime : {
        type: timeSchema, 
        required: true,
        _id: false
    }
})


// menuSchema.pre('findOneAndDelete', function(){
//     console.log(this);
// })
mongoose.model('Menu', menuSchema);