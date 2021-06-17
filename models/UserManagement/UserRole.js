const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
    roleId: {
        type: Number,
        unique: true,
        required: true
    },
    roleName: {
        type: String,
        require: true
    }
})

mongoose.model('UserRole', userRoleSchema);