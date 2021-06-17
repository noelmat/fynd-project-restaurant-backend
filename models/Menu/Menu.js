const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    menuItems: {
        type: [ mongoose.Schema.Types.ObjectId ],
        default: []
    }

})

mongoose.model('Menu', menuSchema);